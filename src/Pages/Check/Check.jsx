import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Check.css"
const Checkout = () => {
  const { state: plan } = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://mcgray.onrender.com/sub", {
        ...form,
        plan,
      });

      alert("Subscription successful!");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
   <div className="checkout">
  <div className="checkout__card">

    <div className="checkout__header">
      <h2 className="checkout__title">Complete Your Order</h2>
      <p className="checkout__subtitle">
        You're one step away from fresh juice delivery 🧃
      </p>
    </div>

    <div className="checkout__plan">
      <div className="checkout__plan-name">{plan?.name}</div>
      <div className="checkout__plan-price">
        KES {plan?.price} {plan?.period}
      </div>
    </div>

    <form className="checkout__form" onSubmit={handleSubmit}>
      
      <div className="checkout__group">
        <label className="checkout__label">Full Name</label>
        <input
          className="checkout__input"
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout__group">
        <label className="checkout__label">Phone Number</label>
        <input
          className="checkout__input"
          type="text"
          name="phone"
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout__group">
        <label className="checkout__label">Delivery Location</label>
        <input
          className="checkout__input"
          type="text"
          name="location"
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn--primary btn--lg checkout__btn">
        Confirm Order →
      </button>
    </form>

    <p className="checkout__note">
      We will contact you via WhatsApp to confirm delivery.
    </p>

  </div>
</div>
  );
};

export default Checkout;