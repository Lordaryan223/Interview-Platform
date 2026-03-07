
import { SignInButton,SignedIn,SignedOut, SignOutButton, UserButton,SignIn} from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const API = import.meta.env.VITE_API_URL;

//axios.get(`${API}/api/products`)


function Home() {
  return (
    <>
      <p>welcome to the app</p>

      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
        <UserButton />
      </SignedIn>
    </>
  )
}
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home /> } />
    <Route path="/sign-in/*"element={<SignIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
