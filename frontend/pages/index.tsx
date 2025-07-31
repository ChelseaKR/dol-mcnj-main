import React from "react";
import { GetServerSideProps } from "next";
import { LandingPage } from "../lib/landing-page/LandingPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function Home(props: Props) {
  const apiClient = new ApiClient();
  
  return <LandingPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Add any server-side data fetching if needed
  return {
    props: {},
  };
};