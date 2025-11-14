import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const ViewCourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-center mt-6">Loading...</p>;

  const handleEnroll = () => {
    toast.success(`You have successfully enrolled in ${course.title}!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-8">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{course.title}</h2>
      <p className="text-gray-700 mt-2">{course.description}</p>
      <p className="text-gray-800 font-semibold mt-2">Category: {course.category}</p>
      <p className="text-gray-800 font-semibold">Duration: {course.duration}</p>
      <p className="text-blue-600 text-xl font-bold mt-2">Price: ${course.price}</p>

      <button
        onClick={handleEnroll}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default ViewCourseDetails;
