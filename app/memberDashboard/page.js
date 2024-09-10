'use client'
import React from 'react'



export default function Home() {
    const teamMembers = [
      { id: 1, name: 'Full Name' },
      { id: 2, name: 'Full Name' },
      { id: 3, name: 'Full Name' },
      { id: 4, name: 'Full Name' },
    ];
  
    // Inline styles
    const containerStyle = {
      backgroundColor: '#0d0d2b',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    };
  
    const titleStyle = {
      fontSize: '3rem',
      marginBottom: '40px',
    };
  
    const teamGridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      justifyContent: 'center',
    };
  
    const cardStyle = {
      backgroundColor: '#1a1a3f',
      borderRadius: '15px',
      padding: '20px',
      textAlign: 'center',
      width: '300px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    };
  
    const imageStyle = {
      width: '100px',
      height: '100px',
      marginBottom: '20px',
    };
  
    const buttonStyle = {
      backgroundColor: '#2979ff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    };
  
    const buttonHoverStyle = {
      backgroundColor: '#1e5db8',
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Your Team</h1>
        <div style={teamGridStyle}>
          {teamMembers.map((member) => (
            <div key={member.id} style={cardStyle}>
              <img
                src="/team-placeholder.png" // Replace with actual image paths
                alt="Team Member"
                style={imageStyle}
              />
              <h2>{member.name}</h2>
              <button
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Leave
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  