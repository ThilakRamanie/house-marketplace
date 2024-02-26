import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()
    const onGoogleClick = async()=>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists()) {
                setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email, 
                    createdAt: serverTimestamp() 
                })
            }
            navigate('/')
        }
        catch(e) {
            toast.error(e.message)
        }
    }
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname==='/signup'? 'up':'in'}</p>
      <button className="socialIconDiv">
        <img className='socialIconImg' src={googleIcon} alt='google' onClick={onGoogleClick} />
      </button>
    </div>
  )
}

export default OAuth
