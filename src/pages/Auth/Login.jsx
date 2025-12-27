// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router';
// import useAuth from '../../hooks/useAuth';

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
  

//   const handleLogin = (data) => {
//     signInUser(data.email, data.password)
//       .then(result => {
//         console.log(result.user);
//         navigate(location?.state || '/')
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6">
//       <h3 className="text-3xl text-center font-semibold">Welcome back</h3>
//       <p className="text-center mb-2">Please Login</p>

//       <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
//         <fieldset className="fieldset space-y-2">

//           {/* Email */}
//           <label className="label">Email</label>
//           <input
//             type="email"
//             {...register('email', { required: true })}
//             className="input"
//             placeholder="Enter your email"
//           />
//           {errors.email?.type === 'required' && (
//             <p className="text-red-500">Email is required</p>
//           )}

//           {/* Password */}
//           <label className="label">Password</label>
//           <input
//             type="password"
//             {...register('password', { required: true, minLength: 6 })}
//             className="input"
//             placeholder="Enter your password"
//           />
//           {errors.password?.type === 'minLength' && (
//             <p className="text-red-500">Password must be 6 characters or longer</p>
//           )}

//           <div>
//             <a className="link link-hover">Forgot password?</a>
//           </div>

//           <button className="btn btn-neutral mt-4">Login</button>
//         </fieldset>

//         <p className="text-center mt-2">
//           New to Learning Hub? <Link state={location.state} className="text-blue-500 underline" to="/register">Register</Link>
//         </p>
//       </form>
      
//     </div>
//   );
// };

// export default Login;




import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = e => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message);
        toast.error("Invalid email or password");
      });
  };

  const handleGoogleLogIn= () => {
    googleLogin()
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-4xl font-bold text-center mt-4">Login</h1>

        <form onSubmit={handleLogin} className="card-body">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="btn btn-neutral mt-4">Login</button>

          <p className="text-sm text-center mt-2">
            New here?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogIn}
            className="btn bg-white text-black border mt-3"
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

