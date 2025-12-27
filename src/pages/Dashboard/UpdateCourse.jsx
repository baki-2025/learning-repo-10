import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    axiosSecure(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();
    axiosSecure.put(`/courses/${id}`, course).then(() => {
      toast.success("Course Updated");
      navigate("/dashboard/my-courses");
    });
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto">
      <input
        value={course.title || ""}
        onChange={e => setCourse({ ...course, title: e.target.value })}
        className="input w-full mb-2"
      />
      <button className="btn btn-primary w-full">Update</button>
    </form>
  );
};

export default UpdateCourse;
