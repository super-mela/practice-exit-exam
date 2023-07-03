'use client'
import React, { useState } from "react";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";


const ChangePassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleChangePassword = () => {
        alert('Password Changed')
        // changePassword(d.password)
        //   .then((res) => toast.success("Password Changed!"))
        //   .catch((err) => {
        //     console.error(err);
        //     return toast.error("Something Went Wrong!");
        //   });
    };
    return (
        <div className="bg-white w-full flex flex-col gap-5 p-5">
            <h4 className="text-base text-gray-700 font-semibold leading-none">
                Change Password
            </h4>

            <form
                onSubmit={handleChangePassword}
                className="lg:w-[80%] mx-auto border rounded-md p-5 flex flex-col gap-3 "
            >
                {/* Email */}
                <div>
                    <label htmlFor="firstname" className="tori-label">
                        New Password
                    </label>
                    <div>
                        <div className="tori-input-wrapper">
                            <RiLockPasswordFill />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="tori-input border-none"
                                required
                            // {...register("password", {
                            //   required: "Password is required!",
                            //   validate: {
                            //     upperCase: (value) =>
                            //       /.*?[A-Z]/.test(value) ||
                            //       "Must have at least one uppercase character!",
                            //     lowerCase: (value) =>
                            //       /.*?[a-z]/.test(value) ||
                            //       "Must have at least one lowercase character!",
                            //     digit: (value) =>
                            //       /.*?[0-9]/.test(value) || "At least one digit!",
                            //     specialCharacter: (value) =>
                            //       /.*?[#?!@$%^&*-]/.test(value) ||
                            //       "Must have at least one special character!",
                            //     minlength: (value) =>
                            //       /.{8,}/.test(value) || "Must be 8 characters long!",
                            //   },
                            // })}
                            />
                            {showPassword ? (
                                <AiTwotoneEyeInvisible
                                    onClick={() => setShowPassword(false)}
                                    className="icon text-black/60"
                                />
                            ) : (
                                <AiFillEye
                                    onClick={() => setShowPassword(true)}
                                    className="icon text-black/60"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="tori-btn-secondary">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
