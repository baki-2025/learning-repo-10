import { useState, useEffect } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

// Corrected component declaration
const MyCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCourses = async () => {
    try {
      const { data } = await api.get("/my-courses");
      setCourses(data);
    } catch (err) {
      toast.error("Failed to fetch your courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted successfully!");
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course._id} className="bg-white p-4 shadow rounded">
          <img src={course.image} className="w-full h-48 object-cover rounded"/>
          <h3 className="text-xl font-bold mt-2">{course.title}</h3>
          <p className="text-gray-600">{course.category}</p>
          <p className="text-gray-800 mt-1">${course.price}</p>
          <div className="flex justify-between mt-2">
            <button onClick={() => navigate(`/courses/${course._id}`)} className="btn bg-blue-500 text-white px-2 py-1 rounded">View</button>
            <button onClick={() => navigate(`/update-course/${course._id}`)} className="btn bg-green-500 text-white px-2 py-1 rounded">Update</button>
            <button onClick={() => handleDelete(course._id)} className="btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
