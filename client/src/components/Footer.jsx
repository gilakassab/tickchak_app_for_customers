import React from 'react'
import '../css/Footer.css'; // הוסף את קובץ ה-CSS החדש


function Footer() {
  return (
    <div>
        <footer className="footer">
        All rights reserved © {new Date().getFullYear()}
      </footer> 
    </div>
  )
}

export default Footer