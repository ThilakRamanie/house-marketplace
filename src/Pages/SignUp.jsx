import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { toast } from 'react-toastify'
import OAuth from '../Components/OAuth'

function SignUp() {
  const [showPassword, setShowPassword] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:''
  })
  const {name, email, password} = formData;
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevFormData) => ({...prevFormData,[e.target.id]: e.target.value}))
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate('/')
    } catch(error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
      </header>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='Name' id='name' value={name} onChange={onChange} className="nameInput" />
        <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} className="emailInput" />
        <div className="passwordInputDiv">
          <input type={showPassword ? 'password': 'text'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
          <img src={VisibilityIcon} alt='show password' className='showPassword' onClick={()=>setShowPassword((prev)=>!prev)} />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>

    </div>
  )
}

export default SignUp
