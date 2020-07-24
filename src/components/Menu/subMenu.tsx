import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./meun";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical" ? openSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpend);
  const classes = classNames("lx-menu-item lx-submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 150);
  };
  const clickEvent =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvent =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("lx-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error("Menu的子组件只能是MenuItem");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
