import { useNavigate } from "react-router-dom";
import "./Mysub.css";
import { useState, useEffect } from "react";
import API from "../../Component/MyApi/Myapi";

const MysubscriptionPage = () => {
  const [sub, setSub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSub = async () => {
      try {
        const res = await API.get("/sub/mysub");
        console.log(res.data);
        if (res.data.mySub) {
          setSub(res.data.mySub); // ✅ no [0] here
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSub();
  }, []);

  if (!sub) {
    return (
      <div className="success__loading">
        <p>Loading your subscription...</p>
      </div>
    );
  }

  return (
    <section className="section success">
      <div className="container success__container">

        <div className="card success__card">
          <span className="badge badge--green">
            {sub.paymentStatus === "paid" ? "Paid" : "Pending"}
          </span>

          <h2 className="success__title">
            Subscription Details 🎉
          </h2>

          <p className="success__subtitle">
            Here is your current juice plan:
          </p>

          <div className="success__details">

            <div>
              <strong>Name:</strong>
              <p>{sub.name}</p>
            </div>

            <div>
              <strong>Phone:</strong>
              <p>{sub.phone}</p>
            </div>

            <div>
              <strong>Location:</strong>
              <p>{sub.location}</p>
            </div>

            <div>
              <strong>Plan:</strong>
              <p>{sub.planName} {sub.planPeriod}</p>
            </div>

            <div>
              <strong>Status:</strong>
              <p>{sub.status}</p>
            </div>

            <div>
              <strong>Total:</strong>
              <p>KES {sub.planPrice}</p>
            </div>

            {sub.notes && (
              <div>
                <strong>Notes:</strong>
                <p>{sub.notes}</p>
              </div>
            )}

            <div>
              <strong>Subscribed on:</strong>
              <p>{new Date(sub.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <button
            className="btn btn--accent success__btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

      </div>
    </section>
  );
};

export default MysubscriptionPage;