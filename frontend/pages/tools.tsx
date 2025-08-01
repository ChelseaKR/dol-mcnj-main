import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../src/ApiClient";
import { ToolsPage } from "../src/tools-page/ToolsPage";

interface Props {
  // Empty props for now
}

export default function Tools(props: Props): ReactElement {
  const client = new ApiClient();

  return <ToolsPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};