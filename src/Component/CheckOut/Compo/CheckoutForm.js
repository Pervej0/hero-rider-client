import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Spinner } from "react-bootstrap";

const CheckoutForm = ({ paymentDetails }) => {
  const [errors, setErrors] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsprocesing] = useState(false);
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://pacific-beach-91181.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.log(error));
  }, [paymentDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    setIsprocesing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrors(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    setErrors("");
    setIsprocesing(false);

    // intent payment---
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: paymentDetails.userName,
          },
        },
      });

    if (intentError) {
      setSuccess("");
      setErrors(intentError.message);
    } else {
      console.log(paymentIntent);
      setSuccess("Your payment proceed successfully");
    }
    console.log(clientSecret);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-danger fw-bold">{errors}</p>
      <p className="text-success text-sm">{success}</p>
      {isProcessing ? (
        <Spinner animation="border" />
      ) : (
        <button
          className="fw-bold text-white bg-dark text-uppercase border-0 px-4 py-1 rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
