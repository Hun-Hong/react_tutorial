import { useRef } from "react";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const submitRef = useRef<HTMLInputElement>(null)

  const toNextForm = (current: string) => {
    switch (current) {
      case "username": {
        if (passwordRef.current) {
          passwordRef.current.focus()
        }
        return
      }

      case "password": {
        if (emailRef.current) {
          emailRef.current.focus()
        }
        return
      }

      case "email": {
        if (submitRef.current) {
          submitRef.current.focus()
        }
        return
      }

      case "submit": {
        if (usernameRef.current && !usernameRef.current.value.trim()) {
          alert("username empty!")
          usernameRef.current.focus()
          return
        }
        if (passwordRef.current && !passwordRef.current.value.trim()) {
          alert("password empty!")
          passwordRef.current.focus()
          return
        }
        if (emailRef.current && !emailRef.current.value.trim()) {
          alert("email empty!")
          emailRef.current.focus()
          return
        }
        alert("Sign Up Success")
        return

      }

    }
  }

  return (
    <div>
      <form>
        <label htmlFor="username">username: </label>
        <input ref={usernameRef} id="username" type="text" placeholder="username" />
        <button type="button" onClick={() => toNextForm("username")}>다음 필드로</button>
        <br />
        <label htmlFor="password">password: </label>
        <input ref={passwordRef} type="password" id="password" />
        <button type="button" onClick={() => toNextForm("password")}>다음 필드로</button>
        <br />
        <label htmlFor="email">email: </label>
        <input ref={emailRef} type="email" id="email" />
        <button type="button" onClick={() => toNextForm("email")}>다음 필드로</button>
        <br />
        <input 
        onClick={() => toNextForm("submit")}
        ref={submitRef} type="button" value="Sign Up" />

      </form>
    </div>
  )
}

export default SignUp