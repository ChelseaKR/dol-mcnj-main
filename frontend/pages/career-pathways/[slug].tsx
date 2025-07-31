import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ApiClient } from "../../src/ApiClient";
import { IndustryPage } from "../../src/career-pathways-page/IndustryPage";

interface Props {
  // Empty props for now
}

export default function CareerPathwaySlug(props: Props): ReactElement {
  const router = useRouter();
  const { slug } = router.query;
  const client = new ApiClient();

  // Create a mock location object that matches WindowLocation interface
  const mockLocation = {
    pathname: `/career-pathways/${slug}`,
    search: '',
    hash: '',
    state: undefined,
    key: '',
    // Add the missing WindowLocation properties with default values
    ancestorOrigins: {} as DOMStringList,
    host: typeof window !== 'undefined' ? window.location.host : '',
    hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    href: typeof window !== 'undefined' ? window.location.href : '',
    origin: typeof window !== 'undefined' ? window.location.origin : '',
    port: typeof window !== 'undefined' ? window.location.port : '',
    protocol: typeof window !== 'undefined' ? window.location.protocol : '',
    assign: () => {},
    reload: () => {},
    replace: () => {},
  };

  // Pass the slug prop to IndustryPage which expects it from RouteComponentProps
  const mockRouteProps = {
    slug: slug as string,
    path: `/career-pathways/${slug}`,
    location: mockLocation,
    navigate: (to: string | number) => router.push(typeof to === 'string' ? to : router.asPath).then(() => {}),
    uri: `/career-pathways/${slug}`,
  };

  return <IndustryPage {...mockRouteProps} client={client} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};