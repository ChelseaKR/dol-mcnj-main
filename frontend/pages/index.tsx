import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "../src/components/Layout";
import { ApiClient } from "../src/ApiClient";
import { HomeBanner } from "../src/landing-page/components/HomeBanner";
import { TopTools } from "../src/landing-page/components/TopTools";
import { Resources } from "../src/landing-page/components/Resourses";
import { useTranslation } from "react-i18next";
import { content } from "../src/landing-page/content";
import { CardProps } from "../src/components/Card";
import pageImage from "../src/images/ogImages/homePage.jpg";

interface Props {
  // We'll pass a simple object instead of class instance for SSR
}

export default function Home(props: Props): ReactElement {
  const { t } = useTranslation();
  // Create client on the client side
  const client = new ApiClient();

  const seoObject = {
    title: process.env.NEXT_PUBLIC_SITE_NAME as string,
    pageDescription:
      "Explore My Career NJ to find job training, career resources, and employment opportunities with the New Jersey Department of Labor.",
    image: typeof pageImage === 'string' ? pageImage : pageImage.src,
    url: "/",
  };

  return (
    <Layout client={client} noPad seo={seoObject}>
      <div className="home-page">
        <HomeBanner
          heading={t("LandingPage.bannerHeading")}
          images={content.banner.images.map(img => ({
            src: typeof img.src === 'string' ? img.src : img.src.src,
            alt: img.alt
          }))}
          subheading={t("LandingPage.bannerSubheading")}
          message={t("LandingPage.bannerMessageCopy")}
          preload
        />
        <TopTools
          heading={t("LandingPage.topToolsHeader")}
          items={
            [
              {
                heading: t("LandingPage.topToolNavigatorHeading"),
                description: t("LandingPage.topToolNavigatorDescription"),
                icon: "Compass",
                link: {
                  href: "/navigator",
                  text: t("LandingPage.topToolNavigatorButtonText"),
                },
                theme: "blue",
              },
              {
                heading: t("LandingPage.topToolExplorerHeading"),
                description: t("LandingPage.topToolExplorerDescription"),
                icon: "Signpost",
                link: {
                  href: "/training",
                  text: t("LandingPage.topToolExplorerButtonText"),
                },
                theme: "green",
              },
              {
                heading: t("LandingPage.topToolPathwaysHeading"),
                description: t("LandingPage.topToolPathwaysDescription"),
                icon: "Path",
                link: {
                  href: "/career-pathways",
                  text: t("LandingPage.topToolPathwaysButtonText"),
                },
                theme: "purple",
              },
            ] as CardProps[]
          }
        />
        <Resources
          heading={t("LandingPage.resourcesHeading")}
          subheading={t("LandingPage.resourcesDescription")}
          items={[
            {
              heading: t("LandingPage.resourcesCard1"),
              icon: "Briefcase",
              theme: "blue",
              link: {
                href: "/tools#jobs",
              },
            },
            {
              heading: t("LandingPage.resourcesCard2"),
              icon: "Signpost",
              theme: "green",
              link: {
                href: "/tools#training",
              },
            },
            {
              heading: t("LandingPage.resourcesCard3"),
              icon: "Path",
              theme: "purple",
              link: {
                href: "/tools#career",
              },
            },
            {
              heading: t("LandingPage.resourcesCard4"),
              icon: "Lifebuoy",
              theme: "navy",
              link: {
                href: "/tools#resources",
              },
            },
          ]}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};