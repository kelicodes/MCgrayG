import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Check.css"
import API from "../../Component/MyApi/Myapi";

const Checkout = () => {
  const { state: plan } = useLocation();
  const {token}=useContext(AuthContext)
  const navigate=useNavigate()

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

  if (!token) {
    toast.error(
      "To make a subscription, you must register as a user.",
      { position: "top-center" }
    );
    navigate("/login");
    return;
  }

  try {
    const payload = {
      ...form,
      planName: plan.name,
       planPrice: Number(plan.price.replace(/,/g, "")),
      planPeriod: plan.period,
    };

     console.log("PLAN:", plan);
console.log("PAYLOAD:", payload);

    const res = await API.post("/sub", payload);

    console.log(res);

    setForm({
      name: "",
      phone: "",
      location: "",
    });

    toast.success(res.data.message || "Order created successfully!", {
      position: "top-center",
    });

    // 🔥 REDIRECT WITH ORDER ID
    navigate(`/mysub`);

  } catch (err) {
    console.error(err);
    toast.error("Error submitting form", {
      position: "top-center",
    });
  }
};

  return (
   <div className="checkout">
  <div className="checkout__card">

    <div className="checkout__header">
      <h2 className="checkout__title">Confirm Your Subscription.</h2>
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
           value={form.name}
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
           value={form.phone}
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
           value={form.location}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn--primary btn--lg checkout__btn">
        Confirm Subscription. →
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