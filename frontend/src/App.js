import { Routes, Route, Link } from 'react-router-dom'
// import Dashboard from './Dashboard'; './Dashboard'
import Feed from './Feed';
import Login from './Login';
import Register from './Register';
import Room from './Room';
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/room/:id" element={<Room />} />
        
      </Routes>
    </div>
  );
}

export default App;
