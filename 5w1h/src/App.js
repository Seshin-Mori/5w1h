import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import WordRegistration from "./components/WordRegistration/WordRegistration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar /> {/* ナビゲーションバーのコンポーネント */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<WordRegistration />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
