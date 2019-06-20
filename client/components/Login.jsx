import React from 'react'

export default function Login( { createAccountToggle, onChange, handleSubmit, userName, password } ) {
  return (
    <div className="login">
        <p>User Login</p>
        <form onSubmit={handleSubmit}>
          <div className="userName">
          <label>UserName:</label>
          <input name="userName" onChange={(e) => onChange(e)} value={userName} placeholder="Username" type="text" />
          </div>
          <div className="password">
            <label>Password:</label>
            <input name="password" onChange={(e) => onChange(e)} value={password} placeholder="Password" type="password" />  
          </div>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={createAccountToggle}>Create Account</button>
      </div>
  )
}
