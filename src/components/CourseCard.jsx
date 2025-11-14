import { motion } from "framer-motion";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white p-4 shadow rounded"
    >
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-bold mt-2">{course.title}</h3>
      <p className="text-gray-600">{course.category}</p>
      <p className="mt-1 text-gray-800">${course.price}</p>
      <Link 
        to={`/courses/${course._id}`} 
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default CourseCard;
