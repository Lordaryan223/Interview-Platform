import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router'
import {QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import { useAxiosAuth } from "./hooks/useAxiosAuth";
import { use } from 'react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY




if(!clerkPubKey){
  console.log("clerk public key is missing")
}
const queryClient=new QueryClient()

function AppWrapper(){
  useAxiosAuth() // Initialize auth state on app load
  return <App />
}

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client ={queryClient}>
    <ClerkProvider publishableKey={clerkPubKey}
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    navigate={(to) => window.location.href = to}
    
  >
      <App />
    </ClerkProvider>
    </QueryClientProvider>
  </BrowserRouter>
  </StrictMode>
)

console.log("API URL:", import.meta.env.VITE_API_URL);