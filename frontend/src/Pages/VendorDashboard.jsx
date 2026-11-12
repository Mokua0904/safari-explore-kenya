import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const fetchWithTimeout = (url, options = {}) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 5000)
    )
  ]);
};

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    if (modal) setEditingId(null); 
    setModal(!modal);
  };
  
  const [listingType, setListingType] = useState("hotel");
  const [editingId, setEditingId] = useState(null); 
  const [newListing, setNewListing] = useState({ 
    title: "", city: "", address: "", desc: "",
    price: "", pricePerNight: "", capacity: "", type: "", maxGroupSize: "", stock: "", category: "",
    photo: "https://images.unsplash.com/photo-1542314831-c6a4d14b83b3?q=80&w=800&auto=format&fit=crop" 
  });

  useEffect(() => {
    if (!user || (user.role !== "vendor" && user.role !== "admin")) {
      navigate("/become-vendor");
    }
  }, [user, navigate]);

  // 🆕 Wrapped in useCallback to fix the Vercel ESLint error
  const fetchVendorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const myId = user._id || user.id;

      try {
        const bookingsRes = await fetchWithTimeout(`${BASE_URL}/booking`, { credentials: "include" });
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success) {
          setBookings(bookingsData.data.filter((b) => b.userEmail === user.email));
        }
      } catch (err) {
        console.error("Bookings fetch failed", err);
      }

      const endpoints = ["hotels", "tours", "transport", "products"];
      let allListings = [];

      for (let endpoint of endpoints) {
        try {
          const res = await fetchWithTimeout(`${BASE_URL}/${endpoint}`, { credentials: "include" });
          const data = await res.json();
          
          if (data.success && data.data) {
            const myItems = data.data.filter((item) => String(item.vendorId) === String(myId));
            allListings = [...allListings, ...myItems.map(item => ({ ...item, itemType: endpoint }))];
          }
        } catch (err) {
          console.error(`Failed to fetch ${endpoint}`, err);
        }
      }
      
      setListings(allListings);
    } catch (err) {
      console.error("Error fetching vendor data", err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false); 
    }
  }, [user]); // Dependencies for useCallback

  // 🆕 Clean useEffect
  useEffect(() => {
    if (user && (user.role === "vendor" || user.role === "admin")) {
      fetchVendorData();
    }
  }, [user, fetchVendorData]); // Now includes fetchVendorData

  const handleDelete = async (id, itemType) => {
    if (!window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) return;

    try {
      const res = await fetch(`${BASE_URL}/${itemType}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Listing deleted successfully.");
        fetchVendorData();
      } else {
        alert("Failed to delete listing. Check backend routes.");
      }
    } catch (err) {
      alert("Network error while deleting.");
    }
  };

  const handleEditClick = (item) => {
    let formType = "hotel";
    if (item.itemType === "tours") formType = "tour";
    if (item.itemType === "transport") formType = "transport";
    if (item.itemType === "products") formType = "product";

    setListingType(formType);
    setEditingId(item._id);
    
    setNewListing({
      title: item.title || "",
      city: item.city || "",
      address: item.address || "",
      desc: item.desc || "",
      price: item.price || "",
      pricePerNight: item.pricePerNight || "",
      capacity: item.capacity || "",
      type: item.type || "", 
      maxGroupSize: item.maxGroupSize || "",
      stock: item.stock || "",
      category: item.category || "",
      photo: item.photo || ""
    });
    
    setModal(true);
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    
    if (!newListing.title || !newListing.city || !newListing.desc) {
      return alert("Please fill in Title, City, and Description.");
    }
    if (listingType === "transport" && (!newListing.type || !newListing.category || !newListing.price || !newListing.capacity)) {
      return alert("Please fill in ALL Transport fields (Price, Capacity, Vehicle Type, Category).");
    }
    if (listingType === "hotel" && (!newListing.address || !newListing.pricePerNight)) {
      return alert("Please fill in ALL Hotel fields (Address, Price per Night).");
    }
    if (listingType === "tour" && (!newListing.address || !newListing.price || !newListing.maxGroupSize)) {
      return alert("Please fill in ALL Tour fields (Address, Price, Group Size).");
    }
    if (listingType === "product" && (!newListing.price || !newListing.stock || !newListing.category)) {
      return alert("Please fill in ALL Product fields (Price, Stock, Category).");
    }

    setSaving(true);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const vendorIdToSend = user._id || user.id;
      let endpoint = "";
      let payload = {
        title: newListing.title, desc: newListing.desc, photo: newListing.photo, vendorId: vendorIdToSend,
      };

      switch(listingType) {
        case "hotel": 
          endpoint = "hotels"; 
          payload.city = newListing.city; payload.address = newListing.address; payload.pricePerNight = Number(newListing.pricePerNight);
          break;
        case "tour": 
          endpoint = "tours"; 
          payload.city = newListing.city; payload.address = newListing.address; payload.price = Number(newListing.price); payload.maxGroupSize = Number(newListing.maxGroupSize); payload.distance = 0; 
          break;
        case "transport": 
          endpoint = "transport"; 
          payload.city = newListing.city; payload.price = Number(newListing.price); payload.capacity = Number(newListing.capacity); payload.type = newListing.type; payload.category = newListing.category;
          break;
        case "product": 
          endpoint = "products"; 
          payload.price = Number(newListing.price); payload.stock = Number(newListing.stock); payload.category = newListing.category;
          break;
        default: endpoint = "hotels";
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${BASE_URL}/${endpoint}/${editingId}` : `${BASE_URL}/${endpoint}`;

      const res = await fetch(url, {
        method: method, 
        headers: { "Content-Type": "application/json" }, 
        credentials: "include", 
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      const textData = await res.text();
      let data = {};
      try { data = JSON.parse(textData); } catch (e) { throw new Error("Invalid response."); }
      
      if (res.ok) {
        alert(`Listing ${editingId ? "updated" : "added"} successfully.`);
        toggleModal();
        setEditingId(null);
        setNewListing({ title: "", city: "", address: "", desc: "", price: "", pricePerNight: "", capacity: "", type: "", maxGroupSize: "", stock: "", category: "", photo: "https://images.unsplash.com/photo-1542314831-c6a4d14b83b3?q=80&w=800&auto=format&fit=crop" });
        fetchVendorData(); 
      } else {
        alert(data.message || "Failed to save listing.");
      }
    } catch (err) {
      clearTimeout(timeoutId);
      alert(err.message || "Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (!user || (user.role !== "vendor" && user.role !== "admin")) return null;

  const inputStyle = { backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px 15px", fontSize: "0.95rem" };

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 style={{ fontWeight: "800", color: "#0f172a" }}>Vendor Dashboard</h1>
            <p style={{ color: "#555" }}>Welcome back, {user.username}. Manage your listings here.</p>
          </div>
          <div>
            <Button color="secondary" className="me-2" onClick={fetchVendorData} style={{ borderRadius: "8px" }}>Refresh</Button>
            <Button onClick={() => { setEditingId(null); toggleModal(); }} style={{ backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", padding: "10px 20px" }}>+ Add New Listing</Button>
          </div>
        </div>

        {loading ? (
          <h3>Loading dashboard...</h3>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <Row>
            <Col lg="12" className="mb-5">
              <div className="bg-white p-4 rounded shadow-sm border">
                <h4 className="mb-4 fw-bold" style={{ color: "#0f172a" }}>My Business Listings</h4>
                <Table responsive hover className="align-middle">
                  <thead style={{ backgroundColor: "#f8fafc", color: "#64748b" }}>
                    <tr><th>Image</th><th>Type</th><th>Title</th><th>Price (Ksh)</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {listings.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No listings found. Click "+ Add New Listing" to create one.</td></tr>}
                    {listings.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img src={item.photo || "https://via.placeholder.com/50?text=No+Image"} alt="img" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", backgroundColor: "#e2e8f0" }} onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=No+Image"; }} />
                        </td>
                        <td><span className="badge bg-dark text-uppercase" style={{ padding: "6px 10px", fontSize: "0.7rem" }}>{item.itemType}</span></td>
                        <td className="fw-bold">{item.title}</td>
                        <td className="fw-bold text-success">{(item.pricePerNight || item.price)?.toLocaleString()}</td>
                        <td>
                          <Button onClick={() => handleEditClick(item)} size="sm" className="me-2" style={{ backgroundColor: "#f1f5f9", color: "#0f172a", border: "none" }}>Edit</Button>
                          <Button onClick={() => handleDelete(item._id, item.itemType)} size="sm" style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "none" }}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            
            <Col lg="12">
              <div className="bg-white p-4 rounded shadow-sm border">
                <h4 className="mb-4 fw-bold" style={{ color: "#0f172a" }}>Recent Bookings</h4>
                <Table responsive hover size="sm" className="align-middle">
                  <thead style={{ backgroundColor: "#f8fafc", color: "#64748b" }}>
                    <tr><th>Client</th><th>Item</th><th>Total</th></tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 && <tr><td colSpan="3" className="text-center py-4 text-muted">No bookings yet.</td></tr>}
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.fullName || "Guest"}</td>
                        <td>{booking.tourName || booking.hotelName || "Booking"}</td>
                        <td className="fw-bold text-success">{booking.totalPrice?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <Modal isOpen={modal} toggle={toggleModal} centered size="lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
        <ModalHeader toggle={toggleModal} style={{ borderBottom: "none", paddingBottom: "0" }}>
          <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "1.5rem" }}>
            {editingId ? "Edit Listing" : "Create a New Listing"}
          </span>
        </ModalHeader>
        <ModalBody style={{ padding: "2rem" }}>
          <Form onSubmit={handleAddListing}>
            <FormGroup className="mb-4">
              <Label className="fw-bold text-muted small text-uppercase">Listing Category</Label>
              <Input type="select" value={listingType} onChange={(e) => setListingType(e.target.value)} style={inputStyle} disabled={editingId !== null}>
                <option value="hotel">Hotel / Accommodation</option>
                <option value="tour">Safari Tour</option>
                <option value="transport">Transport Vehicle</option>
                <option value="product">Souvenir / Shop Product</option>
              </Input>
            </FormGroup>

            <Row>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label className="fw-bold text-muted small">Title</Label>
                  <Input required value={newListing.title} onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} placeholder="e.g. Maasai Mara Luxury Lodge" style={inputStyle} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label className="fw-bold text-muted small">City / Location</Label>
                  <Input required value={newListing.city} onChange={(e) => setNewListing({ ...newListing, city: e.target.value })} placeholder="e.g. Nairobi" style={inputStyle} />
                </FormGroup>
              </Col>
            </Row>
            
            {listingType === "hotel" && (
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Physical Address</Label>
                    <Input required value={newListing.address} onChange={(e) => setNewListing({ ...newListing, address: e.target.value })} placeholder="e.g. Karen Road" style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Price per Night (Ksh)</Label>
                    <Input required type="number" value={newListing.pricePerNight} onChange={(e) => setNewListing({ ...newListing, pricePerNight: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
              </Row>
            )}

            {listingType === "tour" && (
              <Row>
                <Col md="12">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Starting Address</Label>
                    <Input required value={newListing.address} onChange={(e) => setNewListing({ ...newListing, address: e.target.value })} placeholder="e.g. Wilson Airport" style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Price per Person (Ksh)</Label>
                    <Input required type="number" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Max Group Size</Label>
                    <Input required type="number" value={newListing.maxGroupSize} onChange={(e) => setNewListing({ ...newListing, maxGroupSize: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
              </Row>
            )}

            {listingType === "transport" && (
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Price (Ksh)</Label>
                    <Input required type="number" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Capacity (Pax)</Label>
                    <Input required type="number" value={newListing.capacity} onChange={(e) => setNewListing({ ...newListing, capacity: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Vehicle Type</Label>
                    <Input required value={newListing.type} onChange={(e) => setNewListing({ ...newListing, type: e.target.value })} placeholder="e.g. SUV" style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Category</Label>
                    <Input required value={newListing.category} onChange={(e) => setNewListing({ ...newListing, category: e.target.value })} placeholder="e.g. Safari 4x4" style={inputStyle} />
                  </FormGroup>
                </Col>
              </Row>
            )}

            {listingType === "product" && (
              <Row>
                <Col md="4">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Price (Ksh)</Label>
                    <Input required type="number" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Stock Qty</Label>
                    <Input required type="number" value={newListing.stock} onChange={(e) => setNewListing({ ...newListing, stock: e.target.value })} style={inputStyle} />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-muted small">Category</Label>
                    <Input required value={newListing.category} onChange={(e) => setNewListing({ ...newListing, category: e.target.value })} placeholder="e.g. Bags" style={inputStyle} />
                  </FormGroup>
                </Col>
              </Row>
            )}

            <FormGroup className="mb-3">
              <Label className="fw-bold text-muted small">Description</Label>
              <Input required type="textarea" rows="3" value={newListing.desc} onChange={(e) => setNewListing({ ...newListing, desc: e.target.value })} style={inputStyle} />
            </FormGroup>
            
            <FormGroup className="mb-4">
              <Label className="fw-bold text-muted small">Image URL</Label>
              <Input required value={newListing.photo} onChange={(e) => setNewListing({ ...newListing, photo: e.target.value })} style={inputStyle} />
            </FormGroup>

            <Button type="submit" block disabled={saving} style={{ backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontWeight: "700", fontSize: "1.05rem", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.2)", transition: "all 0.3s ease" }}>
              {saving ? "Saving..." : (editingId ? "Update Listing" : "Publish Listing")}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default VendorDashboard;