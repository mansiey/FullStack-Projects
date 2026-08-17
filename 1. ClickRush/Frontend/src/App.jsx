import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Games from './pages/Games';
import Leaderboards from './pages/Leaderboards';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/games' element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/leaderboard' element={
            <ProtectedRoute>
              <Leaderboards />
            </ProtectedRoute>
          } />
      </Routes>

      
    </BrowserRouter>
  )
}


export default App;