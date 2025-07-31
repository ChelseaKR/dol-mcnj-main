import React from "react";
import { GetServerSideProps } from "next";

export default function Home() {  
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #ccc", marginBottom: "2rem", paddingBottom: "1rem" }}>
        <h1 style={{ color: "#12263A", margin: 0 }}>My Career NJ</h1>
        <p style={{ margin: "0.5rem 0 0 0", color: "#666" }}>Next.js Migration in Progress</p>
      </header>
      
      <main style={{ textAlign: "center" }}>
        <h2>Migration Status</h2>
        <p>The basic Next.js setup is complete. Individual pages and features are being restored incrementally.</p>
        
        <div style={{ margin: "2rem auto", maxWidth: "600px", textAlign: "left", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#12263A" }}>Completed:</h3>
          <ul>
            <li>✅ Next.js 14 with React 18 installed</li>
            <li>✅ SCSS and Material-UI v4 support</li>
            <li>✅ Build and development server working</li>
            <li>✅ Environment variables converted (REACT_APP_* → NEXT_PUBLIC_*)</li>
            <li>✅ Backend API proxy configuration via Next.js rewrites</li>
            <li>✅ Basic project structure (pages/, components/, lib/, public/)</li>
          </ul>
          
          <h3 style={{ margin: "1.5rem 0 1rem 0", color: "#12263A" }}>In Progress:</h3>
          <ul>
            <li>🔄 Fixing import paths for Next.js structure</li>
            <li>🔄 Restoring individual page routes</li>
            <li>🔄 Component library integration</li>
            <li>📋 Test infrastructure updates</li>
          </ul>
        </div>
        
        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#e7f3ff", borderRadius: "8px" }}>
          <p><strong>Original Features Being Preserved:</strong></p>
          <p>All existing functionality including training search, occupation pages, career pathways, contact forms, analytics, and i18n will be restored.</p>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};