"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function UserDetail() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    regNo: '',
    number: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.regNo) newErrors.regNo = 'Registration number is required';
    else if (!/^\d{2}[A-Za-z]{3}\d{4}$/.test(formData.regNo)) newErrors.regNo = 'Invalid registration number format';
    if (!formData.number) newErrors.number = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.number)) newErrors.number = 'Invalid phone number format';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitMessage(data.message);
        setFormData({ name: '', email: '', regNo: '', number: '' });
        setErrors({});
        setLoading(false);
        router.push('/join&createTeam')
      } else {
        const errorData = await response.json();
        setLoading(false);
        setSubmitMessage(`Form submission failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Form submission failed: Network error');
    }
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-white">
    {loading && <LoadingScreen/>}
      <main className="p-4 md:p-8 lg:p-16">
        <div className="text-xl text-black font-bold mb-4 text-center">Futurepreneurs 10.0</div>
        {/* <Link href={'/userDetails'}>
          <a className="text-blue-600 hover:underline block text-center">Sign In</a>
        </Link> */}
      </main>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 p-4 md:p-8 lg:p-10 ">
        <div className="bg-transparent p-4 sm:border border-gray-600 rounded-3xl flex justify-center items-center">
          <img
            src="/assets/FP.png"
            alt="FP"
            className=""
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center justify-center p-4 lg:p-8 bg-cover bg-center sm:border border-gray-600 rounded-3xl overflow-hidden">
          <div className="w-full max-w-md lg:max-w-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-transparent p-4 rounded-lg shadow-lg">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold text-black text-md">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border rounded-md text-lg  text-black ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-black text-md">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border rounded-md text-lg text-black ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="regNo" className="font-bold text-black text-md">Registration Number:</label>
                <input
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className={`border rounded-md text-lg text-black ${errors.regNo ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="font-bold text-black text-md">Phone Number:</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className={`border rounded-md text-lg  text-black ${errors.number ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
              </div>
              <button type="submit" className="p-2 rounded-3xl bg-blue-600 text-white text-lg hover:bg-blue-700 active:transform transition duration-200 w-full text-center">
                Submit
              </button>
            </form>
            {submitMessage && <p className="mt-4 text-lg text-gray-700 text-center">{submitMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
