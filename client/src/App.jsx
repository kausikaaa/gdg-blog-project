import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Blog/HomePage';
import SinglePost from './pages/Blog/SinglePost';
import CreatePost from './pages/Blog/CreatePost';
import EditPost from './pages/Blog/EditPost';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
