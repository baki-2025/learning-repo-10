import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">
        About LearningHub
      </h2>

      <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10">
        LearningHub is an online learning platform designed to help students,
        professionals, and lifelong learners gain new skills and advance their
        careers through high-quality courses.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to make education accessible, affordable, and
            practical for everyone. We focus on real-world skills that help
            learners grow confidently.
          </p>
        </div>

        {/* Vision */}
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-600">
            We aim to build a global learning community where knowledge is
            shared freely and learners can achieve their goals without limits.
          </p>
        </div>
        {/* Why We are best */}
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Why LearningHub?</h3>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>Expert instructors</li>
            <li>Practical & career-focused courses</li>
            <li>Flexible online learning</li>
            <li>24/7 online support</li>
            <li>Trusted & secure platform</li>
          </ul>
        </div>
      </div>
      <Link to="/" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Go Home
        </Link>
        
    </div>
    
     
  );
};

export default AboutUs;
