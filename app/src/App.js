import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Success from './pages/Success';

function App() {
  // Provide Routes for the two different pages 
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/" element={<Login />}/>
          <Route path = "/success" element={<Success />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
