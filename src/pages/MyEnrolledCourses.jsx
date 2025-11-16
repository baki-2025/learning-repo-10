import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

const MyEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/enrolled")  // your API
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen /> My Enrolled Courses
      </h2>

      {courses.length === 0 && <p>No enrolled courses yet.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="shadow bg-white rounded-lg p-4">
            <img src={course.image} alt="" className="rounded-lg h-40 w-full object-cover" />
            <h3 className="text-xl font-bold mt-3">{course.title}</h3>
            <p className="text-gray-500">Duration: {course.duration} hrs</p>
            <p className="font-semibold text-blue-600">Price: ${course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
