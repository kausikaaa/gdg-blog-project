import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Blog/HomePage';
import SinglePost from './pages/Blog/SinglePost';
import CreatePost from './pages/Blog/CreatePost';
import EditPost from './pages/Blog/EditPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
