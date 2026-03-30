import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Main Site Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminNotifications from './pages/admin/AdminNotifications';

// Department Pages
import DepartmentPage from './pages/DepartmentPage';


const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/department/:deptSlug/:subSlug?" element={<DepartmentPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
