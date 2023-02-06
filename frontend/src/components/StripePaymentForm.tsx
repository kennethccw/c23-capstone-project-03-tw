import React, { useEffect, useState } from "react";
import styles from "../css/payment.module.scss";
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Layout, LayoutObject, StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import { Button, LoadingOverlay } from "@mantine/core";
import { Donation, putDonationSubmition } from "../api/donationAPI";
import { useNavigate } from "react-router-dom";

export default function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const clientSecret = new URLSearchParams(window.location.search).get("stripe") || undefined;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setAmount(paymentIntent?.amount);
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const receipt_name = sessionStorage.getItem("receipt_name") || "";
    const receipt_email = sessionStorage.getItem("receipt_email") || "";
    const receipt_mobile = sessionStorage.getItem("receipt_mobile") || "";
    const donation: Donation = { receipt_name, receipt_email, receipt_mobile, donation_amount: parseInt(amount?.toString().slice(0, -2)!) };

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.REACT_APP_FRONTEND_URL}/donation/payment/success`,
        receipt_email,
      },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }
    const resp = await putDonationSubmition(donation);
    const result = await resp.json();
    if (resp.status === 200) {
      setIsLoading(false);
      navigate("/donation/payment/success");
    } else {
      if (result.message) {
        alert(result.message);
      }
    }
  };

  const paymentElementOptions: { layout: Layout | LayoutObject | undefined } = {
    layout: "tabs",
  };
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <div className={styles.stripeFormContainer}>
        <form id="payment-form" className={styles.stripeForm} onSubmit={handleSubmit}>
          {/* <div className={styles.amountHeader}> */}
          <h2 className={styles.amountHeader}>{amount && "捐款金額為"}</h2>
          <h2>{amount && "HKD＄" + amount?.toString().slice(0, -2) + ".00"}</h2>
          {/* </div> */}
          <LinkAuthenticationElement id="link-authentication-element" onChange={(e: StripeLinkAuthenticationElementChangeEvent) => setEmail(e.value.email)} />
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          {/* {message && (
          <div id="payment-message" className={styles.stripeMessage}>
            {message}
          </div>
        )} */}
          <div className={styles.buttonContainer}>
            {amount && (
              <Button color={"violet"} disabled={isLoading || !stripe || !elements} id="submit" className={styles.button} radius="xl" type="submit">
                確認捐款
              </Button>
            )}
          </div>
          {/* Show any error or success messages */}
        </form>
      </div>
    </>
  );
}
