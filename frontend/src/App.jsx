
import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import DashboardPage from './pages/DashboardPagee.jsx';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage';
import ProblemsPage from './pages/ProblemsPage';
import SessionPage from './pages/SessionPage.jsx';

const API = import.meta.env.VITE_API_URL;

//axios.get(`${API}/api/products`)


function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null; // or a loading spinner
  return (
    <>
   <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> :   <Navigate to="/" />}
        />


        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />}
        />

<Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />}
        />

<Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage/> : <Navigate to="/" />}
        />
        


      </Routes>

      
      
  
    </>
  )
}

 export default App;
