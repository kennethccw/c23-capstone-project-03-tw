import styles from "../css/payment.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../components/StripePaymentForm";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function Payment() {
  const navigate = useNavigate();
  const clientSecret = new URLSearchParams(window.location.search).get("stripe") || undefined;
  const stripePromise = loadStripe("pk_test_51MVXIdIk8NmJ0izd1irjxXMXoXVHZindpEPplEP6CMPJ1J7xueG64LiMl7EhJqjpLqn8ErzAy1aLmFczHWNzcyj600jlejsWey");

  const appearance: { theme: "stripe" | "night" | "flat" | "none" | undefined } = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <IoIosArrowBack className={styles.navigateBackButton} onClick={() => navigate(-1)} />
      <div className={styles.donationHeaderContainer}>
        <h1>捐款樂</h1>
      </div>
      <hr className={styles.donationHr} />
      <div className={styles.stripeContainer}>
        <Elements options={options} stripe={stripePromise}>
          <StripePaymentForm />
        </Elements>
      </div>
    </div>
  );
}
