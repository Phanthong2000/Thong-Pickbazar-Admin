import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoginSelector } from "../redux/slices/userSlice";

function Dashboard() {
  const isLogin = useSelector(isLoginSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, isLogin);
  return <div style={{ height: "2000px" }}>dsada</div>;
}

export default React.memo(Dashboard);
