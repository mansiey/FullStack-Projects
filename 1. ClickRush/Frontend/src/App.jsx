import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login';
import Signup from './pages/signup';
import Games from './pages/Games';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>ClickRush</h1>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/games' element={
          <ProtectedRoute>
             <Games />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={<h1>Profile</h1>} />
        <Route path='/leaderboard' element={<h1>Leaderboard</h1>} />

      </Routes>
    </BrowserRouter>
  )
}


export default App;