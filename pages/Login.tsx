import { useState } from "react";
import { useFirebase } from "~firebase/useFirebase";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import WelcomePopup from "../components/WelcomePopup";
import Header from "../components/Header";
import "../style.css";

export default function Login({ onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, onLoginWithGoogle } = useFirebase();
    const [showPopup, setShowPopup] = useState(false);

    const handleLoginWithGoogle = async () => {
        await onLoginWithGoogle();
        setShowPopup(true);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "330px", background: "linear-gradient(to top, #FFE4A4, #FEF8E8)", fontFamily: "'Inter', sans-serif" }}>
            <div style={{ marginTop: "-7px", marginLeft: "-7px", marginRight: "-8px" }}>
                <Header boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2)"} />
            </div>
            <div style={{ padding: 16, marginTop: "10px" }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            marginBottom: "8px",
                            height: "30px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            marginTop: "8px",
                            marginBottom: "8px",
                            height: "30px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    {/* Button Container */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <button type="submit" style={{ width: "48%", borderRadius: '8px', border: "1px solid #ccc", backgroundColor: '#0F52BA', color: 'white', fontWeight: 'bold' }}>Login</button>
                        <button
                            onClick={handleLoginWithGoogle}
                            style={{
                                width: "48%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "5px 0",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "white",
                                cursor: "pointer",
                                fontWeight: 'bold'
                            }}
                        >
                            <FcGoogle size={20} /> Sign in
                        </button>
                    </div>
                </form>


                <br />
                <p
                    onClick={onSwitchToRegister}
                    style={{ cursor: "pointer", textAlign: "center", marginTop: "5px", fontSize: "15px", textDecoration: "underline", color: '#A9976C' }}
                >
                    Create a new account
                </p>

                {/* Show Popup After Google Login */}
                {showPopup && user && <WelcomePopup user={user} onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    );
}
