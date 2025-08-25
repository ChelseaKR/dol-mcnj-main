"use client";
import { ArrowSquareOut, House } from "@phosphor-icons/react";
import Link from "next/link";
import { useSurveyModal } from "@components/contexts/SurveyModalContext";

interface LinkObjectProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  role?: string;
  url: string;
  noIndicator?: boolean;
  target?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const LinkObject = ({
  children,
  onClick,
  role,
  id,
  target,
  className,
  noIndicator,
  url,
  style,
}: LinkObjectProps) => {
  const { showModal, shouldShowModal } = useSurveyModal();
  
  const isInternal = url.startsWith("/");
  const isHomePage = url === "/";
  const hasHttp = !isInternal && url.startsWith("http");
  const isHashLink = url.startsWith("#");
  
  const handleNavigation = (e: React.MouseEvent) => {
    // Don't show modal for hash links (same-page navigation)
    if (isHashLink) {
      e.preventDefault();
      const id = url.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (onClick) {
        onClick();
      }
      return;
    }
    
    // For navigation links, show modal if not dismissed
    if (shouldShowModal() && !isHashLink) {
      e.preventDefault();
      showModal(url);
    }
    
    if (onClick) {
      onClick();
    }
  };
  
  return isInternal ? (
    <Link
      id={id}
      className={`linkObject${className ? ` ${className}` : ""}`}
      role={role}
      href={url}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={handleNavigation}
      style={style}
    >
      {children}
      {!noIndicator && isHomePage && (
        <House weight="fill" size={14} className="ml-[4px] inline-block" />
      )}
    </Link>
  ) : (
    <a
      id={id}
      className={`linkObject${className ? ` ${className}` : ""}`}
      role={role}
      href={url.startsWith("#") ? url : !hasHttp ? `https://${url}` : url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleNavigation}
      style={style}
    >
      {children}
      {!noIndicator && (
        <ArrowSquareOut size={14} className="ml-[4px] inline-block" />
      )}
    </a>
  );
};

export { LinkObject };
