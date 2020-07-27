import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/meun";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
function App() {
  return (
    <div className="App">
      <div>
        <Button>123</Button>
        <Button size='sm'>123</Button>
        <Button
          className="custom"
          onClick={() => console.log(1)}
          btnType='primary'
          size='lg'
        >
          123
        </Button>
        <Button btnType='danger' size="lg">
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
            <MenuItem>
              sub1
            </MenuItem>
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
    </div>
  );
}

export default App;
