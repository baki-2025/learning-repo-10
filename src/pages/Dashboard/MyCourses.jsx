import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/courses?email=${user.email}`)
        .then(res => {
          setCourses(res.data);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleDelete = id => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    axiosSecure.delete(`/courses/${id}`).then(() => {
      toast.success("Course deleted successfully");
      setCourses(courses.filter(course => course._id !== id));
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-6">My Added Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">You haven’t added any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
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
              <p className="text-sm">Category: {course.category}</p>
              <p className="text-sm">Price: ${course.price}</p>

              <div className="flex gap-2 mt-4">
                <Link to={`/courses/${course._id}`} className="btn btn-sm">
                  View
                </Link>

                <Link
                  to={`/dashboard/update/${course._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
