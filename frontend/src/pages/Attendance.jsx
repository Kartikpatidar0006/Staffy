import { useState, useEffect } from 'react';
import { CalendarCheck, Filter, Clock, UserCheck, UserX } from 'lucide-react';
import {
  getEmployees,
  markAttendance,
  getEmployeeAttendance,
  getAttendanceByDate,
} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { StatusBadge } from '../components/Badge';
import toast from 'react-hot-toast';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Mark Attendance form state
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceStatus, setAttendanceStatus] = useState('Present');

  // View records state
  const [viewMode, setViewMode] = useState('employee');
  const [viewEmployee, setViewEmployee] = useState('');
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterDate, setFilterDate] = useState('');
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await getEmployees();
        setEmployees(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }
    setSubmitting(true);
    try {
      await markAttendance({
        employee_id: selectedEmployee,
        date: attendanceDate,
        status: attendanceStatus,
      });
      toast.success('Attendance marked successfully');
      if (viewMode === 'employee' && viewEmployee === selectedEmployee) {
        fetchRecords();
      } else if (viewMode === 'date' && viewDate === attendanceDate) {
        fetchRecords();
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchRecords = async () => {
    setRecordsLoading(true);
    try {
      if (viewMode === 'employee' && viewEmployee) {
        const res = await getEmployeeAttendance(viewEmployee, filterDate || undefined);
        setRecords(res.data);
      } else if (viewMode === 'date' && viewDate) {
        const res = await getAttendanceByDate(viewDate);
        setRecords(res.data);
      }
    } catch (err) {
      toast.error('Failed to fetch attendance records');
      setRecords([]);
    } finally {
      setRecordsLoading(false);
    }
  };

  useEffect(() => {
    if ((viewMode === 'employee' && viewEmployee) || (viewMode === 'date' && viewDate)) {
      fetchRecords();
    } else {
      setRecords([]);
    }
  }, [viewMode, viewEmployee, viewDate, filterDate]);

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorState message={error} />;

  if (employees.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Attendance</h1>
          <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Track daily attendance for your team</p>
        </div>
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/50 dark:border-surface-800">
          <EmptyState
            icon={CalendarCheck}
            title="No employees to track"
            description="Add employees first before marking attendance."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Attendance</h1>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Track daily attendance for your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mark Attendance — Left Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/50 dark:border-surface-800 shadow-lg overflow-hidden sticky top-24">
            <div className="px-6 py-5 border-b border-surface-100/50 dark:border-surface-800/50 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-surface-800 dark:to-surface-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                  <Clock size={20} />
                </div>
                <h2 className="text-base font-bold text-surface-900 dark:text-white">Mark Attendance</h2>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleMarkAttendance} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="input-base"
                  >
                    <option value="">Select employee...</option>
                    {employees.map((emp) => (
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {emp.full_name} ({emp.employee_id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-4 text-sm font-semibold cursor-pointer transition-all duration-200 ${
                        attendanceStatus === 'Present'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shadow-md'
                          : 'border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:border-emerald-300 dark:hover:border-emerald-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="Present"
                        checked={attendanceStatus === 'Present'}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                        className="sr-only"
                      />
                      <UserCheck size={20} />
                      Present
                    </label>
                    <label
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-4 text-sm font-semibold cursor-pointer transition-all duration-200 ${
                        attendanceStatus === 'Absent'
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 shadow-md'
                          : 'border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:border-red-300 dark:hover:border-red-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="Absent"
                        checked={attendanceStatus === 'Absent'}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                        className="sr-only"
                      />
                      <UserX size={20} />
                      Absent
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : 'Mark Attendance'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* View Attendance Records — Right Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/50 dark:border-surface-800 shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 border-b border-surface-100/50 dark:border-surface-800/50 bg-gradient-to-r from-surface-50 to-white dark:from-surface-800 dark:to-surface-900">
              <h2 className="text-base font-bold text-surface-900 dark:text-white">Attendance Records</h2>
              <div className="flex gap-2 sm:ml-auto bg-surface-100 dark:bg-surface-800 rounded-full p-1">
                <button
                  onClick={() => setViewMode('employee')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    viewMode === 'employee'
                      ? 'bg-white dark:bg-surface-700 text-blue-700 dark:text-blue-400 shadow-md'
                      : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
                >
                  By Employee
                </button>
                <button
                  onClick={() => setViewMode('date')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    viewMode === 'date'
                      ? 'bg-white dark:bg-surface-700 text-blue-700 dark:text-blue-400 shadow-md'
                      : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
                >
                  By Date
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {viewMode === 'employee' ? (
                  <>
                    <select
                      value={viewEmployee}
                      onChange={(e) => setViewEmployee(e.target.value)}
                      className="input-base flex-1"
                    >
                      <option value="">Select employee...</option>
                      {employees.map((emp) => (
                        <option key={emp.employee_id} value={emp.employee_id}>
                          {emp.full_name} ({emp.employee_id})
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      placeholder="Filter by date"
                      className="input-base"
                    />
                    {filterDate && (
                      <button
                        onClick={() => setFilterDate('')}
                        className="px-4 py-2 text-sm font-semibold text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </>
                ) : (
                  <input
                    type="date"
                    value={viewDate}
                    onChange={(e) => setViewDate(e.target.value)}
                    className="input-base"
                  />
                )}
              </div>

              {/* Records */}
              {recordsLoading ? (
                <LoadingSpinner message="Loading records..." />
              ) : records.length === 0 ? (
                <EmptyState
                  icon={CalendarCheck}
                  title="No attendance records"
                  description={
                    viewMode === 'employee' && !viewEmployee
                      ? 'Select an employee to view their attendance records.'
                      : 'No attendance records found for the selected criteria.'
                  }
                />
              ) : (
                <div className="rounded-xl border border-surface-200/50 dark:border-surface-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-50/50 dark:bg-surface-800/30 border-b border-surface-100/50 dark:border-surface-800/50">
                        {viewMode === 'date' && (
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                            Employee
                          </th>
                        )}
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100/50 dark:divide-surface-800/30">
                      {records.map((record) => (
                        <tr key={record.id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors">
                          {viewMode === 'date' && (
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold">
                                  {record.employee_name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                  <div className="font-semibold text-surface-900 dark:text-white">
                                    {record.employee_name}
                                  </div>
                                  <div className="text-xs text-surface-500 dark:text-surface-400 font-mono">{record.employee_id}</div>
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">
                            {new Date(record.date + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={record.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
