import { Container } from "@/components/Container";
import React from "react";

const refund = () => {
  return (
    <Container
      title="Refund Policy | Agency Template"
      className="pb-20 max-w-[90rem] mx-auto"
      description="Refund Policy at Agency Template."
    >
      <div className="prose prose-sm mx-auto">
        <h1>Refund Policy</h1>
        <p>
          Thank you for choosing XYZ Solutions Private Limited for your digital
          needs. We strive to provide the best service possible, but we
          understand that sometimes issues may arise.
        </p>
        <h2>Refund Policy</h2>
        <p>
          Due to the nature of our digital services, we do not issue refunds
          once the order is confirmed and the product is sent. Please read the
          product description carefully before making a purchase.
        </p>
        <p>
          If you have any questions about our products or services, please
          contact us before making a purchase. We will be happy to help you make
          an informed decision.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our refund policy, please
          contact us:
        </p>
        <ul>
          <li>Email: youremail@yourgmail.com</li>
        </ul>
      </div>
    </Container>
  );
};

export default refund;
