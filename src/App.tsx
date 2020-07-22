import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/meun";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <div>
        <Button>123</Button>
        <Button size={ButtonSize.Small}>123</Button>
        <Button
          className="custom"
          onClick={() => console.log(1)}
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        >
          123
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
          123
        </Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large}>
          123
        </Button>
        <Button disabled btnType={ButtonType.Link} href="www.baidu.com">
          123
        </Button>
      </div>
      <div>
        <Menu
          mode="vertical"
          defaultIndex={0}
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>link1</MenuItem>
          <MenuItem disabled>link2</MenuItem>
          <MenuItem>link3</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
