import { useFirebase } from "~firebase/useFirebase";
import Header from "../components/Header";

export default function WelcomePopup({ user, onClose }) {
    const { onLogout } = useFirebase(); // Import logout function

    const handleSignOut = async () => {
        await onLogout();
        onClose(); // Close the popup
    };

    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "50px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            borderRadius: "8px",
            width: "280px",
        }}>
            <div style={{ marginTop: "-20px", marginLeft: "-30px", marginRight: "-20px" }}>
                <Header boxShadow={"0px 2px 3px rgba(0, 0, 0, 0.1)"} />
            </div>
            <div>
                <br />
                <img
                    src={user?.photoURL}
                    alt="User Profile"
                    style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "10px" }}
                />
                <h3>WELCOME TO DANANG SPEECH</h3>
                <p>{user?.displayName}</p>
                <button onClick={handleSignOut} style={{ marginTop: "10px", padding: "5px 10px" }}>
                    Sign out
                </button>
            </div>
        </div>
    );
}
