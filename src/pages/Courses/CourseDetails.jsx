import { useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <img src="" className="rounded w-full" />
      <h2 className="text-3xl font-bold mt-4">{course.title}</h2>
      <p className="mt-2">{course.description}</p>

      <button
        onClick={() => toast.success("Successfully Enrolled!")}
        className="btn btn-primary mt-6"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;
