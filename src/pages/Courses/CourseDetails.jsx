import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams(); // route থেকে id
  const { user } = useAuth(); // লগিন ইউজার
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load course details");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleEnroll = async () => {
    if (!user) return toast.error("Please login to enroll");
    try {
      const enrollData = {
        courseId: course._id,
        title: course.title,
        image: course.image,
        price: course.price,
        studentEmail: user.email,
        enrolledAt: new Date(),
      };
      await axiosSecure.post("/enroll", enrollData);
      toast.success("Successfully enrolled in this course 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Already enrolled or something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!course)
    return (
      <p className="text-center text-red-500 py-20">
        Course not found
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Course Image */}
        <img
          src={course.image || "https://via.placeholder.com/400"}
          alt={course.title}
          className="rounded-xl w-full h-[400px] object-cover"
        />

        {/* Course Details */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>

          <div className="space-y-2">
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Instructor:</strong> {course.instructorName}
            </p>
          </div>

          <button
            onClick={handleEnroll}
            className="btn btn-success mt-6"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
