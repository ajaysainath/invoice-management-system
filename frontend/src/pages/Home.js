import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Home() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Unpaid",
  });

  // 🔐 Auth check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // 📦 Load invoices
  const loadInvoices = () => {
    fetch("http://localhost:5000/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/invoices/${editingId}`
      : "http://localhost:5000/invoices";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    }).then(() => {
      setForm({
        invoiceNumber: "",
        clientName: "",
        date: "",
        amount: "",
        status: "Unpaid",
      });
      setEditingId(null);
      loadInvoices();
    });
  };

  const editInvoice = (inv) => {
    setForm(inv);
    setEditingId(inv.id);
  };

  const deleteInvoice = (id) => {
    fetch(`http://localhost:5000/invoices/${id}`, {
      method: "DELETE",
    }).then(() => loadInvoices());
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="page">
      <div className="card wide">
        <div className="top-bar">
          <h2>{editingId ? "Edit Invoice" : "Add Invoice"}</h2>
          <button className="btn secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input name="invoiceNumber" placeholder="Invoice Number" value={form.invoiceNumber} onChange={handleChange} required />
          <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />

          <select name="status" value={form.status} onChange={handleChange}>
            <option>Unpaid</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

          <button className="btn primary" type="submit">
            {editingId ? "Update Invoice" : "Add Invoice"}
          </button>
        </form>

        <hr />

        <h3>Invoices</h3>

        <div className="list">
          {invoices.map((inv) => (
            <div className="list-item" key={inv.id}>
              <span>
                {inv.invoiceNumber} | {inv.clientName} | ₹{inv.amount} | {inv.status}
              </span>
              <div>
                <button className="btn small primary" onClick={() => editInvoice(inv)}>Edit</button>
                <button className="btn small danger" onClick={() => deleteInvoice(inv.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
