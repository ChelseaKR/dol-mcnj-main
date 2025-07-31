import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../src/ApiClient";
import { PrivacyPolicyPage } from "../src/privacy-policy-page/PrivacyPolicyPage";

interface Props {
  // Empty props for now
}

export default function PrivacyPolicy(props: Props): ReactElement {
  const client = new ApiClient();

  return <PrivacyPolicyPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};