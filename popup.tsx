import { useFirebase } from "~firebase/hook"

export default function IndexPopup() {
  const { user, isLoading, onLoginWithGoogle, onLoginWithMicrosoft, onLogout } = useFirebase()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "300px"
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      {!user ? (
        <>
          <button onClick={onLoginWithGoogle}>Log in with Google</button>
          <button onClick={onLoginWithMicrosoft}>Log in with Microsoft</button>
        </>
      ) : (
        <button onClick={onLogout}>Log out</button>
      )}
      <div>
        {isLoading ? "Loading..." : ""}
        {!!user ? (
          <div>
            Welcome, {user.displayName}. Your email is {user.email}
          </div>
        ) : (
          ""
        )}
      </div>

      <footer>Crafted by @PlasmoHQ</footer>
    </div>
  )
}
