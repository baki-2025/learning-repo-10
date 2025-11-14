import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddCourse = ({ user }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
    image: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;
    setLoading(true);
    try {
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();
      setForm(prev => ({ ...prev, image: data.data.url }));
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.image) return toast.error("Please upload an image");
    setLoading(true);

    const courseData = {
      ...form,
      instructor: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      },
      createdAt: new Date()
    };

    try {
      await api.post("/courses", courseData);
      toast.success("Course added successfully!");
      navigate("/my-courses");
    } catch {
      toast.error("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="input"/>
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="input"/>
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="input"/>
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input"/>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input"/>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange}/>
          <span>Featured Course</span>
        </label>
        <input type="file" onChange={handleImageUpload} className="input"/>
        <button type="submit" className="btn bg-blue-500 text-white" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
