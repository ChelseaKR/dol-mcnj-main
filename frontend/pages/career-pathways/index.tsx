import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../../src/ApiClient";
import { CareerPathwaysPage } from "../../src/career-pathways-page/CareerPathwaysPage";

interface Props {
  // Empty props for now
}

export default function CareerPathways(props: Props): ReactElement {
  const client = new ApiClient();

  return <CareerPathwaysPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};