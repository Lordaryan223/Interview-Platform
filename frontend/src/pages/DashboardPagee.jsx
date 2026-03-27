import { useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { useActionData, useNavigate } from 'react-router'
import { useCreateSession, useMyRescentSession } from '../hooks/useSessions'
import { useActiveSessions } from '../hooks/useSessions'


function DashboardPage() {
    const navigate=useNavigate()
    const {user}=useUser()
    const [showCreateModel,setShowCreateModel]=useState(false)
    const [roomConfig,setRoomConfig]=useState({problem:"",difficulty:""})
    const createSessionMutation=useCreateSession()

     const {data:activeSessionsData,isLoading:loadingActiveSessions}=useActiveSessions()
     const{data:resentSessionData,isLoading:loadingRecentSessions}=useMyRescentSession()

     console.log(activeSessionsData)
     console.log(resentSessionData)

  return (
    <div>
      DashboardPage
    </div>
  )
}

export default DashboardPage
