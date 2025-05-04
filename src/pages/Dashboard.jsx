import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  MessageSquare, 
  LogOut,
  Menu,
  User
} from 'lucide-react';
import Admin from './Admin';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'movies', icon: Film, label: 'Manage Movies' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    { id: 'logout', icon: LogOut, label: 'Logout' }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'logout') {
      // Clear admin token and redirect to admin login
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl text-indigo-600 ${!isSidebarOpen && 'hidden'}`}>MovieAdmin</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            <Menu size={20} />
          </button>
        </div>
        <nav className="p-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center p-3 mb-2 rounded-lg transition-colors
                ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}
              `}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {format(new Date(), 'MMMM d, yyyy h:mm a')}
              </span>
              <div className="flex items-center space-x-2 text-gray-700">
                <User size={20} />
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && <Admin />}
          {activeTab === 'movies' && <div>Manage Movies Content</div>}
          {activeTab === 'feedback' && <div>Feedback Content</div>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;