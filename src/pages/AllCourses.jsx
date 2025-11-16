import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
//import LoadingSpinner from "../components/LoadingSpinner";
import api from "../lib/axios"; // Your Axios instance
import { Helmet } from "react-helmet-async";

const categories = ["all", "frontend", "backend", "design", "marketing"];

const AllCourses = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isFetching, isError } = useQuery(
    ["courses", filter, page],
    async () => {
      const params = { page, limit };
      if (filter !== "all") params.category = filter;

      const res = await api.get("/courses", { params });
      return res.data; // { courses: [], total: n, hasMore: true/false }
    },
    { keepPreviousData: true, staleTime: 1000 * 60 * 2 }
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center text-red-600 p-6">
        Failed to load courses.
      </div>
    );

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title>All Courses | YourSite</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setPage(1);
            }}
            className={`px-4 py-2 rounded ${
              filter === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {data.courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        ) : (
          data.courses.map((course) => (
            <motion.div
              key={course._id}
              className="bg-white dark:bg-gray-700 shadow-md rounded p-4 flex flex-col transition hover:shadow-lg"
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
              <p className="text-gray-600 dark:text-gray-300">{course.category}</p>
              <p className="text-gray-800 dark:text-gray-100 font-bold mt-2">
                ${course.price}
              </p>
              <Link
                to={`/courses/${course._id}`}
                className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-center"
              >
                View Details
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="btn btn-outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={!data.hasMore}
        >
          Next
        </button>
      </div>

      {/* Fetching Indicator */}
      {isFetching && (
        <div className="text-center mt-3 text-gray-500 dark:text-gray-300">
          Updating courses...
        </div>
      )}
    </div>
  );
};

export default AllCourses;
