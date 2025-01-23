import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import ForgotPasswordForm from "./Pages/ForgotPasswordForm";
import ContactUsAdminPanel from "./Pages/ContactUsAdminPanel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/contact-us-admin-panel"
          element={
            <Layout>
              <ContactUsAdminPanel />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
