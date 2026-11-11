import React, { useContext, useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const OFFERINGS = [
  { value: "hotels", label: " Hotels / Stays" },
  { value: "safaris", label: " Safaris / Tours" },
  { value: "transport", label: " Transport / Nganya" },
];

const BecomeVendor = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    businessName: "",
    phone: "",
    idNumber: "",
    offerings: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleOffering = (val) => {
    setForm((prev) => ({
      ...prev,
      offerings: prev.offerings.includes(val)
        ? prev.offerings.filter((o) => o !== val)
        : [...prev.offerings, val],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/vendor-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Application failed");
        return;
      }
      updateUser({
        vendorStatus: data.data.vendorStatus,
        vendorApplication: data.data.vendorApplication,
      });
      navigate("/account");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/login?redirect=/become-vendor");
    return null;
  }

  if (user.role === "vendor" || user.vendorStatus === "approved") {
    return (
      <section style={{ padding: "120px 0", textAlign: "center" }}>
        <Container>
          <h2> You're already a vendor</h2>
          <Button
            className="btn btn-warning mt-3"
            onClick={() => navigate("/vendor-dashboard")}
          >
            Go to Vendor Dashboard
          </Button>
        </Container>
      </section>
    );
  }

  if (user.vendorStatus === "pending") {
    return (
      <section style={{ padding: "120px 0", textAlign: "center" }}>
        <Container>
          <h2> Application under review</h2>
          <p className="text-muted">
            Our team will review your application and get back to you soon.
          </p>
          <Button
            className="btn btn-outline-dark mt-3"
            onClick={() => navigate("/account")}
          >
            Back to My Account
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container style={{ maxWidth: "640px" }}>
        <h1 style={{ fontWeight: "800", textAlign: "center" }}>Become a Vendor</h1>
        <p className="text-muted text-center mb-4">
          Tell us about your business. Applications are reviewed within 24–48 hours.
        </p>

        {user.vendorStatus === "rejected" && user.vendorApplication?.rejectionReason && (
          <div className="alert alert-danger">
            <strong>Previous application was rejected:</strong>
            <br />
            {user.vendorApplication.rejectionReason}
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={submit}>
          <FormGroup>
            <Label>Business Name *</Label>
            <Input
              required
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              placeholder="e.g. Tsavo Safari Lodge"
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number *</Label>
            <Input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+254 7XX XXX XXX"
            />
          </FormGroup>
          <FormGroup>
            <Label>What will you offer?</Label>
            {OFFERINGS.map((o) => (
              <div key={o.value} className="form-check">
                <Input
                  type="checkbox"
                  checked={form.offerings.includes(o.value)}
                  onChange={() => toggleOffering(o.value)}
                />
                <Label check>{o.label}</Label>
              </div>
            ))}
          </FormGroup>
          <FormGroup>
            <Label>National ID / Business Registration (optional)</Label>
            <Input
              value={form.idNumber}
              onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
              placeholder="Used only for verification"
            />
          </FormGroup>
          <Button
            className="btn btn-warning fw-bold text-dark w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default BecomeVendor;