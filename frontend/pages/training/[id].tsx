import React from "react";
import { GetServerSideProps } from "next";
import { TrainingPage } from "../../lib/training-page/TrainingPage";
import { ApiClient } from "../../lib/ApiClient";

interface Props {
  id: string;
}

export default function TrainingDetail({ id }: Props) {
  const apiClient = new ApiClient();
  
  return <TrainingPage id={id} client={apiClient} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  
  return {
    props: {
      id: id as string,
    },
  };
};