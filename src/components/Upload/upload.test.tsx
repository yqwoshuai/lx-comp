import React from "react";
import { render, fireEvent, RenderResult, wait } from "@testing-library/react";
import Upload from "./upload";
import axios from "axios";

const testProps = {
  action: "abc.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
};

jest.mock("../Icon/icon", () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("upload组件测试", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("upload") as HTMLElement;
  });
  it("upload组件", async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText("spinner")).toBeInTheDocument();
    await wait(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    // expect(testProps.onSuccess).toHaveBeenCalledWith(
    //   "cool",
    //   expect.objectContaining({
    //     percent: 0,
    //     raw: testFile,
    //     status: "success",
    //   })
    // );
    // expect(testProps.onChange).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     raw: testFile,
    //     status: "success",
    //     response: "cool",
    //     name: "test.png",
    //   })
    // );
  });
});
