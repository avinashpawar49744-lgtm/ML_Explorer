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
import Layout from './components/Layout';

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
