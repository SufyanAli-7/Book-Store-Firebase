import { auth, firestore } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "SET_LOGIN":
      return { isAuth: true, user: payload };
    case "SET_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isAppLoading, setIsAppLoading] = useState(true)
  const navigate = useNavigate()

  const readProfile = async (user) => {
    const docSnap = await getDoc(doc(firestore, "users", user.uid));
    if (docSnap.exists()) {
      const user = docSnap.data()
      dispatch({ type: "SET_LOGIN", payload: user })
    }
    setIsAppLoading(false)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { readProfile(user) }
      else { setIsAppLoading(false) }
    })
  }, [])


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'SET_LOGOUT' })
        window.toastify('Logout successful', 'success')
        navigate('auth/login')
      })
      .catch((error) => {
        console.error(error)
        window.toastify('Logout failed. Please try again.', 'error')
      })
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch, readProfile, handleLogout, isAppLoading }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
export default AuthProvider