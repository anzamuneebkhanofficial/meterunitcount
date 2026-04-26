'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0F172A',
      color: '#F1F5F9',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#22D3EE' }}>
        404
      </h1>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: '24px', color: '#94A3B8' }}>
        The electricity meter checker page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        style={{
          background: '#22D3EE',
          color: '#000',
          textDecoration: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        Go Home
      </Link>
    </div>
  );
}
