import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="footer">
        כל הזכויות שמורות © {new Date().getFullYear()}
      </footer> 
    </div>
  )
}

export default Footer