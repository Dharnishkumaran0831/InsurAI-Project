import { useState } from 'react';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import {
  FileText, UserCheck, Clock, Upload, ShieldCheck, Users,
  AlertTriangle, Sparkles, Send, Bot, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getComplianceStatistics } from '../data/complianceRecords';
import { answerPolicyQuery } from '../services/geminiApi';

interface HRDashboardProps {
  userName?: string;
  userEmail?: string;
}

export default function HRDashboard({ userName = 'HR Manager', userEmail }: HRDashboardProps) {
  const navigate = useNavigate();
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const employeePolicies = [
    { id: 1, name: 'John Smith', department: 'Engineering', policies: 5, status: 'Complete', compliance: 100 },
    { id: 2, name: 'Sarah Johnson', department: 'Marketing', policies: 4, status: 'Pending', compliance: 80 },
    { id: 3, name: 'Michael Chen', department: 'Sales', policies: 6, status: 'Complete', compliance: 100 },
    { id: 4, name: 'Emily Davis', department: 'HR', policies: 5, status: 'Complete', compliance: 100 },
    { id: 5, name: 'David Wilson', department: 'Finance', policies: 3, status: 'Incomplete', compliance: 60 },
    { id: 6, name: 'Lisa Anderson', department: 'Operations', policies: 4, status: 'Pending', compliance: 75 },
  ];

  const pendingApprovals = [
    { id: 1, policy: 'Travel Insurance Policy', submittedBy: 'John Smith', date: '2024-01-15' },
    { id: 2, policy: 'Work From Home Policy', submittedBy: 'Sarah Johnson', date: '2024-01-14' },
    { id: 3, policy: 'Health & Safety Policy', submittedBy: 'Michael Chen', date: '2024-01-13' },
  ];

  const complianceStats = getComplianceStatistics();

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    try {
      const response = await answerPolicyQuery(
        aiQuery,
        'This is an HR Manager asking about company policies and compliance.'
      );
      setAiResponse(response);
    } catch (error) {
      setAiResponse('Sorry, AI assistant is not available right now. Please check your API key configuration.');
    } finally {
      setAiLoading(false);
    }
  };

  const quickPrompts = [
    'What is the standard leave policy?',
    'How to handle a compliance violation?',
    'What documents are needed for new employee onboarding?',
    'Explain health insurance coverage for employees',
  ];

  return (
    <Layout role="hr" userName={userName} userEmail={userEmail}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 dark:text-white mb-1">HR Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-blue-600">{userName}</span>! Manage employee policies and approvals.
            </p>
          </div>
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Assistant</span>
          </button>
        </div>

        {/* Gemini AI Assistant Panel */}
        {showAiPanel && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Gemini AI Policy Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Google Gemini AI</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiPanel(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setAiQuery(prompt)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-lg text-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
                placeholder="Ask about any HR policy or compliance question..."
                className="flex-1 px-4 py-3 border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleAiQuery}
                disabled={aiLoading || !aiQuery.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
              >
                {aiLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* AI Response */}
            {aiResponse && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Gemini AI Response:</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Policy Status"
            value="Active"
            icon={FileText}
            trend="142 total policies"
            trendUp={true}
            bgColor="from-blue-600 to-blue-700"
          />
          <DashboardCard
            title="Employee Requests"
            value="23"
            icon={UserCheck}
            trend="8 new today"
            trendUp={true}
            bgColor="from-purple-600 to-purple-700"
          />
          <DashboardCard
            title="Pending Approvals"
            value="12"
            icon={Clock}
            trend="Needs attention"
            trendUp={false}
            bgColor="from-amber-500 to-orange-600"
          />
          <DashboardCard
            title="Team Members"
            value="84"
            icon={Users}
            trend="+6 this month"
            trendUp={true}
            bgColor="from-green-500 to-emerald-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/policy-upload')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition">
                <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Upload Policy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add new policy document</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/compliance-checker')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition group"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition">
                <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Check Compliance</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Run AI compliance scan</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/employees')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition group"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">View Employees</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage team members</p>
              </div>
            </button>
          </div>
        </div>

        {/* Employee Compliance Issues Alert */}
        {complianceStats.pending > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-2 font-semibold">Employee Compliance Issues Require Attention</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {complianceStats.pending} employee-submitted compliance issues are pending review.
                    {complianceStats.critical > 0 && ` Including ${complianceStats.critical} critical issues that need immediate attention.`}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Submissions</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{complianceStats.total}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="font-semibold text-amber-700 dark:text-amber-400">{complianceStats.pending}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Critical</p>
                      <p className="font-semibold text-red-700 dark:text-red-400">{complianceStats.critical}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Resolved</p>
                      <p className="font-semibold text-green-700 dark:text-green-400">{complianceStats.resolved}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/employees')}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition whitespace-nowrap"
              >
                View All Issues
              </button>
            </div>
          </div>
        )}

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Pending Approvals</h3>
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{approval.policy}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Submitted by {approval.submittedBy} • {approval.date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                    Approve
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Policy Mapping Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Employee Policy Mapping</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Export Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Employee Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Department</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Policies</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Compliance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeePolicies.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{employee.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{employee.department}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{employee.policies}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          employee.status === 'Complete'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : employee.status === 'Pending'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[80px]">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              employee.compliance >= 80 ? 'bg-green-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${employee.compliance}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{employee.compliance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}