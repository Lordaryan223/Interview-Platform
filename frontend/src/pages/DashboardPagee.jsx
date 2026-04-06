import { useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { useActionData, useNavigate } from 'react-router'
import { useCreateSession, useMyRecentSession } from '../hooks/useSessions'
import { useActiveSessions } from '../hooks/useSessions'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import RecentSessions from '../components/RecentSessions'
import ActiveSessions from '../components/ActiveSessions'
import CreateSessionsModal from '../components/CreateSessionsModal'
import StatsCards from '../components/StatsCards'


function DashboardPage() {
    const navigate=useNavigate()
    const {user}=useUser()
    const [showCreateModal,setShowCreateModal]=useState(false)
    const [roomConfig,setRoomConfig]=useState({problem:"",difficulty:""})
    const createSessionMutation=useCreateSession()

     const {data:activeSessionsData,isLoading:loadingActiveSessions}=useActiveSessions()
     const{data:recentSessionData,isLoading:loadingRecentSessions}=useMyRecentSession()

      const handleCreateRoom = () => {
  createSessionMutation.mutate(
    {
      problem: roomConfig.problem,
      difficulty: roomConfig.difficulty.toLowerCase(),
    },
    {
      onSuccess: (data) => {
        console.log("🔥 RESPONSE:", data);

        const sessionId =
          data?._id ||
          data?.session?._id ||
          data?.data?._id;

        if (!sessionId) {
          console.error("❌ Session ID missing!", data);
          return;
        }

        navigate(`/session/${sessionId}`);
      },
    }
  );
};



     const activeSessions= activeSessionsData?.session || []
     const recentSessions= recentSessionData?.session || []

     const isUserInSession=(session)=>{
      if(!user.id) return false
   return session.host?.clerkId === user.id || session.participants?.clerkId===user.id
     }

    return (
      <>
    <div className='min-h-screen bg-base-300'>
      <Navbar/>
      <WelcomeSection onCreateSession={()=>setShowCreateModal(true)} />
         {/* Grid layout */}
         <div className="container mx-auto px-6 pb-16">

  {/* Stats row */}
  <StatsCards
    activeSessionsCount={activeSessions.length}
    recentSessionCount={recentSessions.length}
  />

  {/* Main two-column layout */}
  <div className="flex gap-6 mt-6">

    {/* Left: Recent Sessions */}
    <div className="flex-1 min-w-0">
      <RecentSessions
      sessions={recentSessions}
      isLoading={loadingRecentSessions}
       />
    </div>

    {/* Right: Active Sessions — fixed width, sticky */}
    <div className="w-100 shrink-0">
      <div className="sticky top-6">
        <ActiveSessions
          sessions={activeSessions}
          isLoading={loadingActiveSessions}
          isUserInSession={isUserInSession}
        />
      </div>
    </div>

  </div>

</div>
    </div>
    <CreateSessionsModal

    isOpen={showCreateModal}
    onClose={()=>setShowCreateModal(false)}
    roomConfig={roomConfig}
    setRoomConfig={setRoomConfig}
    onCreateRoom={handleCreateRoom}
    isCreating={createSessionMutation.isPending}

    
    />
    </>
  )
 
}

export default DashboardPage
