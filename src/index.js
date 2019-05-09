import React from "react";
import ReactDOM from "react-dom";
import { compose } from "redux";
import { Form, Button } from "antd";
import { SearchPage } from "./HocDemo";

import "./styles.css";

class App extends React.Component {
  state = { count: 1 };
  render() {
    const {
      demoProps: { setConfig, getConfig, setData, getData }
    } = this.props;
    const { count } = this.state;

    setConfig({
      id: 12,
      age: 12,
      count
    });
    const { id } = getData() || {};
    console.log(1, getData());
    return (
      <div className="App">
        <SearchPage config={getConfig()} setData={setData} />
        getData：{JSON.stringify(getData())}
        <br />
        <Button onClick={() => this.setState({ count: count + 1 })}>
          添加 index
        </Button>
      </div>
    );
  }
}

const Dom = compose(
  SearchPage.create(),
  Form.create()
)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<Dom />, rootElement);
