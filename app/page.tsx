"use client"

import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Redirect to the static index.html
    window.location.href = "/static/index.html"
  }, [])

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      fontFamily: "system-ui, sans-serif"
    }}>
      <p>Loading BW-Shell Admin Portal...</p>
    </div>
  )
}
