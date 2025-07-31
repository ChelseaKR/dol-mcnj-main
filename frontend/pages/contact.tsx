import React from "react";
import { GetServerSideProps } from "next";
import { ContactUsPage } from "../lib/contact-us-page/ContactUsPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function Contact(props: Props) {
  const apiClient = new ApiClient();
  
  return <ContactUsPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};