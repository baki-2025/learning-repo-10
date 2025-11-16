import { useEffect, useState } from "react";
import { Pencil, Trash2, Layers } from "lucide-react";

const MyAddedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/my-added") // your API route
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/courses/${id}`, { method: "DELETE" })
      .then(() => {
        setCourses(courses.filter(c => c._id !== id));
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Layers /> My Added Courses
      </h2>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>
                  <img src={course.image} alt="" className="w-20 rounded" />
                </td>
                <td>{course.title}</td>
                <td>${course.price}</td>
                <td>{course.duration} hrs</td>
                <td className="flex gap-2">

                  <button className="btn btn-sm btn-warning">
                    <Pencil size={16} />
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(course._id)}
                  >
                    <Trash2 size={16} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyAddedCourses;
