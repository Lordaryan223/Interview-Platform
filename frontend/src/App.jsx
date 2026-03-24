
import { SignInButton,SignedIn,SignedOut, SignOutButton, UserButton,SignIn, useUser} from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import HomePage from './pages/homepage';
import ProblemPage from './pages/ProblemPage';
import {Toaster} from "react-hot-toast"
import ProblemsPage from './pages/ProblemsPage';

const API = import.meta.env.VITE_API_URL;

//axios.get(`${API}/api/products`)


function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null; // or a loading spinner
  return (
    <>
   
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />


        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />}
        />
      </Routes>
      
  
    </>
  )
}
 export default App;
