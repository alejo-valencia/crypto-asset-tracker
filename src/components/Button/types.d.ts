import { CSSProperties } from "react";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  style?: CSSProperties;
}
