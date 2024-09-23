"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import Navbar from '@/components/navbar';

export default function UserDetail() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    regNo: '',
    number: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (status == "unauthenticated") {
      setLoading(false);
      toast.error("Please Log in or Sign up");
      router.push("/");
    } else if (status == "authenticated") {
      setLoading(false);
      getUserData();
    }
  }, [status, router]);

  const getUserData = async () => {
    const res = await fetch("/api/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  
      Authorization: `Bearer ${session?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    });
    
    const data = await res.json();
  
    if(data.user.hasFilledDetails==true){
      if(data.user.teamId){
        if(data.user.teamRole==0){
          setLoading(false);
          router.push('/leaderDashboard')
        }else{
          setLoading(false);
          router.push('/memberDashboard')
        }
      }else{
        setLoading(false);
        router.push('/join&createTeam');
      }
    }else{
      setLoading(false);
    }
  }

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

  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/^[a-zA-Z ]+$/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
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
      const updatedFormData = {
        ...formData,
        regNo: formData.regNo.toUpperCase(), 
      };
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setFormData({ name: '', email: '', regNo: '', number: '' });
        setErrors({});
        setLoading(false);
        router.push('/join&createTeam')
      }else if(response.status==401){
          toast.error('Duplicate Registration Number')
          setLoading(false);
      }else if(response.status == 402){
        toast.error('Duplicate Mobile Number')
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        toast.error(`Form submission failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Form submission failed: Network error');
    }
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat  bg-[url(../assests/assests/bg_website.png)]">
    {loading && <LoadingScreen/>}
    <Navbar/>
      {/* <main className="p-4 md:p-8 lg:p-10">
        <div className="text-2xl text-black font-bold mb-4 text-center">Futurepreneurs 10.0</div> */}
        {/* <Link href={'/userDetails'}>
          <a className="text-blue-600 hover:underline block text-center">Sign In</a>
        </Link> */}
      {/* </main> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen gap-4 p-4 md:p-8 lg:p-10 ">
        <div className="logo-container bg-transparent p-4 sm:border border-gray-600 rounded-3xl flex justify-center items-center">
          <img
            src="/assets/FP.png"
            alt="FP"
            className=""
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center justify-center p-4 lg:p-8 bg-cover bg-center sm:border border-gray-600 rounded-3xl overflow-hidden">
          <div className="w-full max-w-md lg:max-w-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 bg-transparent p-2 rounded-lg shadow-none min-w-[full] min-h-[full] text-3xl">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="name" className="font-bold text-black text-md">Full Name:</label>
                <input
                  placeholder=" Full Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`border rounded-md text-2xl   text-black ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-black text-md">Email:</label>
                <input
                  placeholder=" Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border rounded-md text-2xl text-black ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="regNo" className="font-bold text-black text-md">Registration Number:</label>
                <input
                  placeholder=" Registration Number"
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className={`border rounded-md text-2xl text-black ${errors.regNo ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="font-bold text-black text-md">Phone Number:</label>
                <input
                  placeholder=" Phone Number"
                  type="number"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                  className={`border rounded-md text-2xl  text-black ${errors.number ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'} focus:outline-none focus:ring-2`}
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
              </div>
              <button type="submit" className="p-2 rounded-3xl bg-blue-600 text-white text-2xl hover:bg-blue-700 active:transform transition duration-200 w-full h-auto text-center">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1024px) {
          .logo-container {
            display: none;
          }
        }
      `}</style>
      <Toaster/>
    </div>
  );
}
