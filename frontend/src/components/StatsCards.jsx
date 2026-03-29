import React from 'react'


function StatsCards({ activeSessionsCount, recentSessionCount }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

      {/* Active Sessions */}
      <div style={{
        borderRadius: "12px", padding: "1.5rem",
        background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ marginBottom: "12px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="13" cy="11" r="5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="23" cy="11" r="5" fill="rgba(255,255,255,0.6)"/>
            <path d="M2 28c0-5 5-8 11-8s11 3 11 8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            <path d="M24 20c4 0 8 2.5 8 7" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Active Sessions</p>
        <p style={{ fontSize: "36px", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1 }}>{activeSessionsCount}</p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", margin: "8px 0 0" }}>currently live</p>
      </div>

      {/* Recent Sessions */}
      <div style={{
        borderRadius: "12px", padding: "1.5rem",
        background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ marginBottom: "12px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 4 L21.5 13.5 H31.5 L23.5 19.5 L26.5 29 L18 23.5 L9.5 29 L12.5 19.5 L4.5 13.5 H14.5 Z" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M7 13.5 C7 13.5 4 13.5 4 9.5 C4 6 7 5 9 6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M29 13.5 C29 13.5 32 13.5 32 9.5 C32 6 29 5 27 6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <line x1="14" y1="32" x2="22" y2="32" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18" y1="29" x2="18" y2="32" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Recent Sessions</p>
        <p style={{ fontSize: "36px", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1 }}>{recentSessionCount}</p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", margin: "8px 0 0" }}>last 7 days</p>
      </div>

    </div>
  );
}

export default StatsCards
