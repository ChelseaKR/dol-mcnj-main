import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../src/ApiClient";
import { InDemandOccupationsPage } from "../src/in-demand-occupations-page/InDemandOccupationsPage";

interface Props {
  // Empty props for now
}

export default function InDemandOccupations(props: Props): ReactElement {
  const client = new ApiClient();

  return <InDemandOccupationsPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};