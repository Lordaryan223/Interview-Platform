

function RecentSessions({ sessions, isLoading }) {
  if (isLoading) return <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Loading...</p>;
  if (!sessions?.length) return <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>No recent sessions.</p>;

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

  const formatDuration = (createdAt, updatedAt) => {
    const mins = Math.round((new Date(updatedAt) - new Date(createdAt)) / 60000);
    return `${mins} min`;
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    
    
    <div style={{
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
        padding: "0 4px 10px",
        borderBottom: "0.5px solid var(--color-border-tertiary)"
      }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>
          Recent Sessions
        </span>
        
        <span style={{
          fontSize: "11px", padding: "2px 8px", borderRadius: "999px",
          background: "var(--color-background-primary)",
          color: "var(--color-text-secondary)",
          border: "0.5px solid var(--color-border-tertiary)"
        }}>
          Last 7 days
        </span>
      </div>

      {/* Rows */}
      {sessions.map((session, i) => {
        const diff = difficultyStyles[session.difficulty] || difficultyStyles.medium;
        const gradient = rowGradients[i % rowGradients.length];

        return (
          <div key={session._id} style={{
            borderRadius: "10px",
            background: gradient,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            {/* Left: problem + difficulty */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>
                {session.problem}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 500, padding: "2px 9px", borderRadius: "999px", width: "fit-content", ...diff }}>
                {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
              </span>
            </div>

            {/* Right: duration + date */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Duration</span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>
                  {formatDuration(session.createdAt, session.updatedAt)}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>
                  {formatDate(session.createdAt)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentSessions
