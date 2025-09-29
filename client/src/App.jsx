import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Blog/HomePage';
import SinglePost from './pages/Blog/SinglePost';
import CreatePost from './pages/Blog/CreatePost';
import EditPost from './pages/Blog/EditPost';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
