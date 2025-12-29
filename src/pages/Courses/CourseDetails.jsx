import { useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CourseDetails = () => {
  const { _id } = useParams();               // ✅ correct
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();               // logged user
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch single course
  useEffect(() => {
    axiosSecure.get(`/courses`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [_id, axiosSecure]);

  const handleEnroll = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    const enrollData = {
      courseId: course._id,
      title: course.title,
      price: course.price,
      email: user.email,
      image: course.image,
      category: course.category
    };

    try {
      await axiosSecure.post("/enroll", enrollData);
      toast.success("Successfully Enrolled!");
    } catch (error) {
      toast.error("Enrollment failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-80 object-cover rounded-lg"
      />

      <div className="mt-6 space-y-3">
        <h2 className="text-3xl font-bold">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>

        <p>
          <span className="font-semibold">Category:</span> {course.category}
        </p>

        <p>
          <span className="font-semibold">Price:</span> ${course.price}
        </p>
      </div>

      <button
        onClick={handleEnroll}
        className="btn btn-primary mt-6"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;



