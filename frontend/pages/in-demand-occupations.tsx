import React from "react";
import { GetServerSideProps } from "next";
import { InDemandOccupationsPage } from "../lib/in-demand-occupations-page/InDemandOccupationsPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function InDemandOccupations(props: Props) {
  const apiClient = new ApiClient();
  
  return <InDemandOccupationsPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};