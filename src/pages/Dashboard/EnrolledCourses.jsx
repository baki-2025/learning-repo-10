import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/enroll?email=${user.email}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load enrolled courses");
        setLoading(false);
      });
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Enrolled Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          No enrolled courses found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg p-4 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{course.title}</h3>
              <p className="text-sm text-gray-600">
                Category: {course.category}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {course.duration}
              </p>
              <p className="font-semibold mt-1">
                Price: ${course.price}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Enrolled at:{" "}
                {new Date(course.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
