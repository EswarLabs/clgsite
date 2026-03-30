import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, X, ChevronDown, Mail, Phone, Calendar, ExternalLink, UserCircle } from 'lucide-react';

const DEPT_MAP = {
  '1': 'Civil Engineering',
  '2': 'Mechanical Engineering',
  '3': 'Electrical & Electronics',
  '4': 'Electronics & Communication',
  '5': 'Computer Science & Engg.',
  '6': 'Computer Science & Engg. (AI&ML)',
  '7': 'Information Technology',
  '8': 'Chemical Engineering',
  '9': 'MBA',
  '10': 'MCA',
  '11': 'Basic Sciences & Humanities',
};

const EMPTY_FORM = {
  name: '', designation: '', qualification: '', doj: '',
  phone: '', email: '', image: '', profile_link: '', deptId: '6',
};

const AdminFaculty = () => {
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/faculty.json')
      .then(r => r.json())
      .then(data => {
        const flat = [];
        Object.entries(data).forEach(([deptId, members]) => {
          members.forEach((m, i) => {
            flat.push({ ...m, deptId, _uid: `${deptId}-${i}-${m.name}` });
          });
        });
        setAllFaculty(flat);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredFaculty = useMemo(() => {
    return allFaculty.filter(f => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q ||
        f.name?.toLowerCase().includes(q) ||
        f.designation?.toLowerCase().includes(q) ||
        f.qualification?.toLowerCase().includes(q) ||
        f.email?.toLowerCase().includes(q);
      const matchDept = deptFilter === 'all' || f.deptId === deptFilter;
      return matchSearch && matchDept;
    });
  }, [allFaculty, searchTerm, deptFilter]);

  const openAdd = () => { setCurrentEdit(null); setForm(EMPTY_FORM); setIsModalOpen(true); };
  const openEdit = (f) => { setCurrentEdit(f); setForm({ ...EMPTY_FORM, ...f }); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setCurrentEdit(null); };

  const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    if (currentEdit) {
      setAllFaculty(prev => prev.map(f => f._uid === currentEdit._uid ? { ...f, ...form } : f));
      showToast('Faculty member updated successfully!');
    } else {
      const newEntry = { ...form, _uid: `new-${Date.now()}` };
      setAllFaculty(prev => [newEntry, ...prev]);
      showToast('Faculty member added successfully!');
    }
    closeModal();
  };

  const handleDelete = (uid, name) => {
    if (window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      setAllFaculty(prev => prev.filter(f => f._uid !== uid));
      showToast(`${name} removed.`, 'danger');
    }
  };

  const usedDeptIds = [...new Set(allFaculty.map(f => f.deptId))].sort((a, b) => Number(a) - Number(b));

  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: toast.type === 'danger' ? '#ef4444' : '#22c55e',
          color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontSize: '0.9rem', fontWeight: 500,
          animation: 'fadeIn 0.3s ease',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Faculty Directory</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {loading ? 'Loading…' : `${allFaculty.length} total · ${filteredFaculty.length} shown`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={18} /> Add New Faculty
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="form-control" placeholder="Search by name, designation, email…"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem' }} />
          </div>
          <div style={{ position: 'relative', minWidth: '200px' }}>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select className="form-control" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              style={{ appearance: 'none', paddingRight: '2rem' }}>
              <option value="all">All Departments</option>
              {usedDeptIds.map(id => (
                <option key={id} value={id}>{DEPT_MAP[id] || `Department ${id}`}</option>
              ))}
            </select>
          </div>
          {(searchTerm || deptFilter !== 'all') && (
            <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setDeptFilter('all'); }} style={{ padding: '0.5rem 1rem' }}>
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading faculty data…
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Faculty</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Qualification</th>
                <th>Contact</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map(fac => (
                <tr key={fac._uid}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {fac.image && fac.image.trim() ? (
                        <img src={fac.image.trim()} alt={fac.name}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <UserCircle size={38} style={{ color: 'var(--text-muted)' }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{fac.name}</div>
                        {fac.doj && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DOJ: {fac.doj}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>{fac.designation}</td>
                  <td style={{ fontSize: '0.875rem' }}>
                    <span className="badge" style={{ background: 'var(--bg-alt)', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.75rem' }}>
                      {DEPT_MAP[fac.deptId] || fac.deptId}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '150px' }}>{fac.qualification}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {fac.phone && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Phone size={11} />{fac.phone}
                        </div>
                      )}
                      {fac.email && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={11} />{fac.email.split(' ')[0]}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {fac.profile_link && (
                      <a href={fac.profile_link.trim()} target="_blank" rel="noreferrer"
                        className="btn btn-icon" style={{ color: 'var(--text-muted)' }}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button className="btn btn-icon" style={{ color: 'var(--primary-color)' }} onClick={() => openEdit(fac)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-icon" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(fac._uid, fac.name)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredFaculty.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No faculty found matching your search.
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', width: '100%' }}>
            <div className="modal-header">
              <h3>{currentEdit ? 'Edit Faculty Member' : 'Add New Faculty Member'}</h3>
              <button className="btn btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Full Name *</label>
                  <input name="name" className="form-control" value={form.name} onChange={handleFormChange} required placeholder="e.g. Dr. A.B. Sharma" />
                </div>
                <div className="form-group">
                  <label>Designation *</label>
                  <input name="designation" className="form-control" value={form.designation} onChange={handleFormChange} required placeholder="e.g. Professor & HOD" />
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select name="deptId" className="form-control" value={form.deptId} onChange={handleFormChange}>
                    {Object.entries(DEPT_MAP).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Qualification</label>
                  <input name="qualification" className="form-control" value={form.qualification} onChange={handleFormChange} placeholder="e.g. B.Tech, M.Tech, Ph.D" />
                </div>
                <div className="form-group">
                  <label>Date of Joining</label>
                  <input name="doj" type="date" className="form-control" value={form.doj} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input name="phone" className="form-control" value={form.phone} onChange={handleFormChange} placeholder="e.g. 9876543210" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" className="form-control" value={form.email} onChange={handleFormChange} placeholder="e.g. name@nbkrist.org" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Photo URL</label>
                  <input name="image" className="form-control" value={form.image} onChange={handleFormChange} placeholder="https://…" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Profile Link</label>
                  <input name="profile_link" className="form-control" value={form.profile_link} onChange={handleFormChange} placeholder="https://campuswala.in/nbkr/…" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{currentEdit ? 'Save Changes' : 'Add Faculty'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaculty;
