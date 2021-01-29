import { ReactNode } from "react";

export type ICtrolProps = {
  name: string;
  title?: string;
  active?: boolean;
};

export type ICtrolType = {
  name: string;
  title?: string;
  type?: "button" | "dropdown";
  render?: (props: ICtrolProps) => ReactNode;
};
