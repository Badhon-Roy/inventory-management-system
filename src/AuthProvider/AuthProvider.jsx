
import PropTypes from 'prop-types'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';



export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user , setUser] = useState()
    const [loading , setLoading] = useState(true)


    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth , googleProvider)
    }
    const createUser = (email , password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }
    const signIn = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }
    const userProfile = (name , image) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
          })
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , currentUser =>{
            
            if(currentUser){
                const userInfo = { email : currentUser?.email}
                console.log('client email',userInfo);
                axiosPublic.post('/jwt' , userInfo)
                .then(res =>{
                    if(res.data?.token){
                        setUser(currentUser)
                        localStorage.setItem('access-token' , res.data.token);
                    }
                })
                
            }
            else{
               localStorage.removeItem('access-token');
               setUser(currentUser)
            }
            setLoading(false)
        })
        return () =>{
            unsubscribe();
        }
    },[axiosPublic])




    const authInfo = {loading , user, googleSignIn , createUser ,userProfile , signIn , logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children : PropTypes.node
}
export default AuthProvider;