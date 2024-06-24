import React, { useState } from 'react';

function LogIn() {
  // סטייט לשמירת הערכים של שם המשתמש והסיסמה
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // פונקציות לטיפול בשינויים בשדות הקלט
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // פונקציה להתחברות שמופעלת בעת הגשת הטופס
  const handleLogin = (e) => {
    e.preventDefault(); // מונע את המעבר המיידי של הטופס

    // כאן תוכל להשתמש ב-username וב-password כדי לבצע את הפעולה הרלוונטית, כמו לשלוח אותם לשרת לאימות
    console.log('Username:', username);
    console.log('Password:', password);

    // ניקוי השדות לאחר הגשת הטופס (אופציונלי)
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
