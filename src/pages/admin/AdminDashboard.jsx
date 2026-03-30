import React, { useState, useEffect } from 'react';
import { Users, Bell, TrendingUp, CheckCircle, ChevronRight, AlertCircle, Newspaper, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColor = {
  Alert: { bg: '#fee2e2', color: '#ef4444' },
  News: { bg: '#dbeafe', color: '#3b82f6' },
  Event: { bg: '#ede9fe', color: '#8b5cf6' },
  Exam: { bg: '#ffedd5', color: '#f97316' },
  Placement: { bg: '#dcfce7', color: '#22c55e' },
  Circular: { bg: '#f3f4f6', color: '#6b7280' },
};

const AdminDashboard = () => {
  const [facultyCount, setFacultyCount] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/faculty.json').then(r => r.json()),
      fetch('/notifications.json').then(r => r.json()),
    ]).then(([facData, notifData]) => {
      const total = Object.values(facData).reduce((sum, arr) => sum + arr.length, 0);
      setFacultyCount(total);
      setNotifications(notifData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const publishedCount = notifications.filter(n => n.status === 'Published').length;
  const draftCount = notifications.filter(n => n.status === 'Draft').length;
  const recentNotifs = [...notifications]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Faculty', value: loading ? '—' : facultyCount,
      icon: <Users size={24} />, color: 'var(--primary-color)',
      bg: '#dbeafe', link: '/admin/faculty',
    },
    {
      label: 'Published Notices', value: loading ? '—' : publishedCount,
      icon: <CheckCircle size={24} />, color: '#22c55e',
      bg: '#dcfce7', link: '/admin/notifications',
    },
    {
      label: 'Total Notifications', value: loading ? '—' : notifications.length,
      icon: <Bell size={24} />, color: '#f97316',
      bg: '#ffedd5', link: '/admin/notifications',
    },
    {
      label: 'Drafts Pending', value: loading ? '—' : draftCount,
      icon: <TrendingUp size={24} />, color: '#8b5cf6',
      bg: '#ede9fe', link: '/admin/notifications',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 style={{ margin: 0 }}>Dashboard Overview</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {stats.map((s) => (
          <Link key={s.label} to={s.link} style={{ textDecoration: 'none' }}>
            <div className="card stat-card" style={{ borderLeftColor: s.color, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{s.label}</div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              </div>
              <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>
                {s.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Recent Notifications */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Newspaper size={18} style={{ color: 'var(--primary-color)' }} /> Recent Notifications
            </h3>
            <Link to="/admin/notifications" style={{ fontSize: '0.8rem', color: 'var(--primary-color)', textDecoration: 'none' }}>View All →</Link>
          </div>
          {loading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading…</p>
          ) : recentNotifs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No notifications yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentNotifs.map(n => (
                <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: '20px', flexShrink: 0,
                    fontSize: '0.7rem', fontWeight: 600, marginTop: '2px',
                    background: categoryColor[n.category]?.bg || '#f3f4f6',
                    color: categoryColor[n.category]?.color || '#6b7280',
                  }}>{n.category}</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(n.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {' · '}<span style={{ color: n.status === 'Published' ? '#22c55e' : '#f97316' }}>{n.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarDays size={18} style={{ color: 'var(--primary-color)' }} /> Quick Actions
          </h3>
          <div className="flex flex-col gap-2">
            <Link to="/admin/faculty" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '1rem' }}>
              <div className="flex items-center gap-2">
                <Users size={18} style={{ color: 'var(--primary-color)' }} />
                <span>Manage Faculty Directory</span>
              </div>
              <ChevronRight size={18} />
            </Link>
            <Link to="/admin/notifications" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '1rem' }}>
              <div className="flex items-center gap-2">
                <Bell size={18} style={{ color: '#f97316' }} />
                <span>Post New Notification</span>
              </div>
              <ChevronRight size={18} />
            </Link>
            <Link to="/admin/notifications" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '1rem' }}>
              <div className="flex items-center gap-2">
                <AlertCircle size={18} style={{ color: '#8b5cf6' }} />
                <span>Review {draftCount || 0} Draft{draftCount !== 1 ? 's' : ''}</span>
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
