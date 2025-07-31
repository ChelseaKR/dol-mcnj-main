import React from "react";
import { GetServerSideProps } from "next";
import { OccupationPage } from "../../lib/occupation-page/OccupationPage";
import { ApiClient } from "../../lib/ApiClient";

interface Props {
  soc: string;
}

export default function Occupation({ soc }: Props) {
  const apiClient = new ApiClient();
  
  return <OccupationPage soc={soc} client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soc } = context.params!;
  
  return {
    props: {
      soc: soc as string,
    },
  };
};