import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../src/ApiClient";
import { AllSupportPage } from "../src/all-support-page/AllSupportPage";

interface Props {
  // Empty props for now
}

export default function SupportResources(props: Props): ReactElement {
  const client = new ApiClient();

  return <AllSupportPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};