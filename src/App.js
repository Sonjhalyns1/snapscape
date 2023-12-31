import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import CreatePosting from "./pages/CreatePosting";
import EditPosting from "./pages/EditPosting";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/explore" element = {<Explore />} />
          <Route path = "/sign-in" element = {<Signin />} />
          <Route path ="/forgot-password"  element = {<ForgotPassword />} />
          <Route path ="/category/:categoryName/:listingId"  element = {<Listing />} />
          <Route path ="/sign-up"  element = {<SignUp />} />
          
          <Route path = "/profile" element = {<PrivateRoute />}>
            <Route path = "/profile" element = {<Profile />}/>
          </Route>
          <Route path = "/category/:categoryName" element = {<Category/>}/>
          <Route path = "/create-posting" element = {<PrivateRoute />}>
            <Route path = "/create-posting" element = {<CreatePosting />}/>
          </Route>
          <Route path="edit-posting" element={<PrivateRoute />}>
            <Route path="/edit-posting/:listingId" element = {<EditPosting/>} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      
    </>
    
  );
}

export default App;
