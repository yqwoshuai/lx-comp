import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./meun";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test"
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["4"]
};

const createCSSFile = () => {
  const cssFile = `
    .lx-submenu{
      display: none
    }
    .lx-submenu.menu-opened{
      display: block;
    }
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
const checkMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>link1</MenuItem>
      <MenuItem disabled>link2</MenuItem>
      <MenuItem>link3</MenuItem>
      <SubMenu title="submenu">
        <MenuItem>sub1</MenuItem>
        <MenuItem>sub2</MenuItem>
        <MenuItem>sub3</MenuItem>
      </SubMenu>
      <SubMenu title="submenu1">
        <MenuItem>sub4</MenuItem>
        <MenuItem>sub5</MenuItem>
        <MenuItem>sub6</MenuItem>
      </SubMenu>
    </Menu>
  );
};

describe("menu组件测试", () => {
  beforeEach(() => {
    wrapper = render(checkMenu(testProps));
    wrapper.container.append(createCSSFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("link1");
    disabledElement = wrapper.getByText("link2");
  });
  it("默认menu", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("lx-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass("lx-menu-item is-active");
    expect(disabledElement).toHaveClass("lx-menu-item is-disabled");
  });
  it("默认menuItem", () => {
    const thirdItem = wrapper.getByText("link3");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-acitve");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-acitve");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("竖向menu", () => {
    cleanup();
    const wrapper = render(checkMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("lx-menu-vertical");
  });
  it("子菜单menu", async () => {
    // expect(wrapper.queryByText("sub1")).not.toBeVisible();
    // const dropDownElement = wrapper.getByText("submenu");
    // fireEvent.mouseEnter(dropDownElement);
    // await wait(() => {
    //   expect(wrapper.queryByText("sub1")).toBeVisible();
    // });
    // fireEvent.click(wrapper.getByText("sub1"));
    // expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    // fireEvent.mouseLeave(dropDownElement);
    // await wait(() => {
    //   expect(wrapper.queryByText("sub1")).not.toBeVisible();
    // });
  });
  it("子菜单默认展开menu", async () => {
    cleanup();
    const wrapper = render(checkMenu(testVerProps));
    expect(wrapper.queryByText("sub5")).toBeVisible();
  });
});
