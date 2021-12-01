import React, { useContext, useState, useEffect } from "react";
import {getAuth, 
    signOut,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const auth = getAuth()

    function signup(email, password, onSuccess=null, onError=null) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(onSuccess || (cred => console.log(cred.user.email)))
            .catch(onError || (e => console.log(e)))
    }
    
    function loginWithEmailAndPassword(email, password, onSuccess=null, onError=null) {
        signInWithEmailAndPassword(auth, email, password)
            .then(onSuccess || (cred => console.log(cred.user.email)))
            .catch(onError || (e => console.log(e)))
            
    }

    function logout(onSuccess=null, onError=null) {
        signOut(auth)
            .then(onSuccess || (cred => console.log(cred.user.email)))
            .catch(onError || (e => console.log(e)))
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