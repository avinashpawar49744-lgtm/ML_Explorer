import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningTypes from './pages/LearningTypes';
import CandidateElimination from './pages/CandidateElimination';
import SupervisedML from './pages/SupervisedML';
import Regression from './pages/Regression';
import KNN from './pages/KNN';
import VCDimension from './pages/VCDimension';
import RBFNetwork from './pages/RBFNetwork';
import Perceptron from './pages/Perceptron';
import MLP from './pages/MLP';
import MiniApplication from './pages/MiniApplication';
import LaboratoryTeam from './pages/LaboratoryTeam';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import ExperimentHistory from './pages/ExperimentHistory';
import Submissions from './pages/Submissions';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminManagement from './pages/AdminManagement';
import AdminPracticalEditor from './pages/AdminPracticalEditor';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const THEME_KEY = 'ml-explorer-theme';

function AppShell() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/learning-types" element={<LearningTypes />} />
        <Route path="/candidate-elimination" element={<CandidateElimination />} />
        <Route path="/supervised-ml" element={<SupervisedML />} />
        <Route path="/regression" element={<Regression />} />
        <Route path="/knn" element={<KNN />} />
        <Route path="/vc-dimension" element={<VCDimension />} />
        <Route path="/rbf-network" element={<RBFNetwork />} />
        <Route path="/perceptron" element={<Perceptron />} />
        <Route path="/mlp" element={<MLP />} />
        <Route path="/mini-application" element={<MiniApplication />} />
        <Route path="/laboratory-team" element={<LaboratoryTeam />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/experiment-history" element={<ExperimentHistory />} />
          <Route path="/submissions" element={<Submissions />} />
        </Route>
        <Route element={<ProtectedRoute roles={['faculty', 'admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/practicals" element={<AdminManagement section="practicals" />} />
          <Route path="/admin/practicals/:id" element={<AdminPracticalEditor />} />
          <Route path="/admin/students" element={<AdminManagement section="students" />} />
          <Route path="/admin/faculty" element={<AdminManagement section="faculty" />} />
          <Route path="/admin/team" element={<AdminManagement section="team" />} />
          <Route path="/admin/datasets" element={<AdminManagement section="datasets" />} />
          <Route path="/admin/experiments" element={<AdminManagement section="experiments" />} />
          <Route path="/admin/submissions" element={<AdminManagement section="submissions" />} />
          <Route path="/admin/about" element={<AdminManagement section="about" />} />
          <Route path="/admin/settings" element={<AdminManagement section="settings" />} />
          <Route path="/admin/activity" element={<AdminManagement section="activity" />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
