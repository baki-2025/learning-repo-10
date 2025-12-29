// import { updateProfile } from "firebase/auth";
// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";

// const Register = () => {
//   const { signInWithGoogle, registerWithEmail } = useContext(AuthContext);

//   const [error, setError] = useState("");

//   // Email & Password Register
//   const handleEmailRegister = (e) => {
//     e.preventDefault();
//     setError("");

//     const form = e.target;
//     const name = form.name.value;
//     const photo = form.photo.value;
//     const email = form.email.value;
//     const password = form.password.value;

//     registerWithEmail(email, password)
//       .then(async(result) => {
//         const user = result.user;

//         await updateProfile(user, {
//       displayName: name,
//       photoURL: photo,
//     });

//         const newUser = {
//           name,
//           email,
//           image: photo,
//         };

//         // Save user to DB
//         fetch("http://localhost:3000/users", {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(newUser),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log("User saved:", data);
//           });
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(err.message);
//       });
//   };

//   // Google Sign In
//   const handleGoogleSignIn = () => {
//     signInWithGoogle()
//       .then((result) => {
//         const user = result.user;

//         const newUser = {
//           name: user.displayName,
//           email: user.email,
//           image: user.photoURL,
//         };

//         fetch("http://localhost:3000/users", {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(newUser),
//         })
//           .then((res) => res.json())
//           .then((data) => console.log("Google user saved:", data));
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
//       <h1 className="text-4xl font-bold text-center mt-6">Register</h1>

//       <div className="card-body">
//         <form onSubmit={handleEmailRegister}>
//           <fieldset className="fieldset">
//             <label className="label">Name</label>
//             <input name="name" type="text" className="input" placeholder="Name" required />

//             <label className="label">Photo URL</label>
//             <input name="photo" type="text" className="input" placeholder="Photo URL" required />

//             <label className="label">Email</label>
//             <input name="email" type="email" className="input" placeholder="Email" required />

//             <label className="label">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="input"
//               placeholder="Password"
//               required
//             />

//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             <button className="btn btn-neutral mt-4">Register</button>
//           </fieldset>
//         </form>

//         {/* Google Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="btn bg-white text-black border-[#e5e5e5] mt-4"
//         >
//           <svg
//             aria-label="Google logo"
//             width="16"
//             height="16"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//           >
//             <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
//             <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
//             <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
//             <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
//           </svg>
//           <span className="ml-2">Login with Google</span>
//         </button>
//       </div>
 //     </div>
 //   );
// };

// export default Register;



// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { updateProfile } from "firebase/auth";

// const Register = () => {
//   const { signInWithGoogle, registerWithEmail } = useContext(AuthContext);
//   const [error, setError] = useState("");

//   // =========================
//   // Email & Password Register
//   // =========================
//   const handleEmailRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     const form = e.target;
//     const name = form.name.value;
//     const photo = form.photo.value;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       // 1️⃣ Create user
//       const result = await registerWithEmail(email, password);
//       const user = result.user;

//       // 2️⃣ Update Firebase profile (🔥 IMPORTANT)
//       await updateProfile(user, {
//         displayName: name,
//         photoURL: photo,
//       });

//       // 3️⃣ Save user to database
//       const newUser = {
//         name,
//         email,
//         image: photo,
//         role: "student", // optional but recommended
//       };

//       const res = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });

//       const data = await res.json();
//       console.log("User saved:", data);

//       form.reset();
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // =========================
//   // Google Sign In
//   // =========================
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithGoogle();
//       const user = result.user;

//       const newUser = {
//         name: user.displayName,
//         email: user.email,
//         image: user.photoURL,
        
//       };

//       const res = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });

//       const data = await res.json();
//       console.log("Google user saved:", data);
//     } catch (error) {
//       console.error(error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
//       <h1 className="text-4xl font-bold text-center mt-6">Register</h1>

//       <div className="card-body">
//         <form onSubmit={handleEmailRegister}>
//           <fieldset className="fieldset">
//             <label className="label">Name</label>
//             <input
//               name="name"
//               type="text"
//               className="input"
//               placeholder="Your Name"
//               required
//             />

//             <label className="label">Photo URL</label>
//             <input
//               name="photo"
//               type="text"
//               className="input"
//               placeholder="Photo URL"
//               required
//             />

//             <label className="label">Email</label>
//             <input
//               name="email"
//               type="email"
//               className="input"
//               placeholder="Email"
//               required
//             />

//             <label className="label">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="input"
//               placeholder="Password"
//               required
//             />

//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             <button className="btn btn-neutral mt-4 w-full">
//               Register
//             </button>
//           </fieldset>
//         </form>

//         {/* Google Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="btn bg-white text-black border-[#e5e5e5] mt-4 w-full"
//         >
//           <svg
//             aria-label="Google logo"
//             width="16"
//             height="16"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//           >
//             <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
//             <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
//             <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
//             <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
//           </svg>
//           <span className="ml-2">Login with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { signInWithGoogle, registerWithEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  // =========================
  // Email & Password Register
  // =========================
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1️⃣ Create user
      const result = await registerWithEmail(email, password);
      const user = result.user;

      // 2️⃣ Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // =========================
      // 3️⃣ Save to USERS collection
      // =========================
      const newUser = {
        name,
        email,
        image: photo,
        role: isInstructor ? "instructor" : "student",
      };

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // =========================
      // 4️⃣ If Instructor → save to instructors collection
      // =========================
      if (isInstructor) {
        const instructorData = {
          name,
          email,
          image: photo,
          bio: "New Instructor",
          skills: [],
        };

        await fetch("http://localhost:3000/instructors", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(instructorData),
        });
      }

      form.reset();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // =========================
  // Google Sign In
  // =========================
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "student",
      };

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
      <h1 className="text-4xl font-bold text-center mt-6">Register</h1>

      <div className="card-body">
        <form onSubmit={handleEmailRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input name="name" type="text" className="input" required />

            <label className="label">Photo URL</label>
            <input name="photo" type="text" className="input" required />

            <label className="label">Email</label>
            <input name="email" type="email" className="input" required />

            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              required
            />

            {/* Instructor checkbox */}
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={isInstructor}
                onChange={(e) => setIsInstructor(e.target.checked)}
              />
              Register as Instructor
            </label>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button className="btn btn-neutral mt-4 w-full">
              Register
            </button>
          </fieldset>
        </form>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border mt-4 w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
