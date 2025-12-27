import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure(`/courses?category=${category}`).then(res => {
      // adjust based on your API
      const dataArray = Array.isArray(res.data) ? res.data : res.data.data || [];
      setCourses(dataArray);
    });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <h2 className="text-3xl text-center font-bold my-6">All Courses</h2>

      <select
        onChange={e => setCategory(e.target.value)}
        className="select mb-6"
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Design">Design</option>
        <option value="Business">Business</option>
      </select>

      <div className="grid md:grid-cols-3 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
