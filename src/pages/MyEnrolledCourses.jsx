import { useState, useEffect } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

// Corrected component declaration
const MyEnrolledCourses = ({ user }) => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const { data } = await api.get("/my-enrolled-courses");
      setEnrolled(data);
    } catch (err) {
      toast.error("Failed to fetch enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (enrolled.length === 0) return <p className="p-6">You haven't enrolled in any courses yet.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {enrolled.map(item => (
        <div key={item._id} className="bg-white p-4 shadow rounded">
          <img src={item.course.image} className="w-full h-48 object-cover rounded"/>
          <h3 className="text-xl font-bold mt-2">{item.course.title}</h3>
          <p className="text-gray-600">{item.course.category}</p>
          <p className="text-gray-800 mt-1">${item.course.price}</p>
          <p className="text-gray-500 mt-1">Enrolled on: {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEnrolledCourses;
