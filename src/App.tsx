import { useState, useEffect } from 'react'
import './App.css'
import { VincentSDK } from '@lit-protocol/vincent-sdk'

function App() {
  const [jwt, setJwt] = useState<string | null>(null)
  const [jwtVerified, setJwtVerified] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Extract the JWT from URL and verify it
    const checkJwt = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const jwtParam = urlParams.get('jwt');
        
        if (jwtParam) {
          console.log("JWT found in URL:", jwtParam);
          setJwt(jwtParam);
          
          try {
            const vincent = new VincentSDK();
            await vincent.storeJWT(jwtParam);
            const verifyJwt = await vincent.verifyJWT(window.location.origin + '/');
            if (!verifyJwt) {
              throw new Error('Failed to verify JWT');
            }
            setJwtVerified(true);
            console.log("JWT verified successfully");
          } catch (verifyError) {
            console.error("JWT verification error:", verifyError);
            setError(verifyError instanceof Error ? verifyError.message : 'Unknown verification error');
            setJwtVerified(false);
          }
        } else {
          console.log("No JWT found in URL");
        }
      } catch (err) {
        console.error("Error processing JWT:", err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    };

    checkJwt();
  }, []);

  const handleRedirect = () => {
    window.location.href = "https://vincent-auth.vercel.app/";
  }

  return (
    <div className="app-container">
      <header>
        <h1>Vincent JWT Demo</h1>
      </header>
      
      <main>
        {jwt ? (
          <div className="card" style={{ 
            backgroundColor: jwtVerified ? '#d4edda' : '#fff3cd', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2>JWT Status</h2>
            <div style={{ 
              marginTop: '10px', 
              fontFamily: 'monospace', 
              fontSize: '14px', 
              overflowWrap: 'break-word',
              padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '4px'
            }}>
              {jwt.substring(0, 30)}...
            </div>
            
            {jwtVerified === true && (
              <div style={{ 
                marginTop: '15px', 
                color: 'green',
                fontWeight: 'bold'
              }}>
                ✅ JWT verification successful!
              </div>
            )}
            
            {jwtVerified === false && (
              <div style={{ 
                marginTop: '15px', 
                color: 'red',
                fontWeight: 'bold'
              }}>
                ❌ JWT verification failed: {error}
              </div>
            )}
            
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
              Full JWT is available in the browser console.
            </div>
          </div>
        ) : (
          <div className="card" style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p>No JWT token found in the URL.</p>
            <p>Click the button below to get redirected to the consent page.</p>
          </div>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleRedirect}
            style={{ 
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Redirect to Consent Page
          </button>
        </div>
      </main>
      
      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
        Vincent JWT Demo - A simple application to demonstrate JWT verification
      </footer>
    </div>
  )
}

export default App
