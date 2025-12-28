import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 


const AddCourse = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 

  const handleAdd = e => {
    e.preventDefault();
    const form = e.target;

    const course = {
      title: form.title.value,
      image: form.image.value,
      email: form.email.value,
      price: form.price.value,
      duration: form.duration.value,
      level: form.level.value,
      category: form.category.value,
      description: form.description.value,
      instructor: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    axiosSecure.post("/courses", course).then(() => {
      toast.success("Course Added Successfully");
      form.reset();
    });
  };

  return (
    <form onSubmit={handleAdd} className="max-w-xl mx-auto">
      <h2 className="text-4xl text-center font-bold mb-4">Add Course</h2>

      <input name="title" placeholder="Title" className="input w-full mb-2" />
      <input name="image" placeholder="Image URL" className="input w-full mb-2" />
      <input name="email" placeholder="Email" className="input w-full mb-2" />
      <input name="price" placeholder="Price" className="input w-full mb-2" />
      <input name="duration" placeholder="Duration" className="input w-full mb-2" />
      <input name="level" placeholder="Level" className="input w-full mb-2" />
      <input name="category" placeholder="Category" className="input w-full mb-2" />
      <textarea
        name="description"
        placeholder="Description"
        className="textarea w-full mb-2"
      ></textarea>

      <button className="btn btn-primary w-full">Add Course</button>
    </form>
  );
};

export default AddCourse;
