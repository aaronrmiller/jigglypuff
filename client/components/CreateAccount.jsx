import React from 'react';

export default function CreateAccount({
  createAccountToggle,
  onChange,
  handleSubmit,
  firstName,
  lastName,
  email,
  userName,
  password
}) {
  return (
    <div className="login-create-acc">
      <p>Create Account</p>
      <form onSubmit={handleSubmit}>
        <div className="ca-firstName">
          <input
            name="firstName"
            value={firstName}
            onChange={e => onChange(e)}
            placeholder="first name"
            type="text"
          />
        </div>
        <div className="ca-lastName">
          <input
            name="lastName"
            value={lastName}
            onChange={e => onChange(e)}
            placeholder="last name"
            type="text"
          />
        </div>
        <div className="ca-email">
          <input
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="email"
            type="email"
          />
        </div>
        <div className="ca-userName">
          <input
            name="userName"
            value={userName}
            onChange={e => onChange(e)}
            placeholder="username"
            type="text"
          />
        </div>
        <div className="ca-password">
          <input
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="password"
            type="password"
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={createAccountToggle}>Already have an account?</button>
    </div>
  );
}
