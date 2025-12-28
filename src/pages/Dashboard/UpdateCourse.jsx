// import { useParams, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import axiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const UpdateCourse = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState({});

//   useEffect(() => {
//     axiosSecure(`/courses/${id}`).then(res => setCourse(res.data));
//   }, [id]);

//   const handleUpdate = e => {
//     e.preventDefault();
//     axiosSecure.put(`/courses/${id}`, course).then(() => {
//       toast.success("Course Updated");
//       navigate("/dashboard/my-courses");
//     });
//   };

//   return (
//     <form onSubmit={handleUpdate} className="max-w-xl mx-auto">
//       <input
//         value={course.title || ""}
//         onChange={e => setCourse({ ...course, title: e.target.value })}
//         className="input w-full mb-2"
//       />
//       <button className="btn btn-primary w-full">Update</button>
//     </form>
//   );
// };

// export default UpdateCourse;



// // import { useParams, useNavigate } from "react-router";
// // import { useEffect, useState } from "react";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import toast from "react-hot-toast";

// // const UpdateCourse = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const axiosSecure = useAxiosSecure();
// //   const [course, setCourse] = useState({});

// //   useEffect(() => {
// //     if (!id) return;

// //     axiosSecure.get(`/courses/${id}`).then(res => {
// //       setCourse(res.data);
// //     });
// //   }, [id, axiosSecure]);

// //   const handleUpdate = e => {
// //     e.preventDefault();

// //     axiosSecure.put(`/courses/${id}`, course).then(() => {
// //       toast.success("Course Updated");
// //       navigate("/dashboard/my-courses");
// //     });
// //   };

// //   return (
// //     <form onSubmit={handleUpdate} className="max-w-xl mx-auto">
// //       <input
// //         type="text"
// //         value={course.title || ""}
// //         onChange={e =>
// //           setCourse({ ...course, title: e.target.value })
// //         }
// //         className="input w-full mb-2"
// //         placeholder="Course Title"
// //       />

// //       <button className="btn btn-primary w-full">
// //         Update
// //       </button>
// //     </form>
// //   );
// // };

// // export default UpdateCourse;



import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load existing course
  useEffect(() => {
    if (!id) return;

    axiosSecure.get(`/courses/${id}`).then(res => {
      setCourse(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  // 🔹 Update course
  const handleUpdate = e => {
    e.preventDefault();

    axiosSecure.put(`/courses/${id}`, course).then(() => {
      toast.success("Course updated successfully");
      navigate("/dashboard/my-courses");
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Update Course
      </h2>

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          className="input w-full"
          placeholder="Title"
          value={course.title}
          onChange={e =>
            setCourse({ ...course, title: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Image URL"
          value={course.image}
          onChange={e =>
            setCourse({ ...course, image: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Price"
          value={course.price}
          onChange={e =>
            setCourse({ ...course, price: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Duration"
          value={course.duration}
          onChange={e =>
            setCourse({ ...course, duration: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Category"
          value={course.category}
          onChange={e =>
            setCourse({ ...course, category: e.target.value })
          }
        />

        <textarea
          className="textarea w-full"
          placeholder="Description"
          value={course.description}
          onChange={e =>
            setCourse({ ...course, description: e.target.value })
          }
        />

        <button className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;

