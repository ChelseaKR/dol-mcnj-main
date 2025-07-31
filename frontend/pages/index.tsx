import React from "react";
import { GetServerSideProps } from "next";

export default function Home() {  
  return (
    <div>
      <h1>My Career NJ - Next.js Migration</h1>
      <p>This is the migrated Next.js version of the application.</p>
      <p>More features will be added incrementally.</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};