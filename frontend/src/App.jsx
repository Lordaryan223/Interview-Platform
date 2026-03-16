
import { SignInButton,SignedIn,SignedOut, SignOutButton, UserButton,SignIn, useUser} from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import HomePage from './pages/homepage';
import ProblemPage from './pages/ProblemPage';
import {Toaster} from "react-hot-toast"

const API = import.meta.env.VITE_API_URL;

//axios.get(`${API}/api/products`)


function App() {
  const {isSignedIn}=useUser()
  return (
    <>
    <Routes>
     
      <Route path="/" element={<HomePage/>}/>
     
      <Route path='/problems' element={isSignedIn? <ProblemPage/>:<Navigate to={"/"}/>}/>

    </Routes>
    <Toaster toastOptions={{duration:2000}} />
    </>
  )
}
 export default App;
