import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    checked: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;
    const validationErrors = {};

    if (!username) validationErrors.username = "Enter your username";
    if (!clientLastName)
      validationErrors.clientLastName = "Enter your last name";
    if (!email) validationErrors.email = "Enter your email";
    if (password.length < 8)
      validationErrors.password = "Password should be of 8 letters";
    if (password !== confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match";
    // Add more validation rules as needed...

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form submission logic...
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          password2: confirmPassword,
          phone_number: phone,
          role: "customer",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMsg(data.detail);
        console.log(data.detail);
      } else {
        const data = await response.json();
        console.log(data);
        // setSuccessMsg(data);
      }
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        checked: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-start w-full h-screen">
      <div className="hidden w-1/2 h-full text-white lgl:inline-flex">
        {/* Sidebar content */}
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="text-xl font-medium font-titleFont">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-semibold text-white font-titleFont">
                Get started fast with Orebi
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-semibold text-white font-titleFont">
                Access all Orebi services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-semibold text-white font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white">
              © Orebi
            </p>
            <p className="text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white">
              Terms
            </p>
            <p className="text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white">
              Privacy
            </p>
            <p className="text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 font-medium text-green-500 font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 text-base font-semibold tracking-wide text-gray-200 duration-300 rounded-md bg-primeColor font-titleFont hover:bg-black hover:text-white">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* Client Name */}
                <div className="flex flex-col gap-.5">
                  <p className="text-base font-semibold text-gray-600 font-titleFont">
                    Username
                  </p>
                  <input
                    onChange={handleChange}
                    value={formData.username}
                    name="username"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errors.username && (
                    <p className="px-4 text-sm font-semibold text-red-500 font-titleFont">
                      <span className="mr-1 italic font-bold">!</span>
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="text-base font-semibold text-gray-600 font-titleFont">
                    Work Email
                  </p>
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errors.email && (
                    <p className="px-4 text-sm font-semibold text-red-500 font-titleFont">
                      <span className="mr-1 italic font-bold">!</span>
                      {errors.email}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="text-base font-semibold text-gray-600 font-titleFont">
                    Phone Number
                  </p>
                  <input
                    onChange={handleChange}
                    value={formData.phone}
                    name="phone"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="008801234567891"
                  />
                  {errors.phone && (
                    <p className="px-4 text-sm font-semibold text-red-500 font-titleFont">
                      <span className="mr-1 italic font-bold">!</span>
                      {errors.phone}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="text-base font-semibold text-gray-600 font-titleFont">
                    Password
                  </p>
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errors.password && (
                    <p className="px-4 text-sm font-semibold text-red-500 font-titleFont">
                      <span className="mr-1 italic font-bold">!</span>
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-.5">
                  <p className="text-base font-semibold text-gray-600 font-titleFont">
                    Confirm Password
                  </p>
                  <input
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="px-4 text-sm font-semibold text-red-500 font-titleFont">
                      <span className="mr-1 italic font-bold">!</span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2 mdl:items-center">
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, checked: e.target.checked })
                    }
                    checked={formData.checked}
                    className="w-4 h-4 mt-1 cursor-pointer mdl:mt-0"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Orebi{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  className={`${
                    formData.checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm font-medium text-center font-titleFont">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="duration-300 hover:text-blue-600">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
