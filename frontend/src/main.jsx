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
  useAxiosAuth()
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkPubKey}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
        >
          <AppWrapper />  {/* ✅ inside ClerkProvider, replaces <App /> */}
        </ClerkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)