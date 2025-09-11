const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store (for demonstration purposes)
let users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    password: "demo", // In a real app, hash passwords!
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
      { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", date: "2025-09-15", time: "10:00 AM", status: "confirmed" },
      { id: 2, doctor: "Dr. Brown", specialty: "General Medicine", date: "2025-09-20", time: "2:30 PM", status: "pending" }
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ],
    profileImage: null,
  }
];

let medicalRecords = [
  { id: 1, type: "Lab Report", name: "Blood Test Results", date: "2025-09-01", category: "lab" },
  { id: 2, type: "Prescription", name: "Diabetes Medication", date: "2025-08-28", category: "prescription" },
  { id: 3, type: "X-Ray", name: "Chest X-Ray", date: "2025-08-15", category: "imaging" }
];

let medicines = [
  { id: 1, name: "Paracetamol", price: 5.99, category: "Pain Relief", inStock: true },
  { id: 2, name: "Metformin", price: 12.50, category: "Diabetes", inStock: true, prescription: true },
  { id: 3, name: "Vitamin D3", price: 8.75, category: "Supplements", inStock: true }
];

// Routes

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // In a real app, generate a JWT token here
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, dob } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In a real app, hash passwords!
    phone,
    age: null, // Calculate from dob if needed
    bloodGroup: null,
    allergies: [],
    conditions: [],
    emergencyContacts: [],
    appointments: [],
    medications: [],
    profileImage: null,
  };
  users.push(newUser);
  res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// Profile Routes
app.get('/api/profile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  if (user) {
    // Exclude password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.put('/api/profile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const updatedData = req.body;
  users = users.map(user =>
    user.id === userId ? { ...user, ...updatedData } : user
  );
  const updatedUser = users.find(u => u.id === userId);
  if (updatedUser) {
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'Profile updated successfully', user: userWithoutPassword });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Appointments Routes
app.get('/api/appointments/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user.appointments);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/appointments/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const newAppointment = req.body;
  users = users.map(user =>
    user.id === userId
      ? { ...user, appointments: [...user.appointments, { ...newAppointment, id: user.appointments.length + 1 }] }
      : user
  );
  res.status(201).json({ message: 'Appointment added successfully' });
});

app.put('/api/appointments/:userId/:appointmentId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const appointmentId = parseInt(req.params.appointmentId);
  const updatedAppointmentData = req.body;

  users = users.map(user =>
    user.id === userId
      ? { ...user, appointments: user.appointments.map(app =>
          app.id === appointmentId ? { ...app, ...updatedAppointmentData } : app
        ) }
      : user
  );
  res.json({ message: 'Appointment updated successfully' });
});

app.delete('/api/appointments/:userId/:appointmentId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const appointmentId = parseInt(req.params.appointmentId);

  users = users.map(user =>
    user.id === userId
      ? { ...user, appointments: user.appointments.filter(app => app.id !== appointmentId) }
      : user
  );
  res.json({ message: 'Appointment deleted successfully' });
});

// Medical Records Routes
app.get('/api/medical-records', (req, res) => {
  res.json(medicalRecords);
});

// Pharmacy Routes
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

// Feedback Routes
app.post('/api/feedback', (req, res) => {
  const feedback = req.body;
  console.log('Received feedback:', feedback);
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});