import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button, Badge, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const AdminVendors = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!user) return navigate("/login?redirect=/admin/vendors");
    if (user.role !== "admin") return navigate("/home");
  }, [user, navigate]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/users/admin/pending-vendors`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load");
      setVendors(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const approve = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/admin/vendors/${id}/approve`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setVendors((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const reject = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/admin/vendors/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason: rejectReason }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setVendors((prev) => prev.filter((v) => v._id !== id));
      setRejectingId(null);
      setRejectReason("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container>
        <h1 style={{ fontWeight: "800" }} className="mb-4">
          Pending Vendor Applications
        </h1>

        {loading && <p>Loading…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && vendors.length === 0 && (
          <div className="alert alert-success">🎉 No pending applications.</div>
        )}

        {!loading && vendors.length > 0 && (
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Business</th>
                <th>Phone</th>
                <th>Offerings</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => {
                const a = v.vendorApplication || {};
                const isRejecting = rejectingId === v._id;
                return (
                  <tr key={v._id}>
                    <td>
                      <strong>{v.username}</strong>
                      <br />
                      <small className="text-muted">{v.email}</small>
                    </td>
                    <td>{a.businessName}</td>
                    <td>{a.phone}</td>
                    <td>
                      {(a.offerings || []).map((o) => (
                        <Badge key={o} color="info" className="me-1">
                          {o}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      {a.submittedAt
                        ? new Date(a.submittedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td style={{ minWidth: "220px" }}>
                      {!isRejecting ? (
                        <>
                          <Button
                            size="sm"
                            color="success"
                            className="me-2"
                            onClick={() => approve(v._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => setRejectingId(v._id)}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <>
                          <Input
                            type="text"
                            placeholder="Reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="mb-1"
                          />
                          <Button
                            size="sm"
                            color="danger"
                            className="me-2"
                            onClick={() => reject(v._id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            color="secondary"
                            onClick={() => {
                              setRejectingId(null);
                              setRejectReason("");
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </section>
  );
};

export default AdminVendors;