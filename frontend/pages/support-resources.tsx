import React from "react";
import { GetServerSideProps } from "next";
import { AllSupportPage } from "../lib/all-support-page/AllSupportPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function SupportResources(props: Props) {
  const apiClient = new ApiClient();
  
  return <AllSupportPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};