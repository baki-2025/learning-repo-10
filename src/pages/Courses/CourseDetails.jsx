// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const [course, setCourse] = useState({});

//   useEffect(() => {
//     axiosSecure
//       .get(`/courses/${id}`)
//       .then(res => setCourse(res.data));
//   }, [id, axiosSecure]);

//   const handleEnroll = () => {
//     toast.success("Successfully Enrolled!");
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6">
//       {/* Image */}
//       <img
//         src={course.image}
//         alt={course.title}
//         className="w-full h-80 object-cover rounded-lg"
//       />

//       {/* Details */}
//       <div className="mt-6 space-y-3">
//         <h2 className="text-3xl font-bold">{course.title}</h2>

//         <p className="text-gray-600">{course.description}</p>

//         <p>
//           <span className="font-semibold">Category:</span>{" "}
//           {course.category}
//         </p>

//         <p>
//           <span className="font-semibold">Price:</span> $
//           {course.price}
//         </p>
//       </div>

//       {/* Enroll Button */}
//       <button
//         onClick={handleEnroll}
//         className="btn btn-primary mt-6"
//       >
//         Enroll Now
//       </button>
//     </div>
//   );
// };

// export default CourseDetails;


import { useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CourseDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosSecure.get(`/courses/${id}`);

        // Handle flexible API response
        const data = res.data?.data || res.data;
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, axiosSecure]);

  const handleEnroll = () => {
    toast.success("Successfully Enrolled!");
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ❌ Course not found
  if (!course) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-xl">
          Course not found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-80 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="mt-6 space-y-3">
        <h2 className="text-3xl font-bold">{course.title}</h2>

        <p className="text-gray-600">
          {course.description}
        </p>

        <p>
          <span className="font-semibold">Category:</span>{" "}
          {course.category}
        </p>

        <p>
          <span className="font-semibold">Price:</span>{" "}
          ${course.price}
        </p>
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        className="btn btn-primary mt-6"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;
