import { useEffect, useState } from "react";
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
        const res = await axiosSecure.get(`/enrolled-courses/${user.email}`);
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
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
      <h2 className="text-2xl text-center font-bold mb-6">
        My Enrolled Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course._id}
              className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={course.image || "/placeholder.png"}
                alt={course.title || "Course Image"}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="font-bold mt-3">{course.title || "Untitled Course"}</h3>
              <p className="text-sm">Category: {course.category || "N/A"}</p>
              <p className="text-sm">Duration: {course.duration || "N/A"}</p>
              <p className="text-sm font-semibold">Price: ${course.price || "0"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;

