import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas
} from "./components";
import ProjectDetails from "./components/ProjectDetails";
import BlogDetails from "./components/Blogs/BlogDetails";
import BlogList from "./components/Blogs/BlogList";
import AddBlog from "./components/Blogs/AddBlog";
import EditBlog from "./components/Blogs/EditBlog";
import Chatbot from "./components/Chatbot/Chatbot";

const App = () => {
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <MainContent />
        <Chatbot/>

      </div>
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only on the home route */}
      {location.pathname === "/" && <Navbar />}
      
      {/* Render Hero only on the home route */}
      {location.pathname === "/" && (
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
        </div>
      )}
      
      <Routes>
        <Route path="/" element={
          <>
            <About />
            <Tech />
            <Works />
            <Experience />
            <Feedbacks />
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
          </>
        } />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        {/* Add a dynamic route for individual project details */}
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}

export default App;
