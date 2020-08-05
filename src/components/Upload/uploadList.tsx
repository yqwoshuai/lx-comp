import React from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-list">
      {fileList.map((file) => {
        return (
          <li className="upload-list-item" key={file.uid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {file.name}
            </span>
            <span className="file-status">
              {(file.status === "uploading" || file.status === "ready") && (
                <Icon icon="spinner" spin theme="primary"></Icon>
              )}
              {file.status === "success" && (
                <Icon icon="check-circle" theme="success"></Icon>
              )}
              {file.status === "error" && (
                <Icon icon="times-circle" theme="danger"></Icon>
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(file);
                }}
              ></Icon>
            </span>
            {file.status === "uploading" && (
              <Progress percent={file.percent || 0}></Progress>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
