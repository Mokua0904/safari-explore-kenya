import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Account = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login?redirect=/account");
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/me`, { credentials: "include" });
        const data = await res.json();
        if (data.success) updateUser(data.data);
      } catch {
        /* ignore */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking`, { credentials: "include" });
        const data = await res.json();
        if (cancelled) return;
        if (data.success) {
          setBookings(data.data.filter((b) => b.userEmail === user.email));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) return null;

  const vendorCard = (() => {
    if (user.role === "vendor") {
      return (
        <Card className="mb-3 border-success">
          <CardBody>
            <Badge color="success" className="mb-2">Vendor</Badge>
            <p className="mb-2">You're an approved vendor.</p>
            <Button
              color="warning"
              className="fw-bold text-dark"
              onClick={() => navigate("/vendor-dashboard")}
            >
              Go to Vendor Dashboard
            </Button>
          </CardBody>
        </Card>
      );
    }
    if (user.vendorStatus === "pending") {
      return (
        <Card className="mb-3 border-warning">
          <CardBody>
            <Badge color="warning" className="text-dark mb-2">Under Review</Badge>
            <p className="mb-0">
              Your vendor application is being reviewed. We'll update you soon.
            </p>
          </CardBody>
        </Card>
      );
    }
    if (user.vendorStatus === "rejected") {
      return (
        <Card className="mb-3 border-danger">
          <CardBody>
            <Badge color="danger" className="mb-2">Application Rejected</Badge>
            {user.vendorApplication?.rejectionReason && (
              <p className="mb-2 small text-muted">
                {user.vendorApplication.rejectionReason}
              </p>
            )}
            <Button color="outline-danger" onClick={() => navigate("/become-vendor")}>
              Reapply
            </Button>
          </CardBody>
        </Card>
      );
    }
    return (
      <Card className="mb-3">
        <CardBody>
          <h5 className="mb-2">💰 Earn with Safari Explore</h5>
          <p className="text-muted mb-2">
            Become a vendor to list hotels, safaris, or transport.
          </p>
          <Button
            color="warning"
            className="fw-bold text-dark"
            onClick={() => navigate("/become-vendor")}
          >
            Apply to Become a Vendor
          </Button>
        </CardBody>
      </Card>
    );
  })();

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container>
        <h1 style={{ fontWeight: "800" }} className="mb-4">My Account</h1>

        <Row>
          <Col lg="4" className="mb-4">
            <Card>
              <CardBody>
                <div className="text-center mb-3">
                  <img
                    src={user.photo || "https://via.placeholder.com/80"}
                    alt="avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h5 className="text-center mb-1">{user.username}</h5>
                <p className="text-muted text-center small mb-3">{user.email}</p>
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Role</span>
                  <Badge
                    color={
                      user.role === "vendor"
                        ? "success"
                        : user.role === "admin"
                        ? "dark"
                        : "secondary"
                    }
                  >
                    {user.role}
                  </Badge>
                </div>
              </CardBody>
            </Card>

            <div className="mt-3">{vendorCard}</div>

            {user.role === "admin" && (
              <Card className="mt-3 border-dark">
                <CardBody>
                  <Badge color="dark" className="mb-2">Admin</Badge>
                  <p className="small mb-2">Review pending vendor applications.</p>
                  <Button
                    color="dark"
                    size="sm"
                    onClick={() => navigate("/admin/vendors")}
                  >
                    Admin Panel →
                  </Button>
                </CardBody>
              </Card>
            )}
          </Col>

          <Col lg="8">
            <Card>
              <CardBody>
                <h5 className="mb-3">My Bookings</h5>
                {loading && <p className="text-muted">Loading bookings…</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                {!loading && !error && bookings.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">You haven't booked anything yet.</p>
                    <Link to="/tours" className="btn btn-warning fw-bold text-dark">
                      Browse Safaris
                    </Link>
                  </div>
                )}
                {!loading && bookings.length > 0 && (
                  <Table responsive hover size="sm">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Total (KES)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id}>
                          <td>
                            {b.tourName || b.hotelName || b.vehicleName || "Booking"}
                          </td>
                          <td className="fw-bold text-success">
                            {b.totalPrice?.toLocaleString()}
                          </td>
                          <td>
                            <Badge color="secondary">{b.status || "confirmed"}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Account;