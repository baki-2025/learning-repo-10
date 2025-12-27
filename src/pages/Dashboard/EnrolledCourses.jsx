import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/LoadingSpinner";

const EnrolledCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/enrollments?email=${user.email}`)
        .then(res => {
          setCourses(res.data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">You have not enrolled in any course yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course._id}
              className="border rounded-lg p-4 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-3">{course.title}</h3>
              <p className="text-sm mt-1">{course.category}</p>
              <p className="text-sm">Duration: {course.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
