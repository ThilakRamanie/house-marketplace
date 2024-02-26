import { useState} from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent successfully')
    }
    catch(e) {
      toast.error('Could not send reset mail')
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <input type="email" className="emailInput" id="email" placeholder='Email' value={email} onChange={onChange} />
        <Link className="forgotPasswordLink" to='/sign-in'>Sign In</Link>
        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button className="signInButton" onClick={onSubmit}>
            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
          </button>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword
