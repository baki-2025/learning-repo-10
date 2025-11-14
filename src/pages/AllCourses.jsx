import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(filter.toLowerCase()) ||
    course.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-6 text-lg">Loading courses...</p>;
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">All Courses</h2>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Search by title or category..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {filteredCourses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        ) : (
          filteredCourses.map(course => (
            <motion.div
              key={course._id}
              className="bg-white shadow-md rounded p-4 hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{course.title}</h3>
              <p className="text-gray-600">{course.category}</p>
              <p className="text-gray-800 font-bold mt-2">${course.price}</p>

              <Link
                to={`/courses/${course._id}`}
                className="inline-block mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AllCourses;
