import { useState } from "react";
import { PlusSquare } from "lucide-react";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => alert("Course Added Successfully!"))
      .catch(err => console.log(err));
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <PlusSquare /> Add New Course
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Course Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Duration (Hours)"
            className="input input-bordered w-full"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>

        <button className="btn btn-primary w-full">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
