import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CheckoutForm from "./Compo/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KBZG4LNid0QRGrCCNYyv0MZfv9B4M4vCVBz0Hpl7UPbuhtheBJu1454NbDMaIdjzmK1lsdPG71nuqLmqFhhggq400pHKlhHsk"
);
const CheckOut = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const paymentDetails = {
    totalCost: data.price,
    userName: user.displayName,
    userEmail: user.email,
  };
  return (
    <section className="mx-2 container-fluid" style={{ minHeight: "80vh" }}>
      <div>
        <h3 className="text-center my-4">Checkout</h3>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <h3>{data.title}</h3>
          <h3>${data.price}</h3>
          <h3>{data.duration}</h3>
        </div>
        <div className="col-md-6 col-12">
          <Elements stripe={stripePromise}>
            <CheckoutForm paymentDetails={paymentDetails} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
