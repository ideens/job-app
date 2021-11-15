import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import SinglePost from './components/SinglePost'
import PostAdd from './pages/PostAdd'
import PostEdit from './components/PostEdit'

//import Home component once created

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="landing/:id" element={<SinglePost />} />
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="add" element={<PostAdd />} />
        <Route path="edit/:id" element={<PostEdit />} />
      </Routes>
    </div>
  )
}

export default App
