import Login from "./pages/Login"
import Register from "./pages/Register"
import { useState, useEffect } from "react"
import WelcomePopup from "./components/WelcomePopup"
import { useFirebase } from "~firebase/useFirebase"

export default function Popup() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading } = useFirebase()
  const [showPopup, setShowPopup] = useState(false)

  // Check if user is already logged in on startup
  useEffect(() => {
    if (user) {
      setShowPopup(true) // Show welcome popup if already logged in
    }
  }, [user])


  if (isLoading) return <div>Loading...</div> // Show loading state while checking auth

  return (
    <div>
      {showPopup && (
          <WelcomePopup user={user} onClose={() => setShowPopup(false)} />
      )}
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}

