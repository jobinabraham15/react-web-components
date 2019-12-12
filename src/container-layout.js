import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
// import Microfrontend from "./Microfrontend";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class ContainerLayout extends React.Component {
  render() {
    let allContracts = this.props.allContracts || [];
    let menu =  (<Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={["2"]}
    style={{ lineHeight: "64px" }}
  >
    {allContracts.map(contract => {
    return contract.name !== this.props.contract.name ? <Menu.Item key={contract.name}>
      <Link to={`/${contract.route}${contract.landing}`} key={contract.name}> {contract.name}</Link>
      </Menu.Item>: null
    })}
  </Menu>);
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Dropdown overlay={menu}>
            <Button className="ant-dropdown-link" href="#">
             Switch Workspace<Icon type="down" />
            </Button>
          </Dropdown>
        </Header>
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
                {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
