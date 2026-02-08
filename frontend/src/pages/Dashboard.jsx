import { useState, useEffect } from 'react';
import { Users, CalendarCheck, Building2, UserX, TrendingUp, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getDashboard, getEmployees } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { StatCard, StatGrid } from '../components/Stats';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, empRes] = await Promise.all([getDashboard(), getEmployees()]);
      setDashboard(dashRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  const attendanceRate = dashboard.total_employees > 0
    ? Math.round((dashboard.total_present_today / dashboard.total_employees) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-white/80">Dashboard Overview</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Welcome to Staffy
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">
            {dashboard.total_employees > 0
              ? `You have ${dashboard.total_employees} employee${dashboard.total_employees !== 1 ? 's' : ''} with a ${attendanceRate}% attendance rate today.`
              : 'Add your first employee to get started managing your team.'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <StatGrid>
        <StatCard
          label="Total Employees"
          value={dashboard.total_employees}
          icon={Users}
          gradient="from-blue-500 to-cyan-400"
          bgLight="bg-blue-50"
          bgDark="dark:bg-blue-950/30"
          textColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          label="Present Today"
          value={dashboard.total_present_today}
          icon={CalendarCheck}
          gradient="from-emerald-500 to-green-400"
          bgLight="bg-emerald-50"
          bgDark="dark:bg-emerald-950/30"
          textColor="text-emerald-600 dark:text-emerald-400"
          trend={attendanceRate > 75 ? 5 : attendanceRate < 50 ? -5 : null}
        />
        <StatCard
          label="Absent Today"
          value={dashboard.total_absent_today}
          icon={UserX}
          gradient="from-red-500 to-pink-400"
          bgLight="bg-red-50"
          bgDark="dark:bg-red-950/30"
          textColor="text-red-600 dark:text-red-400"
        />
        <StatCard
          label="Departments"
          value={dashboard.department_count}
          icon={Building2}
          gradient="from-amber-500 to-orange-400"
          bgLight="bg-amber-50"
          bgDark="dark:bg-amber-950/30"
          textColor="text-amber-600 dark:text-amber-400"
        />
      </StatGrid>

      {/* Employee Summary Section */}
      <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/50 dark:border-surface-800 shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-surface-100/50 dark:border-surface-800/50 bg-gradient-to-r from-surface-50 to-white dark:from-surface-800 dark:to-surface-900">
          <div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Team Overview</h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Attendance records for all employees</p>
          </div>
          {employees.length > 0 && (
            <NavLink
              to="/employees"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
            >
              View All <ArrowRight size={16} />
            </NavLink>
          )}
        </div>
        
        <div className="overflow-x-auto">
          {employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
              <Users size={48} className="text-surface-300 dark:text-surface-700 mb-4" />
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                No employees added yet
              </p>
              <NavLink
                to="/employees"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>Add Your First Employee</span>
              </NavLink>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50/50 dark:bg-surface-800/30 border-b border-surface-100/50 dark:border-surface-800/50">
                  <th className="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    Employee
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    Department
                  </th>
                  <th className="px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    Present Days
                  </th>
                  <th className="px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    Absent Days
                  </th>
                  <th className="px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100/50 dark:divide-surface-800/30">
                {employees.slice(0, 10).map((emp, idx) => {
                  const total = emp.total_present + emp.total_absent;
                  const rate = total > 0 ? Math.round((emp.total_present / total) * 100) : 0;
                  return (
                    <tr key={emp.employee_id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold shadow-md">
                            {emp.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-surface-900 dark:text-white">{emp.full_name}</div>
                            <div className="text-surface-500 dark:text-surface-400 text-xs font-mono">{emp.employee_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {emp.total_present}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          {emp.total_absent}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`text-sm font-bold rounded-full px-3 py-1 ${
                            rate >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                            rate >= 60 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {rate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
