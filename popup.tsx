// import { useFirebase } from "~firebase/hook"

// export default function IndexPopup() {
//   const { user, isLoading, onLoginWithGoogle, onLoginWithMicrosoft, onLogout } = useFirebase()

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         padding: 16,
//         width: "300px"
//       }}>
//       <h1>
//         Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
//       </h1>
//       {!user ? (
//         <>
//           <button onClick={onLoginWithGoogle}>Log in with Google</button>
//           <button onClick={onLoginWithMicrosoft}>Log in with Microsoft</button>
//         </>
//       ) : (
//         <button onClick={onLogout}>Log out</button>
//       )}
//       <div>
//         {isLoading ? "Loading..." : ""}
//         {!!user ? (
//           <div>
//             Welcome, {user.displayName}. Your email is {user.email}
//           </div>
//         ) : (
//           ""
//         )}
//       </div>

//       <footer>Crafted by @PlasmoHQ</footer>
//     </div>
//   )
// }
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useState, useEffect } from "react"
import WelcomePopup from "./components/WelcomePopup"
import { useFirebase } from "~firebase/hook"

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
    <div style={{}}>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}

      {/* Show Welcome Popup if user is logged in */}
      {showPopup && user && (
        <WelcomePopup user={user} onClose={() => setShowPopup(false)} />
      )}
    </div>
  )
}

