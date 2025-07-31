import React from "react";
import { GetServerSideProps } from "next";
import { SearchResultsPage } from "../../lib/search-results/SearchResultsPage";
import { ApiClient } from "../../lib/ApiClient";

interface Props {
  searchQuery?: string;
}

export default function TrainingSearch({ searchQuery }: Props) {
  const apiClient = new ApiClient();
  
  return <SearchResultsPage client={apiClient} searchQuery={searchQuery} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  
  return {
    props: {
      searchQuery: q || "",
    },
  };
};