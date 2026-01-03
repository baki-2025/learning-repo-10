import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const loadingToast = toast.loading("Logging in...");

    loginWithEmail(email, password)
      .then((result) => {
        toast.success("Login successful!", { id: loadingToast });
        console.log("Logged in:", result.user);
      })
      .catch((err) => {
        toast.error("Invalid email or password", { id: loadingToast });
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    const loadingToast = toast.loading("Signing in with Google...");

    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!", { id: loadingToast });
      })
      .catch(() => {
        toast.error("Google login failed", { id: loadingToast });
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
      <h1 className="text-4xl font-bold text-center mt-6">Login</h1>

      <div className="card-body">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input name="email" type="email" className="input" required />

            <label className="label">Password</label>
            <input name="password" type="password" className="input" required />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border mt-4 w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
