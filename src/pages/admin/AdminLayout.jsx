import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, LogOut, ShieldCheck } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== '1') {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_user');
    navigate('/admin/login', { replace: true });
  };

  const adminUser = sessionStorage.getItem('admin_user') || 'Admin';

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} style={{ color: '#60a5fa' }} />
            <h2>NBKRIST Admin</h2>
          </div>
        </div>

        <nav className="admin-nav">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/faculty"
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Users size={20} />
                <span>Faculty Directory</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/notifications"
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-header" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', marginTop: 'auto' }}>
          <button
            className="admin-nav-item"
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Management Portal</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage website content and resources
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Signed in as <strong style={{ color: 'var(--text-primary)' }}>{adminUser}</strong>
            </span>
            <span className="badge badge-primary">Admin Session</span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-content fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
