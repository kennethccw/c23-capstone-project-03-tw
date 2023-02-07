import { fetchJson } from "./utilsAPI";

const DONATION_API_PATH = `${process.env.REACT_APP_BACKEND_URL}/donation`;
// const DONATION_API_PATH = `${"http://localhost:8080"}/donation`;

export interface Donation {
  receipt_name: string;
  receipt_email: string;
  receipt_mobile: string;
  payment_method?: string;
  donation_amount: number;
}

export const postDonationRender = async (donationAmount: number) => {
  console.log(typeof donationAmount);
  console.log(donationAmount);
  const resp = await fetch(`${DONATION_API_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ donationAmount }),
  });
  return resp;
};
export const putDonationSubmition = async (donation: Donation) => {
  console.log("donation api");
  const resp = await fetch(`${DONATION_API_PATH}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ donation }),
  });
  return resp;
};
