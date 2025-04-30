import React, { useState } from 'react';
import { auth } from './firebaseConfig'; // Assuming firebaseConfig.js is where you have your Firebase initialization code

function SignOutButton() {
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        console.log('User signed out');
      })
      .catch((error) => {
        // An error happened.
        setError(error.message);
      });
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignOutButton;
