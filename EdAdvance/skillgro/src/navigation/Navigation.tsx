import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/Home';


import Lesson from '../pages/Lesson';
import ModuleList from '../components/Module/index';
import About from '../pages/About';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import InstructorQuiz from '../pages/InstructorQuiz';
import StudentDashboard from '../pages/StudentDashboard';
import NotFound from '../pages/NotFound';
import CoursList from '../components/cours/index';
const AppNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cours" element={<CoursList />} />
        <Route path="/module" element={<ModuleList />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/instructor-quiz" element={<InstructorQuiz />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* <Route path="/blog-details/:id" element={<DynamicBlogDeatils />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppNavigation;
