import React, { useState } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/meun";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Input from "./components/Input/input";
import AutoComplete, {
  DataSourceType,
} from "./components/AutoComplete/autoComplete";
import Upload from "./components/Upload/upload";

interface DataType {
  value: string;
  number?: number;
}

interface GithubUserProps {
  login?: string;
  url?: string;
  avatar_url?: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");

  // const strNum = ["aqwe", "bqwe", "cqwe", "dqwe"];
  // const strNums = [
  //   { value: "a", number: 11 },
  //   { value: "b", number: 0 },
  //   { value: "c", number: 1 },
  //   { value: "d", number: 2 },
  //   { value: "e", number: 3 },
  //   { value: "f", number: 4 },
  //   { value: "a1", number: 5 },
  //   { value: "b1", number: 6 },
  //   { value: "c1", number: 7 },
  //   { value: "d1", number: 8 },
  //   { value: "e1", number: 9 },
  //   { value: "f1", number: 10 },
  // ];
  // const handleFetch = (query: string) => {
  //   return strNum
  //     .filter((name) => name.includes(query))
  //     .map((name) => ({ value: name }));
  // };
  // const handleFetch = (query: string) => {
  //   return strNums.filter((name) => name.value.includes(query));
  // };
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: { login: any; url: any }) => ({
          value: item.login,
          ...item,
        }));
      });
  };
  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    return (
      <>
        <h3>Name: {item.value}</h3>
        <p>url: {item.url}</p>
      </>
    );
  };
  const beforeUploadBoolen = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      console.log("太大了");
      return false;
    }
    return true;
  };
  const beforeUploadPromise = (file: File) => {
    const newFile = new File([file], "newName", { type: file.type });
    return Promise.resolve(newFile);
  };
  return (
    <div className="App">
      <div>
        <Button>123</Button>
        <Button size="sm">123</Button>
        <Button
          className="custom"
          onClick={() => console.log(1)}
          btnType="primary"
          size="lg"
        >
          123
        </Button>
        <Button btnType="danger" size="lg">
          123
        </Button>
        <Button btnType="default" size="lg">
          123
        </Button>
        <Button btnType="link" href="www.baidu.com">
          123
        </Button>
      </div>
      <div>
        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            console.log(index);
          }}
        >
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
      </div>
      <div>
        <Input
          style={{ width: "200px" }}
          size="lg"
          prepend="321"
          value={inputValue}
          icon="arrow-down"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></Input>
      </div>
      <div>
        <AutoComplete
          style={{ width: "200px" }}
          fetchSuggestions={handleFetch}
          onSelect={(item) => {
            console.log(item);
          }}
          renderOption={renderOption}
        ></AutoComplete>
      </div>
      <div>
        <Upload
          action="https://jsonplaceholder.typicode.com/posts/"
          onProgress={() => {
            console.log("onProgress");
          }}
          onError={() => {
            console.log("onError");
          }}
          onSuccess={() => {
            console.log("onSuccess");
          }}
        ></Upload>
        <Upload
          action="https://jsonplaceholder.typicode.com/posts/"
          onChange={() => {
            console.log("onChange");
          }}
          beforeUpload={beforeUploadPromise}
        ></Upload>
      </div>
    </div>
  );
}

export default App;
