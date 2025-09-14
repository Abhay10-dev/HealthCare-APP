import React, { useState, useEffect } from 'react';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import FeedbackPage from './pages/FeedbackPage';
import {
  User,
  Calendar,
  FileText,
  ShoppingCart,
  AlertTriangle,
  Heart,
  Phone,
  Mail,
  Lock,
  Settings,
  Bell,
  Search,
  Plus,
  Upload,
  Download,
  Star,
  MapPin,
  Clock,
  Shield,
  Activity,
  Pill,
  Ambulance,
  CreditCard,
  MessageSquare,
  BarChart3,
  Camera,
  Share2,
  Eye,
  EyeOff,
  Menu,
  X,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Users,
  DollarSign
} from 'lucide-react';

const HealthCareApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Sample user data
  const sampleUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    age: 32,
    bloodGroup: "A+",
    allergies: ["Penicillin", "Shellfish"],
    conditions: ["Hypertension", "Diabetes Type 2"],
    emergencyContacts: [
      { name: "John Johnson", relationship: "Spouse", phone: "+1-555-0124" },
      { name: "Mary Johnson", relationship: "Mother", phone: "+1-555-0125" }
    ],
    appointments: [
      { id: 1, doctor: "Dr. Smith", date: "2025-09-15", time: "10:00 AM", type: "Cardiology" },
      { id: 2, doctor: "Dr. Brown", date: "2025-09-20", time: "2:30 PM", type: "General" }
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ]
  };

  // Sample data
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", date: "2025-09-15", time: "10:00 AM", status: "confirmed" },
    { id: 2, doctor: "Dr. Brown", specialty: "General Medicine", date: "2025-09-20", time: "2:30 PM", status: "pending" }
  ]);

  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, type: "Lab Report", name: "Blood Test Results", date: "2025-09-01", category: "lab" },
    { id: 2, type: "Prescription", name: "Diabetes Medication", date: "2025-08-28", category: "prescription" },
    { id: 3, type: "X-Ray", name: "Chest X-Ray", date: "2025-08-15", category: "imaging" }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", price: 5.99, category: "Pain Relief", inStock: true },
    { id: 2, name: "Metformin", price: 12.50, category: "Diabetes", inStock: true, prescription: true },
    { id: 3, name: "Vitamin D3", price: 8.75, category: "Supplements", inStock: true }
  ]);

  // Authentication functions
  const handleLogin = (email, password) => {
    setUser(sampleUser);
    setCurrentView('dashboard');
    setNotifications([
      { id: 1, type: "appointment", message: "Upcoming appointment with Dr. Smith tomorrow", time: "2 hours ago" },
      { id: 2, type: "medication", message: "Time to take your Metformin", time: "30 minutes ago" }
    ]);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setNotifications([]);
  };

  // Emergency SOS function
  const handleEmergencySOS = () => {
    setEmergencyMode(true);
    alert("🚨 EMERGENCY ALERT SENT!\n\n✓ Location shared with emergency contacts\n✓ Medical information transmitted\n✓ Emergency services notified\n\nHelp is on the way!");
    setTimeout(() => setEmergencyMode(false), 3000);
  };

  // Login Component
  const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isRegister, setIsRegister] = useState(false);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">HealthCare+</h1>
            <p className="text-gray-600 mt-2">Your Digital Health Companion</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(formData.email, formData.password); }}>
            <div className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => handleLogin('demo@email.com', 'demo')}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Try Demo Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', icon: Activity, label: 'Dashboard' },
      { id: 'appointments', icon: Calendar, label: 'Appointments' },
      { id: 'medlocker', icon: FileText, label: 'MedLocker' },
      { id: 'pharmacy', icon: Pill, label: 'Pharmacy' },
      { id: 'emergency', icon: Ambulance, label: 'Emergency SOS' },
      { id: 'profile', icon: User, label: 'Profile' },
      { id: 'feedback', icon: MessageSquare, label: 'Feedback' }
    ];

    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthCare+</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${ currentView === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    );
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{currentView}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>

          <button onClick={() => setCurrentView('profile')} className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          </button>
        </div>
      </div>
    </header>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="p-6 space-y-6">
      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Next Appointment</p>
              <p className="text-2xl font-bold">Tomorrow</p>
              <p className="text-blue-100">Dr. Smith - 10:00 AM</p>
            </div>
            <Heart className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Medications Due</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-green-100">Metformin & Lisinopril</p>
            </div>
            <Pill className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Health Records</p>
              <p className="text-2xl font-bold">{medicalRecords.length}</p>
              <p className="text-purple-100">Documents stored</p>
            </div>
            <FileText className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Pharmacy Orders</p>
              <p className="text-2xl font-bold">{cartItems.length}</p>
              <p className="text-orange-100">Items in cart</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentView('appointments')}
            className="flex flex-col items-center p-4 rounded-lg border hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Book Appointment</span>
          </button>
          <button
            onClick={() => setCurrentView('medlocker')}
            className="flex flex-col items-center p-4 rounded-lg border hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <Upload className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium">Upload Report</span>
          </button>
          <button
            onClick={() => setCurrentView('pharmacy')}
            className="flex flex-col items-center p-4 rounded-lg border hover:bg-purple-50 hover:border-purple-300 transition-colors"
          >
            <Pill className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium">Order Medicine</span>
          </button>
          <button
            onClick={handleEmergencySOS}
            className="flex flex-col items-center p-4 rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
          >
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-sm font-medium">Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Appointments</h3>
          <div className="space-y-3">
            {appointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Health Reminders</h3>
          <div className="space-y-3">
            {user?.medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Add other components here
  const MedLocker = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">MedLocker - Digital Health Vault</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {medicalRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg p-6 shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{record.category}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{record.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{record.type}</p>
            <p className="text-xs text-gray-500 mb-4">{record.date}</p>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Pharmacy = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Online Pharmacy</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">{cartItems.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-lg p-4 shadow-lg border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
              {medicine.prescription && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Rx</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{medicine.category}</p>
            <p className="text-lg font-bold text-green-600 mb-3">${medicine.price}</p>
            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded ${medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {medicine.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <button
                disabled={!medicine.inStock}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EmergencyPage = () => (
    <div className="p-6 space-y-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency SOS</h2>
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={handleEmergencySOS}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${emergencyMode ? 'bg-red-700 animate-pulse' : 'bg-red-600 hover:bg-red-700'}`}
          >
            <Ambulance className="w-16 h-16 text-white" />
          </button>
        </div>
        <p className="text-center text-red-700 font-medium">
          Press the SOS button in case of emergency
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          {user?.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.relationship}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{contact.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Blood Group</p>
            <p className="font-medium text-gray-900">{user?.bloodGroup}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age</p>
            <p className="font-medium text-gray-900">{user?.age} years</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Allergies</p>
            <p className="font-medium text-gray-900">{user?.allergies.join(', ')}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Medical Conditions</p>
            <p className="font-medium text-gray-900">{user?.conditions.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (!user && currentView === 'login') {
    return <LoginForm />;
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <AppointmentsPage appointments={appointments} setAppointments={setAppointments} />;
      case 'medlocker':
        return <MedLocker />;
      case 'pharmacy':
        return <Pharmacy />;
      case 'emergency':
        return <EmergencyPage />;
      case 'profile':
        return <ProfilePage user={user} setUser={setUser} />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default HealthCareApp;