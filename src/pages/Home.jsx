import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // 🟢 Fetch popular courses (first 6)
    fetch('http://localhost:3000/courses')
      .then(res => res.json())
      .then(data => setCourses(data.slice(0, 6)))
      .catch(err => console.error(err));

    // 🟢 Fetch top 3 instructors only
    fetch('http://localhost:3000/instructors')
      .then(res => res.json())
      .then(data => setInstructors(data.slice(0, 3)))  // ✅ Only 3 instructors
      .catch(err => console.error(err));
  }, []);

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
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow"
        >
          Get Started
        </motion.button>
      </section>

      {/* 🟢 Popular Courses Section */}
      <section className="px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course._id || i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-500 mt-2">{course.category}</p>
              <p className="text-indigo-600 font-semibold mt-3">${course.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟢 Why Choose Us Section */}
      <section className="bg-gray-400 py-16 px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow" data-aos="zoom-in">
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow" data-aos="zoom-in" data-aos-delay="200">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p>Access courses anytime, anywhere, at your own pace.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow" data-aos="zoom-in" data-aos-delay="400">
            <h3 className="text-xl font-semibold mb-2">Certified Courses</h3>
            <p>Get certificates after course completion to boost your career.</p>
          </div>
        </div>
      </section>

      {/* 🟢 Top 3 Instructors Section */}
      <section className="py-16 px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8">Top Instructors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={ins._id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              <div className="w-24 h-24 mx-auto bg-indigo-200 rounded-full mb-4 overflow-hidden">
                {ins.image && (
                  <img src={ins.image} alt={ins.name} className="w-full h-full object-cover" />
                )}
              </div>
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






