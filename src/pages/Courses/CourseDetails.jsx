import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";


const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load course");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll");
      navigate("/login");
      return;
    }

    setEnrolling(true);

    const enrollData = {
      courseId: course._id,
      title: course.title,
      image: course.image,
      price: course.price,
      category: course.category,
      duration: course.duration,
      studentEmail: user.email,
      enrolledAt: new Date(),
    };

    try {
      await axiosSecure.post("/enroll", enrollData);
      toast.success("Successfully enrolled 🎉");
      navigate("/dashboard/enrolled");
    } catch (error) {
      console.log(error)
      toast.error("Already enrolled or something went wrong");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-80 object-cover rounded-lg"
      />

      <div>
        <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {course.category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Duration:</strong> {course.duration}
        </p>
        
        <p className="text-xl font-semibold mb-4">
          Price: ${course.price}
        </p>
        

        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="btn btn-primary w-full"
        >
          {enrolling ? "Enrolling..." : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
