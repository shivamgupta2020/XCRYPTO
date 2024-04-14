import React from "react";
// import { useNavigate } from 'react-router-dom'
// import Logo from '../../imgs/logo.png'
import "./Dashboard.css";
import User_logo from "../../imgs/user.png";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import Wallet from "../../components/Wallet/Wallet";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="container_left">
          <SideNavbar />
        </div>
        <div className="container_right">
          <DashboardNavbar />
          <div className='container_rightBody'>
          <Wallet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
