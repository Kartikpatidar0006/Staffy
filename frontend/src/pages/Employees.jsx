import { useState, useEffect } from 'react';
import { Plus, Trash2, Users, Mail, Building, Hash, Filter } from 'lucide-react';
import { getEmployees, createEmployee, deleteEmployee } from '../services/api';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { DepartmentBadge } from '../components/Badge';
import { SearchInput } from '../components/SearchInput';
import { Table } from '../components/Table';
import toast from 'react-hot-toast';

const DEPARTMENTS = ['HR', 'IT', 'Sales', 'Marketing', 'Operations', 'Finance', 'Engineering'];

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [form, setForm] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.employee_id.trim()) errors.employee_id = 'Employee ID is required';
    if (!form.full_name.trim()) errors.full_name = 'Full name is required';
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }
    if (!form.department.trim()) errors.department = 'Department is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setSubmitting(true);
    try {
      await createEmployee(form);
      toast.success('Employee added successfully');
      setShowAddModal(false);
      setForm({ employee_id: '', full_name: '', email: '', department: '' });
      setFormErrors({});
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to add employee';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (employeeId, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This will also delete all their attendance records.`)) {
      return;
    }
    try {
      await deleteEmployee(employeeId);
      toast.success(`${name} has been removed`);
      setEmployees((prev) => prev.filter((e) => e.employee_id !== employeeId));
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to delete employee');
    }
  };

  const filteredEmployees = employees.filter(
    (emp) => {
      const matchSearch =
        emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchSearch && matchDept;
    }
  );

  if (loading) return <LoadingSpinner message="Loading employees..." />;
  if (error) return <ErrorState message={error} onRetry={fetchEmployees} />;

  // Table columns configuration
  const tableColumns = [
    {
      key: 'full_name',
      label: 'Name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold">
            {row.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-surface-900 dark:text-white">{value}</div>
            <div className="text-xs text-surface-500 dark:text-surface-400 font-mono">{row.employee_id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => <span className="text-sm text-surface-700 dark:text-surface-300">{value}</span>,
    },
    {
      key: 'department',
      label: 'Department',
      render: (value) => <DepartmentBadge department={value} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleDelete(row.employee_id, row.full_name)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          title="Delete employee"
        >
          <Trash2 size={16} />
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Employees</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            {filteredEmployees.length} of {employees.length} team member{employees.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Filters and Search */}
      {employees.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search by name, ID, or email..."
            className="flex-1"
          />
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-surface-500" />
            <div className="flex flex-wrap gap-2">
              {['All', ...DEPARTMENTS].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedDept === dept
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Employee List */}
      {employees.length === 0 ? (
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/50 dark:border-surface-800">
          <EmptyState
            icon={Users}
            title="No employees yet"
            description="Get started by adding your first employee to the system."
            action={
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                <Plus size={18} />
                Add Employee
              </button>
            }
          />
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users size={48} className="text-surface-300 dark:text-surface-700 mb-4" />
          <p className="text-surface-600 dark:text-surface-400 max-w-sm">
            No employees match your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-surface-200/50 dark:border-surface-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Table
            columns={tableColumns}
            data={filteredEmployees}
            sortable={true}
            striped={true}
          />
        </div>
      )}

      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormErrors({});
        }}
        title="Add New Employee"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              <Hash size={16} />
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.employee_id}
              onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
              placeholder="e.g. EMP001"
              className={`input-base ${formErrors.employee_id ? '!border-red-400 !ring-red-500/30' : ''}`}
            />
            {formErrors.employee_id && (
              <p className="mt-1 text-xs font-medium text-red-500">{formErrors.employee_id}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              <Users size={16} />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className={`input-base ${formErrors.full_name ? '!border-red-400 !ring-red-500/30' : ''}`}
            />
            {formErrors.full_name && (
              <p className="mt-1 text-xs font-medium text-red-500">{formErrors.full_name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              <Mail size={16} />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. aarav@company.com"
              className={`input-base ${formErrors.email ? '!border-red-400 !ring-red-500/30' : ''}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-xs font-medium text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              <Building size={16} />
              Department <span className="text-red-500">*</span>
            </label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className={`input-base ${formErrors.department ? '!border-red-400 !ring-red-500/30' : ''}`}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {formErrors.department && (
              <p className="mt-1 text-xs font-medium text-red-500">{formErrors.department}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setFormErrors({});
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
