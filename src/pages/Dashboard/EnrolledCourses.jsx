import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const EnrolledCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/enroll?email=${user.email}`)
      .then((res) => {
        setEnrolled(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

  if (!enrolled.length) {
    return <p className="text-center py-20">No courses enrolled yet</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {enrolled.map((course) => (
          <div
            key={course._id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <img
              src={course.image || "https://via.placeholder.com/400"}
              alt={course.title}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-2">{course.title}</h3>
            <p className="text-gray-600 mt-1">Price: ${course.price}</p>
            <p className="text-gray-600 mt-1">Enrolled At: {new Date(course.enrolledAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
