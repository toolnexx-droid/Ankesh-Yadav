import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MessageSquare, Users, TrendingUp, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', sent: 4000, failed: 240 },
  { name: 'Tue', sent: 3000, failed: 139 },
  { name: 'Wed', sent: 2000, failed: 980 },
  { name: 'Thu', sent: 2780, failed: 390 },
  { name: 'Fri', sent: 1890, failed: 480 },
  { name: 'Sat', sent: 2390, failed: 380 },
  { name: 'Sun', sent: 3490, failed: 430 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 text-${color}-500`} aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <span className={`font-medium text-${color}-600`}>{trend}</span>
        <span className="text-gray-500 ml-2">from last week</span>
      </div>
    </div>
  </div>
);

export default function DashboardStats() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Real-time analytics for your WhatsApp campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Messages Sent" value="71,897" icon={MessageSquare} trend="+12%" color="wa" />
        <StatCard title="Active Virtual Numbers" value="12" icon={Users} trend="+4" color="blue" />
        <StatCard title="Delivery Rate" value="98.5%" icon={TrendingUp} trend="+2.1%" color="green" />
        <StatCard title="Failed Messages" value="145" icon={AlertCircle} trend="-14%" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Campaign Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#128C7E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Failure Rate Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
