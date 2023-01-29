import { DonationService } from "../services/DonationService";
import { Request, Response } from "express";
import Stripe from "stripe";
import { Donation } from "../utils/models";
export class DonationController {
  constructor(private donationService: DonationService) {}

  postDonationRender = async (req: Request, res: Response) => {
    try {
      const donationAmount = req.body.donationAmount;
      console.log(typeof donationAmount);
      console.log(donationAmount);

      const stripe = new Stripe(
        "sk_test_51MVXIdIk8NmJ0izdxbJkXam2pBJzE8X4FDoYpsyjg1RAmw1lijVHNQglAlvcYgH395BqKLGQbryuaEZw5wgpjKtI00bta7EnJl",
        {
          apiVersion: "2022-11-15",
        }
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(donationAmount + "00"),
        // payment_method_types: ["card"],
        currency: "HKD",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  putDonationSubmition = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const donationWithNoUserId = req.body.donation;

      const donation: Donation = { ...donationWithNoUserId, uid };

      const result = await this.donationService.putDonationSubmition(uid, donation);

      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
