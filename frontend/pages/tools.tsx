import React from "react";
import { GetServerSideProps } from "next";
import { ToolsPage } from "../lib/tools-page/ToolsPage";
import { ApiClient } from "../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function Tools(props: Props) {
  const apiClient = new ApiClient();
  
  return <ToolsPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};