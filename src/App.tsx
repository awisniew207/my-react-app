import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { VincentSDK } from '@lit-protocol/vincent-sdk'

function App() {
  const [count, setCount] = useState(0)
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      {jwt && (
        <div className="card" style={{ marginTop: '20px', backgroundColor: jwtVerified ? '#d4edda' : '#fff3cd', padding: '10px', borderRadius: '4px' }}>
          <div>JWT found in URL!</div>
          <div style={{ marginTop: '10px', fontFamily: 'monospace', fontSize: '12px', overflowWrap: 'break-word' }}>
            {jwt.substring(0, 20)}...
          </div>
          {jwtVerified === true && (
            <div style={{ marginTop: '5px', color: 'green' }}>
              JWT verification successful!
            </div>
          )}
          {jwtVerified === false && (
            <div style={{ marginTop: '5px', color: 'red' }}>
              JWT verification failed: {error}
            </div>
          )}
          <div style={{ marginTop: '5px' }}>
            (Check console for full JWT)
          </div>
        </div>
      )}
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card" style={{ marginTop: '20px' }}>
        <button 
          onClick={handleRedirect}
          style={{ 
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Redirect to Consent Page
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
