import {
  AppstoreOutlined,
  ShopOutlined,
  MoneyCollectOutlined,
  HistoryOutlined,
  UserAddOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";

const SideNavbar = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <div className="title">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>XStocks</h2>
        </Link>
        <h6>Investments Made Easy</h6>
      </div>
      <div className="menu-container">
        <span className="subtitle">MENU</span>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashboard",
              icon: <AppstoreOutlined />,
              key: "/dashboard",
            },
            {
              label: "Portfolio",
              key: "/portfolio",
              icon: <ShopOutlined />,
            },
            {
              label: "Invest Now",
              key: "/invest",
              icon: <MoneyCollectOutlined />,
            },
            {
              label: "History",
              key: "/history",
              icon: <HistoryOutlined />,
            },
          ]}
        ></Menu>
      </div>

      <div className="community-container">
        <span className="subtitle">COMMUNITY</span>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Support Us",
              key: "/support",
              icon: <UserAddOutlined />,
            },
            {
              label: "About Us",
              key: "/about",
              icon: <ReadOutlined />,
            },
          ]}
        ></Menu>
      </div>
    </div>
  );
};
export default SideNavbar;
