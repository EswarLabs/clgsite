import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const initialFaculty = [
  { id: 1, name: 'Dr. John Doe', department: 'Computer Science', role: 'Professor', status: 'Active' },
  { id: 2, name: 'Dr. Jane Smith', department: 'Electrical Eng', role: 'Associate Professor', status: 'Active' },
  { id: 3, name: 'Prof. Robert Brown', department: 'Mechanical Eng', role: 'Assistant Professor', status: 'On Leave' },
  { id: 4, name: 'Dr. Emily White', department: 'Civil Eng', role: 'Professor', status: 'Active' },
];

const AdminFaculty = () => {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setFaculty(faculty.filter(f => f.id !== id));
    }
  };

  const openModal = (facultyMember = null) => {
    setCurrentEdit(facultyMember);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEdit(null);
  };

  const saveFaculty = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFac = {
      id: currentEdit ? currentEdit.id : Date.now(),
      name: formData.get('name'),
      department: formData.get('department'),
      role: formData.get('role'),
      status: formData.get('status'),
    };

    if (currentEdit) {
      setFaculty(faculty.map(f => f.id === newFac.id ? newFac : f));
    } else {
      setFaculty([...faculty, newFac]);
    }
    closeModal();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Faculty Directory</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} />
          Add New Faculty
        </button>
      </div>

      <div className="card table-container">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative', maxWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search faculty..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map(fac => (
              <tr key={fac.id}>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{fac.name}</td>
                <td>{fac.department}</td>
                <td>{fac.role}</td>
                <td>
                  <span className={`badge ${fac.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {fac.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-icon" style={{ color: 'var(--primary-color)' }} onClick={() => openModal(fac)}>
                    <Edit2 size={18} />
                  </button>
                  <button className="btn btn-icon" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(fac.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredFaculty.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No faculty found matching your search.
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
              <h3>{currentEdit ? 'Edit Faculty' : 'Add New Faculty'}</h3>
              <button className="btn btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={saveFaculty}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" className="form-control" defaultValue={currentEdit?.name || ''} required />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select id="department" name="department" className="form-control" defaultValue={currentEdit?.department || 'Computer Science'}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Eng">Electrical Eng</option>
                    <option value="Mechanical Eng">Mechanical Eng</option>
                    <option value="Civil Eng">Civil Eng</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input type="text" id="role" name="role" className="form-control" defaultValue={currentEdit?.role || ''} required />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" className="form-control" defaultValue={currentEdit?.status || 'Active'}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Retired">Retired</option>
                  </select>
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
