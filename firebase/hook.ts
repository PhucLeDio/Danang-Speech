import {
  browserLocalPersistence,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
  signInWithPopup,
  signOut,
  User
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"

import { app, auth } from "~firebase"

setPersistence(auth, browserLocalPersistence)

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await signOut(auth)
      setUser(null)
    }
    setIsLoading(false)
  }

  const onLoginWithGoogle = () => {
    setIsLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error("Could not log in with Google. ", e)
        }
      }
    })
  }

  const onLoginWithMicrosoft = () => {
    setIsLoading(true);
  
    const clientId = '507f6343-9905-4b96-b87d-4322ed124553';
    const redirectUri = chrome.identity.getRedirectURL('microsoft-callback');
    const tenant = 'ae70d012-5a20-42f2-8767-56dea89e6bce';
    const scopes = encodeURIComponent('api://507f6343-9905-4b96-b87d-4322ed124553/Employees.Read.All');
  
    const authUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=id_token&redirect_uri=${redirectUri}&scope=${scopes}&response_mode=fragment&nonce=12345`;
  
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true
      },
      (responseUrl) => {
        if (chrome.runtime.lastError || !responseUrl) {
          console.error(chrome.runtime.lastError?.message || 'No response URL');
          setIsLoading(false);
          return;
        }
  
        // Extract ID token from URL fragment
        const url = new URL(responseUrl);
        const fragmentParams = new URLSearchParams(url.hash.substring(1));
        const idToken = fragmentParams.get('id_token');
  
        if (idToken) {
          // Create provider instance first
          const provider = new OAuthProvider('microsoft.com');
          
          // Create credential using instance method
          const credential = provider.credential({
            idToken: idToken,
            // If you also get an access token:
            // accessToken: accessToken 
          });
  
          signInWithCredential(auth, credential)
            .catch((error) => console.error('Microsoft sign-in failed:', error))
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  console.log("user", user)

  return {
    isLoading,
    user,
    firestore,
    onLoginWithGoogle,
    onLoginWithMicrosoft,
    onLogout
  }
}
