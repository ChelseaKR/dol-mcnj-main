import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { ApiClient } from "../../src/ApiClient";
import { SearchResultsPage } from "../../src/search-results/SearchResultsPage";

interface Props {
  // Empty props for now
}

export default function TrainingSearch(props: Props): ReactElement {
  const client = new ApiClient();

  return <SearchResultsPage client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};