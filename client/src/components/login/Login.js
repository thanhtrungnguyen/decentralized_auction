import styles from "../../styleCss/login.module.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The email you entered was: ${email}
    The password you entered was: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.group3}>
        <div className={styles.group2}>
          <p className={styles.txtLogin}>Login</p>
          <p className={styles.text}>
            Please login using account detail bellow.
          </p>
          <input
            type="text"
            className={styles.textField}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            className={styles.textField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p className={styles.text}>Forgot your password?</p>
          <input className={styles.btnSignIn} type="submit" value="Sign in" />
          <p className={styles.text}>Don’t have an Account?Create account </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
