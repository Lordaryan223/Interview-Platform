import React from 'react'

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  if (isLoading) return <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Loading...</p>;
  if (!sessions?.length) return <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>No active sessions.</p>;

  const difficultyStyles = {
    easy:   { background: "#EAF3DE", color: "#27500A" },
    medium: { background: "#FAEEDA", color: "#633806" },
    hard:   { background: "#FAECE7", color: "#712B13" },
  };

  const rowGradients = [
    "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
    "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
    "linear-gradient(135deg, #854F0B 0%, #EF9F27 100%)",
    "linear-gradient(135deg, #533AB7 0%, #7F77DD 100%)",
    "linear-gradient(135deg, #993C1D 0%, #D85A30 100%)",
  ];

  const getInitials = (username) =>
    username ? username.slice(0, 2).toUpperCase() : "?";

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{
        width: "380px",
        background: "var(--color-background-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 4px 8px",
          borderBottom: "0.5px solid var(--color-border-tertiary)"
        }}>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)" }}>
            Live Sessions
          </span>
          <span style={{
            fontSize: "11px", padding: "2px 8px", borderRadius: "999px",
            background: "var(--color-background-info)", color: "var(--color-text-info)"
          }}>
            {sessions.length} live
          </span>
        </div>

        {/* Session rows */}
        {sessions.map((session, i) => {
          const participantCount = (session.participants?.length ?? 0) + 1;
          const isFull = participantCount >= 2;
          const diff = difficultyStyles[session.difficulty] || difficultyStyles.medium;
          const gradient = rowGradients[i % rowGradients.length];
          const participant = session.participants?.[0];

          return (
            <div key={session._id} style={{ borderRadius: "10px", overflow: "hidden", background: gradient }}>
              <div style={{ padding: "12px 14px" }}>

                {/* Top: name + count */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#fff", margin: "0 0 4px" }}>
                      {session.problem}
                    </p>
                    <span style={{ fontSize: "10px", fontWeight: 500, padding: "2px 8px", borderRadius: "999px", ...diff }}>
                      {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                    </span>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    background: "rgba(255,255,255,0.15)", padding: "4px 8px", borderRadius: "999px"
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <circle cx="9" cy="8" r="4" fill="rgba(255,255,255,0.9)" />
                      <circle cx="17" cy="8" r="4" fill="rgba(255,255,255,0.55)" />
                      <path d="M1 20c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M17 13.5c3 0 6 1.8 6 5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#fff" }}>{participantCount} / 2</span>
                  </div>
                </div>

                {/* Bottom: usernames + join */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "10px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {/* Host */}
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", fontWeight: 500, color: "#fff"
                    }}>
                      {getInitials(session.host?.username)}
                    </div>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                      {session.host?.username || "host"}
                    </span>

                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>·</span>

                    {/* Participant or waiting slot */}
                    {participant ? (
                      <>
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.25)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", fontWeight: 500, color: "#fff"
                        }}>
                          {getInitials(participant.username)}
                        </div>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                          {participant.username}
                        </span>
                      </>
                    ) : (
                      <>
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.12)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", color: "rgba(255,255,255,0.4)",
                          border: "1px dashed rgba(255,255,255,0.3)"
                        }}>+</div>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>waiting...</span>
                      </>
                    )}
                  </div>

                  <button
                    disabled={isFull || isUserInSession}
                    style={{
                      fontSize: "11px", padding: "4px 12px", borderRadius: "6px",
                      background: isFull || isUserInSession ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                      color: isFull || isUserInSession ? "rgba(255,255,255,0.4)" : "#fff",
                      border: "1px solid rgba(255,255,255,0.35)",
                      cursor: isFull || isUserInSession ? "not-allowed" : "pointer"
                    }}
                  >
                    {isFull ? "Full" : "Join"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActiveSessions
