import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load existing course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosSecure.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id, axiosSecure]);

  // 🔹 Update course
  const handleUpdate = async e => {
    e.preventDefault();

    try {
      const { _id, ...updatedCourse } = course;

      await axiosSecure.put(`/courses/${id}`, updatedCourse);
      toast.success("Course updated successfully");
      navigate("/dashboard/my-courses");
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

  if (loading || !course) return <LoadingSpinner />;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Update Course
      </h2>

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          className="input w-full"
          placeholder="Title"
          value={course.title || ""}
          onChange={e =>
            setCourse({ ...course, title: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Image URL"
          value={course.image || ""}
          onChange={e =>
            setCourse({ ...course, image: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Price"
          value={course.price || ""}
          onChange={e =>
            setCourse({ ...course, price: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Duration"
          value={course.duration || ""}
          onChange={e =>
            setCourse({ ...course, duration: e.target.value })
          }
        />

        <input
          className="input w-full"
          placeholder="Category"
          value={course.category || ""}
          onChange={e =>
            setCourse({ ...course, category: e.target.value })
          }
        />

        <textarea
          className="textarea w-full"
          placeholder="Description"
          value={course.description || ""}
          onChange={e =>
            setCourse({ ...course, description: e.target.value })
          }
        />

        <button className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
