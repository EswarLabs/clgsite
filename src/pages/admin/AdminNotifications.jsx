import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, X, ChevronDown, ExternalLink, Bell } from 'lucide-react';

const CATEGORIES = ['Alert', 'News', 'Event', 'Exam', 'Placement', 'Circular'];

const EMPTY_FORM = {
  title: '', category: 'News', date: new Date().toISOString().split('T')[0],
  status: 'Draft', link: '',
};

const categoryColor = {
  Alert: '#ef4444',
  News: '#3b82f6',
  Event: '#8b5cf6',
  Exam: '#f97316',
  Placement: '#22c55e',
  Circular: '#6b7280',
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/notifications.json')
      .then(r => r.json())
      .then(data => { setNotifications(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || n.title?.toLowerCase().includes(q) || n.category?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || n.status === statusFilter;
      const matchCat = categoryFilter === 'all' || n.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    });
  }, [notifications, searchTerm, statusFilter, categoryFilter]);

  const openAdd = () => { setCurrentEdit(null); setForm(EMPTY_FORM); setIsModalOpen(true); };
  const openEdit = (n) => { setCurrentEdit(n); setForm({ ...EMPTY_FORM, ...n }); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setCurrentEdit(null); };

  const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    if (currentEdit) {
      setNotifications(prev => prev.map(n => n.id === currentEdit.id ? { ...n, ...form } : n));
      showToast('Notification updated!');
    } else {
      const newNotif = { ...form, id: Date.now() };
      setNotifications(prev => [newNotif, ...prev]);
      showToast('Notification created!');
    }
    closeModal();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      showToast('Notification deleted.', 'danger');
    }
  };

  const publishedCount = notifications.filter(n => n.status === 'Published').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: toast.type === 'danger' ? '#ef4444' : '#22c55e',
          color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontSize: '0.9rem', fontWeight: 500,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Site Notifications</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {loading ? 'Loading…' : `${notifications.length} total · ${publishedCount} published · ${filtered.length} shown`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={18} /> Create Notification
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="form-control" placeholder="Search by title or category…"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem' }} />
          </div>
          <div style={{ position: 'relative', minWidth: '150px' }}>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select className="form-control" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ appearance: 'none', paddingRight: '2rem' }}>
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ position: 'relative', minWidth: '140px' }}>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select className="form-control" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ appearance: 'none', paddingRight: '2rem' }}>
              <option value="all">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
            <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCategoryFilter('all'); }} style={{ padding: '0.5rem 1rem' }}>
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading notifications…</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ minWidth: '280px' }}>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(notif => (
                <tr key={notif.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                        background: categoryColor[notif.category] || '#6b7280',
                      }} />
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>{notif.title}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block', padding: '2px 10px', borderRadius: '20px',
                      fontSize: '0.75rem', fontWeight: 600,
                      background: `${categoryColor[notif.category]}18`,
                      color: categoryColor[notif.category] || '#6b7280',
                    }}>
                      {notif.category}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {new Date(notif.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <span className={`badge ${notif.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                      {notif.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {notif.link && (
                      <a href={notif.link} target="_blank" rel="noreferrer"
                        className="btn btn-icon" style={{ color: 'var(--text-muted)' }}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button className="btn btn-icon" style={{ color: 'var(--primary-color)' }} onClick={() => openEdit(notif)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-icon" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(notif.id, notif.title)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No notifications found.
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', width: '100%' }}>
            <div className="modal-header">
              <h3>{currentEdit ? 'Edit Notification' : 'Create Notification'}</h3>
              <button className="btn btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>Title *</label>
                  <input name="title" className="form-control" value={form.title} onChange={handleFormChange} required placeholder="Notification heading…" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" className="form-control" value={form.category} onChange={handleFormChange}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" className="form-control" value={form.status} onChange={handleFormChange}>
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input name="date" type="date" className="form-control" value={form.date} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>Link <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <input name="link" className="form-control" value={form.link} onChange={handleFormChange} placeholder="https://…" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{currentEdit ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
