import React from "react";
import { Button } from "antd";
import { isEqual } from "lodash";

export class SearchPage extends React.Component {
  state = { count: 1 };

  handleFunc = () => {
    return 1;
  };

  componentWillMount() {
    const { setData } = this.props;
    setData({ id: 2, handleFunc: this.handleFunc });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  render() {
    const { config } = this.props;
    const { count } = this.state;
    return (
      <div>
        config：{JSON.stringify(config)}
        <br />
        {count}
        <Button onClick={() => this.setState({ count: count + 1 })}>
          添加 HOC
        </Button>
      </div>
    );
  }

  static create = () => {
    return WrappedComponent => {
      class Com extends React.Component {
        data = {};

        state = { d: {} };
        setConfig = con => {
          this.data["config"] = con;
        };

        getConfig = () => {
          return this.data["config"];
        };

        shouldComponentUpdate(nextProps, nextState) {
          return !isEqual(this.state.d, nextState.d);
        }

        getData = () => {
          // console.log(1, this.data["data"]);
          return this.state.d;
          return {
            ...this.state.d,
            query: {
              current: 1,
              length: 20,
              offset: 0
            }
          };
        };

        setData = data => {
          // this.data["data"] = data;
          this.setState({ d: data });
        };

        render() {
          const props = Object.assign({}, this.props);
          // console.log(111, this.data);
          return (
            <WrappedComponent
              {...props}
              demoProps={{
                setConfig: this.setConfig,
                getData: this.getData,
                getConfig: this.getConfig,
                setData: this.setData
              }}
            />
          );
        }
      }
      return Com;
    };
  };
}
