import { ImageProps } from "../types/contentful";
import { HomeToolCard } from "./HomeToolCard";
import welder from "../images/welder.png";
import mechanic from "../images/Mechanic.png";
import medical from "../images/Medical.png";

interface HomeBannerProps {
  heading: string;
  subheading?: string;
  image?: ImageProps;
  buttonCopy?: string;
  preload?: boolean;
  i: number;
}

export const HomeBanner = ({
  heading,
  subheading,
  image,
  buttonCopy,
  preload,
  i,
}: HomeBannerProps) => {
  return (
    <section className="homeBanner">
      <div className="homeHero">
        <h2 className="text-l">Welcome to</h2>
        <h1 className="homeHero">My Career NJ</h1>
        <h3 className="heroPill">🎉 Career exploration and job training directory.</h3>
      </div>
      <div>
        <h3 className="heroPrompt">What kind of career guidance are you looking for?</h3>
      </div>
      <div className="toolCardRow">
        {" "}
        <HomeToolCard
          i="0"
          icon="ReadCvLogo"
          title="I am looking for jobs based on my skills and interests."
          description="Upload your resume to see personalized job and training recommendations."
          className="heroCard"
        ></HomeToolCard>
        <HomeToolCard
          i="1"
          icon="Barbell"
          title="I am looking to up-skill or do job training."
          description="Search by job, training program, and more to find a training that works for you."
          className="heroCard"
        ></HomeToolCard>
        <HomeToolCard
          i="2"
          icon="Binoculars"
          title="I am unsure and just browsing."
          description="Explore popular industries to see what it takes to enter or progress in them."
          className="heroCard"
        ></HomeToolCard>
      </div>
      <div className="introBlock">
        <img src={mechanic} alt="New Jersey logo" className="leftBlock" />
        <div className="rightBlock">
          <h2>
            No matter where you are on your career journey, My Career NJ is here to help you.{" "}
          </h2>
          <p>
            Explore a connected suite of career, job, and training tools to help level up your
            career.
          </p>
          <div className="flexImage">
            <img src={medical} alt="New Jersey logo" className="rightImage" />
            <img src={welder} alt="New Jersey logo" className="rightImage" />
          </div>
        </div>
      </div>
    </section>
  );
};
