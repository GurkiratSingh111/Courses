import './App.css';
import Appbar from './Appbar';
import Signup from './Signup.jsx'
import SignIn from './Signin.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourse from './AddCourse';
import Courses from './Courses';
import Course from './Course';
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <Router>
        <RecoilRoot>
          <Appbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
          </Routes>
        </RecoilRoot>
      </Router>
    </div>


  );
}

export default App;
