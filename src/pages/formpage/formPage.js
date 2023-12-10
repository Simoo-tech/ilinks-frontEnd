import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header";
function FormPage() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default FormPage;
