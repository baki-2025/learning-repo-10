import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setFormData({
          title: res.data.title,
          image: res.data.image,
          price: res.data.price,
          duration: res.data.duration,
          category: res.data.category,
          description: res.data.description,
          isFeatured: res.data.isFeatured || false,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load course data");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/courses/${id}`, formData);
      toast.success("Course updated successfully");
      navigate("/dashboard/my-courses");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!course) {
    return <p className="text-center py-20 text-red-500">Course not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl text-center font-bold mb-6">Update Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        {/* <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="checkbox"
          />
          Featured
        </label> */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
