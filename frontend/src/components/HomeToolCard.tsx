import { IconSelector } from "./IconSelector";
import { IconNames, ToolCardProps } from "../types/icons";
import { Button } from "./modules/Button";

const btnCopy = [
  "Visit the NJ Career Navigator",
  "Visit the NJ Training Explorer",
  "Browse NJ Career Pathways",
];

const HomeToolCard = ({
  centered,
  description,
  icon,
  svg,
  iconWeight,
  indicator,
  title,
  i,
  titleType,
}: ToolCardProps) => {
  const iconName = icon as IconNames;
  const indicatorName = indicator as IconNames;

  return (
    <>
      <div className="heroCard">
        <div className="heroContent">
          <div className="icons">
            <span className="icon-container">
              <IconSelector
                weight={iconWeight}
                svgName={svg}
                name={iconName}
                size={32}
                color="$ink"
              />
            </span>
            {!centered && indicatorName && (
              <span className="icon-container">
                <IconSelector weight={iconWeight} name={indicatorName} size={25} color="$ink" />
              </span>
            )}
          </div>
          <h2 className="heroTitle">{title}</h2>
          <h3 className="heroDescription">{description}</h3>
        </div>
        <div className="heroBtn">
          {" "}
          <Button
            className="primary"
            type="button"
            url="/training"
            copy={btnCopy[i]}
            iconSuffix={"ArrowRight" as IconNames}
          />
        </div>
      </div>
    </>
  );
};

export { HomeToolCard };
