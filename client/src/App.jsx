import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Blog/HomePage';
import SinglePost from './pages/Blog/SinglePost';
import CreatePost from './pages/Blog/CreatePost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
