import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../../src/ApiClient";
import { TrainingExplorerPage } from "../../src/training-explorer-page/TrainingExplorerPage";

interface Props {
  // Empty props for now
}

export default function Training(props: Props): ReactElement {
  const client = new ApiClient();

  return <TrainingExplorerPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};