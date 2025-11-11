import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  const courses = [
    { id: 1, title: 'Web Development Bootcamp', instructor: 'John Doe' },
    { id: 2, title: 'React for Beginners', instructor: 'Jane Smith' },
    { id: 3, title: 'Advanced JavaScript', instructor: 'Mike Ross' },
    { id: 4, title: 'UI/UX Design Principles', instructor: 'Sarah Lee' },
    { id: 5, title: 'Python for Data Science', instructor: 'David Kim' },
    { id: 6, title: 'Digital Marketing Mastery', instructor: 'Emma Brown' },
  ];

  const instructors = [
    { id: 1, name: 'Dr. Andrew', skill: 'Machine Learning' },
    { id: 2, name: 'Ms. Clara', skill: 'UI/UX Design' },
    { id: 3, name: 'Mr. Adam', skill: 'Web Development' },
  ];

  return (
    <div className="space-y-20">
      {/* 🟢 Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold"
        >
          Learn Anytime, Anywhere
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg"
        >
          Explore thousands of courses from top instructors.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow"
        >
          Get Started
        </motion.button>
      </section>

      {/* 🟢 Popular Courses */}
      <section className="px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-500 mt-2">Instructor: {course.instructor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟢 Why Choose Us */}
      <section className="bg-gray-100 py-16 px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-4 bg-white rounded-xl shadow" data-aos="zoom-in">
            <h3 className="font-semibold text-lg mb-2">Expert Instructors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow" data-aos="zoom-in" data-aos-delay="200">
            <h3 className="font-semibold text-lg mb-2">Flexible Learning</h3>
            <p>Access courses anytime, anywhere, at your own pace.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow" data-aos="zoom-in" data-aos-delay="400">
            <h3 className="font-semibold text-lg mb-2">Certified Courses</h3>
            <p>Get certificates after course completion to boost your career.</p>
          </div>
        </div>
      </section>

      {/* 🟢 Top Instructors */}
      <section className="py-16 px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8">Top Instructors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              <div className="w-24 h-24 mx-auto bg-indigo-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold">{ins.name}</h3>
              <p className="text-gray-500">{ins.skill}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
