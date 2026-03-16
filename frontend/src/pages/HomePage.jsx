import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

function  HomePage(){
   
  return (
    <div>
     <SignedOut>
        <SignInButton mode="modal">
            <button className='btn btn-active'  
            onClick={()=>toast.success("This is successfull toast")}>
            Log In</button>
        </SignInButton>
     </SignedOut>

<SignedIn>
    <button className='btn btn-circle'> 
  < SignOutButton />
  </button>
</SignedIn>
 
<UserButton/>

    </div>
  )
}

export default HomePage
