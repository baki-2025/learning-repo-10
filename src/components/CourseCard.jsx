import { Link } from "react-router";

const CourseCard = ({ course }) => {
  const { _id, title, image, price, category, duration } = course;

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img src={image} className="h-40 w-full object-cover rounded" />
      <h3 className="font-bold mt-2">{title}</h3>
      <p className="text-sm">Category: {category}</p>
      <p className="text-sm">Duration: {duration}</p>
      <p className="font-semibold mt-1">${price}</p>
      <Link
        to={`/courses/${_id}`}
        className="btn btn-primary mt-auto"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
