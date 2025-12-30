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
