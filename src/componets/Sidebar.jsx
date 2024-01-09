import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearMyProfile, clearToken } from "../redux/actions";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={` shadow sidebar p-2 text-nowrap ${
          isSidebarOpen ? "size-sidebar" : "size-sidebar-collapsed"
        }  mx-2 my-2 rounded-4 ${isSidebarOpen ? "expanded" : "collapsed"}`}
      >
        {/* <div
          className="m-2 bg-primary-color "
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="brand-name fs-4 text-white">{isSidebarOpen ? "Grocery shop" : "GS"}</span>
        </div> */}
        {/* <hr className="text-dark" /> */}
        <div className={`toggle-btn ${isSidebarOpen ? "open" : ""} list-group list-group-flush `}>
          <a className="list-group-item my-2   sidebar-primary-button" onClick={toggleSidebar}>
            <i className="bi bi-speedometer2 fs-5 me-3"></i> <span>{isSidebarOpen ? "Dashboard" : ""}</span>
          </a>

          <a
            className="list-group-item my-2   sidebar-primary-button"
            onClick={() => {
              navigate("/dashboard/home");
            }}
          >
            <i className="bi bi-house fs-5 me-3"></i> <span>{isSidebarOpen ? "Home" : ""}</span>
          </a>

          <a
            className="list-group-item my-2   sidebar-primary-button"
            onClick={() => {
              navigate("/dashboard/products");
            }}
          >
            <i className="bi bi-table fs-5 me-3"></i> <span>{isSidebarOpen ? "Products" : ""}</span>
          </a>
          {/* <a
            className="list-group-item my-2   sidebar-primary-button"
            onClick={() => {
              navigate("/dashboard/report");
            }}
          >
            <i className="bi bi-clipboard-data fs-5 me-3"></i> <span>{isSidebarOpen ? "Report" : ""}</span>
          </a> */}
          <a
            className="list-group-item my-2   sidebar-primary-button"
            onClick={() => {
              navigate("/dashboard/orders");
            }}
          >
            <i className="bi bi-people fs-5 me-3"></i> <span>{isSidebarOpen ? "Orders" : ""}</span>
          </a>
          <a
            className="list-group-item my-2   sidebar-primary-button"
            onClick={() => {
              dispatch(clearMyProfile());
              dispatch(clearToken());
              navigate("/");

              // Rimuovi il token dal localStorage
              localStorage.removeItem("token");
            }}
          >
            <i className="bi bi-power fs-5 me-3"></i> <span>{isSidebarOpen ? "Logout" : ""}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
