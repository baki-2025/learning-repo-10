// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const EnrolledCourses = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchCourses = async () => {
//       try {
//         const res = await axiosSecure.get(`/enrolled-courses/${user.email}`);
//         setCourses(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to fetch enrolled courses:", err);
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [user, axiosSecure]);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 mt-10">
//       <h2 className="text-2xl text-center font-bold mb-6">
//         My Enrolled Courses
//       </h2>

//       {courses.length === 0 ? (
//         <p className="text-center text-gray-500">
//           You haven’t enrolled in any courses yet.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map(course => (
//             <div
//               key={course._id}
//               className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
//             >
//               <img
//                 src={course.image || "/placeholder.png"}
//                 alt={course.title || "Course Image"}
//                 className="h-40 w-full object-cover rounded"
//               />

//               <h3 className="font-bold mt-3">{course.title || "Untitled Course"}</h3>
//               <p className="text-sm">Category: {course.category || "N/A"}</p>
//               <p className="text-sm">Duration: {course.duration || "N/A"}</p>
//               <p className="text-sm font-semibold">Price: ${course.price || "0"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnrolledCourses;





import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const EnrolledCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCourses = async () => {
      try {
        const res = await axiosSecure.get(
          `/enroll/${user.email}`
        );
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Enrolled Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-12 rounded object-cover"
                    />
                  </td>

                  <td className="font-semibold">
                    {course.title}
                  </td>

                  <td>{course.category}</td>
                  <td>{course.duration}</td>
                  <td>${course.price}</td>

                  <td>
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-xs btn-primary"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
