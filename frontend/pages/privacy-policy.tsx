import React from "react";
import { GetServerSideProps } from "next";
import { PrivacyPolicyPage } from "../lib/privacy-policy-page/PrivacyPolicyPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function PrivacyPolicy(props: Props) {
  const apiClient = new ApiClient();
  
  return <PrivacyPolicyPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};