import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { auth, firestore } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'


const Auth = createContext()

const initialState = {isAuthenticated : false, user : {}, isAdmin : false}

const reducer = (state,{type,payload}) => {
  switch (type) {
    case "SET_LOGGED_IN": return {...state,isAuthenticated : true, user : payload.userData, isAdmin : payload.isAdmin}
    case "SET_Profile": return {...state, user : payload.userData}
    case "SET_LOGGED_Out": return initialState
    default:
      return state
  }
}
export default function AuthContext({children}) {
    const [state,dispatch] = useReducer(reducer,initialState)
    const [isAppLoading,setIsAppLoading] = useState(false)

    useEffect(() => {
      setIsAppLoading(true)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          readUserProfile(uid)
          // ...
        } else {
          setIsAppLoading(false)
          // User is signed out
          // ...
        }
      });
      
    },[])

    const readUserProfile = async (uid) => {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data()
      console.log("userData",userData)
      const isAdmin = userData?.roles?.includes("admin")
      dispatch({type : "SET_LOGGED_IN", payload : {userData, isAdmin}})
      setIsAppLoading(false)
    }

  return (
    <Auth.Provider value={{...state,dispatch,isAppLoading}}>
      {children}
    </Auth.Provider>
  )
}

export const useAuthContext = () => useContext(Auth) 
