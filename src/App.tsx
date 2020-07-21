import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>123</Button>
        <Button size={ButtonSize.Small}>123</Button>
        <Button disabled btnType={ButtonType.Primary} size={ButtonSize.Large}>123</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>123</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large}>123</Button>
        <Button disabled btnType={ButtonType.Link} href="www.baidu.com">123</Button>
      </header>
    </div>
  );
}

export default App;
