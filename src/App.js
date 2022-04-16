import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import FilamentDetails from './pages/FilamentDetails';
import FilamentList from './pages/FilamentList';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './pages/ProjectList';
import './App.css';

function App() {
  return (
    <Footer>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/filaments" element={<FilamentList />} />
        <Route path="/filaments/:id" element={<FilamentDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Footer>
  );
}

export default App;
