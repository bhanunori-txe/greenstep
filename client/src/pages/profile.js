import React from 'react';

export default function Profile() {
  // For now, just show static or token-based info
  const token = localStorage.getItem('token');

  return (
    <div>
      <h2>User Profile</h2>
      <p>Token: {token ? token : 'Not logged in'}</p>
      {/* You can expand to fetch and show user details from backend */}
    </div>
  );
}
