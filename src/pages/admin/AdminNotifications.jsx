import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const initialNotifications = [
  { id: 1, title: 'Semester Exams Announced', type: 'Alert', date: '2026-03-25', status: 'Published' },
  { id: 2, title: 'New Campus Wi-Fi Setup', type: 'News', date: '2026-03-22', status: 'Published' },
  { id: 3, title: 'Annual Cultural Fest Registrations', type: 'Event', date: '2026-04-10', status: 'Draft' },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredNotifications = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const openModal = (notification = null) => {
    setCurrentEdit(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEdit(null);
  };

  const saveNotification = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNotif = {
      id: currentEdit ? currentEdit.id : Date.now(),
      title: formData.get('title'),
      type: formData.get('type'),
      date: formData.get('date'),
      status: formData.get('status'),
    };

    if (currentEdit) {
      setNotifications(notifications.map(n => n.id === newNotif.id ? newNotif : n));
    } else {
      setNotifications([...notifications, newNotif]);
    }
    closeModal();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Site Notifications</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} />
          Create Notification
        </button>
      </div>

      <div className="card table-container">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative', maxWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search notifications..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map(notif => (
              <tr key={notif.id}>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{notif.title}</td>
                <td>
                  <span className="badge" style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--text-secondary)' }}>
                    {notif.type}
                  </span>
                </td>
                <td>{notif.date}</td>
                <td>
                  <span className={`badge ${notif.status === 'Published' ? 'badge-primary' : 'badge-warning'}`}>
                    {notif.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-icon" style={{ color: 'var(--primary-color)' }} onClick={() => openModal(notif)}>
                    <Edit2 size={18} />
                  </button>
                  <button className="btn btn-icon" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(notif.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredNotifications.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No notifications found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{currentEdit ? 'Edit Notification' : 'Create Notification'}</h3>
              <button className="btn btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={saveNotification}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Notification Title</label>
                  <input type="text" id="title" name="title" className="form-control" defaultValue={currentEdit?.title || ''} required />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Notification Type</label>
                  <select id="type" name="type" className="form-control" defaultValue={currentEdit?.type || 'Alert'}>
                    <option value="Alert">Alert</option>
                    <option value="News">News</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" name="date" className="form-control" defaultValue={currentEdit?.date || new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" className="form-control" defaultValue={currentEdit?.status || 'Draft'}>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
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
