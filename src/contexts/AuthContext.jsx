import React, { useContext, useState, useEffect } from "react";
import {getAuth, 
    signOut,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword} from 'firebase/auth'

const AuthContext = React.createContext()
// TODO: allow to auth with google
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const auth = getAuth()

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function loginWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password)            
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsubscribe
    }, [auth])
    


    const value = {
        currentUser,
        signup,
        loginWithEmailAndPassword,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}