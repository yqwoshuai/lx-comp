import { FC } from "react";

import Menu, { MenuProps } from "./meun";
import SubMenu, { SubMenuProps } from "./subMenu";
import MeunItem, { MenuItemProps } from "./menuItem";

export type IMenuCompnent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as IMenuCompnent;

TransMenu.Item = MeunItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu
