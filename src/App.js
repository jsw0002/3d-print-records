import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import FilamentDetails from './components/FilamentDetails';
import FilamentList from './components/FilamentList';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import PrintDetails from './components/PrintDetails';
import PrintList from './components/PrintList';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';
import './App.css';

function App() {
  return (
    <Footer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/prints" element={<PrintList />} />
        <Route path="/prints/:id" element={<PrintDetails />} />
        <Route path="/filaments" element={<FilamentList />} />
        <Route path="/filaments/:id" element={<FilamentDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Footer>
  );
}

export default App;
