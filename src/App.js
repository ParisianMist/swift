// import './App.scss';

//pages
import Login from "./pages/Login/Login";
import Profile from './pages/Profile/Profile';

//tools
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  //check for session token
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>
        {
          isUserLoggedIn
            ? (<Route path='/' element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />)
            : (<Route path='/profile/:id' element={<Profile setIsUserLoggedIn={setIsUserLoggedIn} />} />)
        }
        {/* <Route path='/*' element={<NotFoundPage/>}/> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
