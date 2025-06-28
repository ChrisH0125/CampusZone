import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
// Import your other pages here
// import Dashboard from './pages/Dashboard'; 
// import Compare from './pages/Compare';
// import Trends from './pages/Trends';
// import About from './pages/About';

function App() {
  return (
    <Router>
      {/* The Navigation component is placed here so it appears on every page */}
      <Navigation />
      
      {/* The Routes component will switch between your pages */}
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/compare" element={<Compare />} /> */}
        {/* <Route path="/trends" element={<Trends />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
