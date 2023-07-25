import './App.css';
import Appbar from './Appbar';
import Signup from './Signup.jsx'
import SignIn from './Signin.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourse from './AddCourse';
import Courses from './Courses';
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Router>
    </div>


  );
}

export default App;
