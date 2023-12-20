import { BiBookAlt } from "react-icons/bi";
import { type IconType } from "react-icons/lib";

export const LINK_ICON_STYLE = { height: "20px", width: "20px" };

export type SideBarLink = {
  icon: IconType;
  name: string;
  url: string;
};

export type SideBarLinks = SideBarLink[];

export const LINKS: SideBarLinks = [
  {
    name: "Dashboard",
    url: "/dashboard",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    icon: BiBookAlt,
  },
];
