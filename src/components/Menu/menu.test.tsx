import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Menu, { MenuProps } from "./meun";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
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
    </Menu>
  );
};

describe("menu组件测试", () => {
  beforeEach(() => {
    wrapper = render(checkMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("link1");
    disabledElement = wrapper.getByText("link2");
  });
  it("默认menu", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("lx-menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("lx-menu-item is-active");
    expect(disabledElement).toHaveClass("lx-menu-item is-disabled");
  });
  it("默认menuItem", () => {
    const thirdItem = wrapper.getByText("link3");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-acitve");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-acitve");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it("竖向menu", () => {
    cleanup();
    const wrapper = render(checkMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("lx-menu-vertical");
  });
});
