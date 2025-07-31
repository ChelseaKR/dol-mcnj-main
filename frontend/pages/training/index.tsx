import React from "react";
import { GetServerSideProps } from "next";
import { TrainingExplorerPage } from "../../lib/training-explorer-page/TrainingExplorerPage";
import { ApiClient } from "../../lib/ApiClient";

interface Props {
  // Add any props that might be needed for SSR
}

export default function Training(props: Props) {
  const apiClient = new ApiClient();
  
  return <TrainingExplorerPage client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};