import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>ClickRush</h1>} />
        <Route path='/signup' element={<h1>Signup</h1>} />
        <Route path='/login' element={ <Login />} />
        <Route path='/games' element={<h1>Games</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        <Route path='/leaderboard' element={<h1>Leaderboard</h1>} />

      </Routes>
    </BrowserRouter>
  )
}


export default App;