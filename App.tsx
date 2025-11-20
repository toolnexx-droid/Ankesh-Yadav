
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Clock, LogOut, Menu, X, Send, Link2, Phone, ShieldCheck } from 'lucide-react';
import DashboardStats from './components/DashboardStats';
import MessageComposer from './components/MessageComposer';
import NumberManager from './components/NumberManager';

// --- Layout Components ---

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-wa-light/10 text-wa-dark font-medium' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: MessageSquare, label: 'Bulk Sender', path: '/dashboard/messages' },
    { icon: Link2, label: 'Connection', path: '/dashboard/numbers' },
    { icon: Clock, label: 'Scheduler', path: '/dashboard/schedule' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-wa-dark font-bold text-xl">
              <Send className="fill-current" />
              <span>WASender</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <SidebarItem 
                key={item.path} 
                icon={item.icon} 
                label={item.label} 
                path={item.path} 
                active={location.pathname === item.path}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header matching the reference image (Dark with Credit badges) */}
        <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 lg:px-8 text-white">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-300 hover:text-white">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 text-xs font-bold rounded-sm cursor-pointer transition-colors">
              Credit
            </span>
            <span className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-sm uppercase cursor-pointer transition-colors">
              WHATSAPP:20
            </span>
            <button 
              onClick={onLogout} 
              className="ml-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-1 text-xs font-bold rounded-sm transition-colors uppercase tracking-wide"
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Pages ---

const HomePage = () => (
  <div className="min-h-screen bg-white">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 text-wa-dark font-bold text-2xl">
        <Send className="fill-current" />
        <span>WASender</span>
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">Log in</Link>
        <Link to="/login" className="bg-wa text-white px-6 py-2 rounded-full font-medium hover:bg-wa-dark transition-colors">Get Started</Link>
      </div>
    </nav>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Automate your <span className="text-wa">WhatsApp</span> marketing.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Send bulk messages, manage virtual numbers, and schedule campaigns with ease. Powered by Python automation and AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login" className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-wa text-white font-bold text-lg hover:bg-wa-dark transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </Link>
            <button className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-gray-100 text-gray-900 font-bold text-lg hover:bg-gray-200 transition-all">
              View Demo
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-wa-light to-blue-500 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
          <img 
            src="https://picsum.photos/seed/whatsapp_dashboard/800/600" 
            alt="Dashboard Preview" 
            className="relative rounded-2xl shadow-2xl border-4 border-white"
          />
        </div>
      </div>

      <div className="mt-32 grid md:grid-cols-3 gap-8">
        {[
          { icon: MessageSquare, title: "Bulk Sender", desc: "Send thousands of messages with a single click using our secure cloud infrastructure." },
          { icon: Phone, title: "Virtual Numbers", desc: "Instantly generate virtual numbers from over 50 countries for your campaigns." },
          { icon: ShieldCheck, title: "Anti-Ban Tech", desc: "Smart delays and rotation algorithms to keep your numbers safe from bans." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors">
            <feature.icon className="w-12 h-12 text-wa mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LoginPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center text-wa-dark mb-6">
        <Send size={48} />
      </div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or <a href="#" className="font-medium text-wa hover:text-wa-dark">start your 14-day free trial</a>
      </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wa focus:border-wa sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wa focus:border-wa sm:text-sm" />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wa hover:bg-wa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wa transition-colors">
              Sign in
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Access</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button onClick={onLogin} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Skip Login (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SchedulerPage = () => (
  <div className="space-y-6">
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Scheduled Campaigns</h2>
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns scheduled</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new bulk message campaign.</p>
        <div className="mt-6">
          <Link to="/dashboard/messages" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-wa hover:bg-wa-dark">
            Create Campaign
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><DashboardStats /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/dashboard/messages" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><MessageComposer /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/dashboard/numbers" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><NumberManager /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/dashboard/schedule" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><SchedulerPage /></DashboardLayout> : <Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}
