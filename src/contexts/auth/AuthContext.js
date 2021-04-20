import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return user.updateEmail(email);
  }

  function updatePassword(password) {
    return user.updatePassword(password);
  }

  const value = {
    user,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
