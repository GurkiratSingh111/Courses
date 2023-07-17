import './App.css';
import Appbar from './Appbar';
import Signup from './Signup.jsx'
import SignIn from './Signin.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>


  );
}

export default App;
