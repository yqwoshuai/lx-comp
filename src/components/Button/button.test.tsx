import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};

const disabledProps:ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe("button组件测试", () => {
  it("默认button", () => {
    const wrapper = render(<Button {...defaultProps}>hello</Button>);
    const element = wrapper.getByText("hello") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("各类button", () => {
    const wrapper = render(<Button {...testProps}>hello</Button>);
    const element = wrapper.getByText("hello");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  it("链接button", () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="www.baidu.com">link</Button>);
    const element = wrapper.getByText("link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass('btn btn-link')
  });
  it("禁用button", () => {
    const wrapper = render(<Button {...disabledProps}>hello</Button>);
    const element = wrapper.getByText("hello") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
