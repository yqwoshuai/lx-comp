import React, { useRef, ChangeEvent, useState } from "react";
import axios from "axios";

import Button from "../Button/button";

export type UploadFileStatus = "ready" | "success" | "error" | "uploading";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadPorps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
}

export const Upload: React.FC<UploadPorps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processFile) => {
            post(processFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      size: file.size,
      name: file.name,
      percent: 0,
      raw: file,
    };
    setFileList((preFile) => [_file, ...preFile]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  console.log(fileList)
  return (
    <div className="lx-comp-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        上传文件
      </Button>
      <input
        className="lx-comp-file-input"
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
