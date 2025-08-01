import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../src/ApiClient";
import { ContactUsPage } from "../src/contact-us-page/ContactUsPage";

interface Props {
  // Empty props for now
}

export default function Contact(props: Props): ReactElement {
  const client = new ApiClient();

  return <ContactUsPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};