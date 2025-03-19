import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebase";

export const useFirebase = () => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loginWithChromeIdentity = async () => {
        if (typeof chrome === "undefined" || !chrome.identity) {
            throw new Error("Chrome Identity API is not available");
        }
        try {
            const token = await new Promise<string>((resolve, reject) => {
                chrome.identity.getAuthToken({ interactive: true }, (token) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve(token);
                    }
                });
            });
            const credential = GoogleAuthProvider.credential(null, token);
            const result = await signInWithCredential(auth, credential);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            // Lưu vào chrome.storage.local
            chrome.storage.local.set({ user: userData, token }, () => {
                setUser(userData);
            });
        } catch (e) {
            console.error("Login failed:", e);
            throw e;
        }
    };

    const logout = () => {
        chrome.storage.local.remove(["user", "token"], () => {
            console.log("User logged out");
            setUser(null);
        });
    };

    useEffect(() => {
        chrome.storage.local.get(["user", "token"], (result) => {
            if (result.user && result.token) {
                setUser(result.user);
            } else {
                console.log("No user found in chrome.storage");
            }
            setIsLoading(false);
        });
    }, []);

    return {
        user,
        isLoading,
        onLoginWithGoogle: loginWithChromeIdentity,
        onLogout: logout,
    };
};