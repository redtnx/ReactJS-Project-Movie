import React, { useEffect } from "react";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { layDuLieuLocal } from "../utilities/localStorage";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //khi người dùng không phải quản trị vào sẽ đá về trang chủ hoặc bất kì trang nào mình muốn
  useEffect(() => {
    //gọi dữ liệu từ local lên
    const user = layDuLieuLocal("user");
    //một là không có dữ liệu
    //hai là lấy lên mà maLoaiKhachHang không phải là QuanTri
    if (user) {
      // console.log(user);
      if (user.maLoaiNguoiDung != "QuanTri") {
        window.location.href = "https://google.com";
      }
    } else {
      window.location.href = "https://google.com";
    }
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <i className="fa-solid fa-user" />,
              label: <NavLink to="/admin/user">User</NavLink>,
            },
            {
              key: "2",
              icon: <i className="fa-solid fa-film" />,
              label: <NavLink to="/admin/movie">Movie</NavLink>,
            },
            {
              key: "3",
              icon: <i className="fa-solid fa-clock" />,
              label: <NavLink to="/admin/showtime">Show Time</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
