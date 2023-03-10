import { useState } from "react";
import { auth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create new account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
        console.log("일반 로그인 : ", data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="Email"
          required
          className="authInput"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          className="authInput authSubmit"
        />
        {error}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sing In" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;
