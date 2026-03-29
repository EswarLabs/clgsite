import React from 'react';
import { Users, Bell, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2>Dashboard Overview</h2>
        <div className="text-secondary text-sm">Last updated: Just now</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="card stat-card">
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Total Faculty</div>
            <div className="stat-value">124</div>
          </div>
          <div className="stat-icon">
            <Users size={24} />
          </div>
        </div>

        <div className="card stat-card" style={{ borderLeftColor: 'var(--secondary-color)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Active Notifications</div>
            <div className="stat-value" style={{ color: 'var(--text-primary)'}}>12</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: 'var(--secondary-color)' }}>
            <Bell size={24} />
          </div>
        </div>

        <div className="card stat-card" style={{ borderLeftColor: 'var(--success)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Recent Updates</div>
            <div className="stat-value">28</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#d1fae5', color: 'var(--success)' }}>
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="card stat-card" style={{ borderLeftColor: 'var(--danger)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Upcoming Events</div>
            <div className="stat-value">5</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fee2e2', color: 'var(--danger)' }}>
            <Calendar size={24} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2">
            <Link to="/admin/faculty" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '1rem' }}>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary-color" />
                <span>Manage Faculty Profiles</span>
              </div>
              <ChevronRight size={18} />
            </Link>
            <Link to="/admin/notifications" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '1rem' }}>
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-secondary-color" />
                <span>Post New Notification</span>
              </div>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
