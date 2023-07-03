'use client'
import React, { useEffect, useState } from "react";

import { BiPhoneCall } from "react-icons/bi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";

const StaticPath = process.env.REACT_APP_STATIC;

const UpdateProfile = () => {
    const [user, setUser] = useState({
        email: "user@exxample.com",
        name: "Jhon Don",
        phoneNumber: "0911111111"
    })
    //   const { user, updateUser } = useContext(AuthContext);

    const formData = new FormData();

    const handleUpdateProfile = (d: any) => {
        updateUserData(d);
        //   Upload Image
        // formData.append("file", d?.photoURL[0], user?.uid);

        // fileinstace
        //   .post(`/profileupdate?email=${user?.email}`, formData)
        //   .then((res) => {
        //     if (res?.data?.success) {
        //       const userData = {
        //         displayName: d.username,
        //         photoURL: StaticPath + "profile/" + res.data.url,
        //         phoneNumber: d.phone,
        //       };
        //       console.log(userData)
        //       updateUserData(userData);
        //     }
        //   })
        //   .catch((err) => {
        //     toast.error("Something went wrong");
        //   });

        // axios({
        //   method: "post",
        //   url: `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_Image_Host_API}`,
        //   data: formData,
        // })
        //   .then((res) => {
        //     if (res?.data?.success) {
        //       const userData = {
        //         displayName: d.username,
        //         photoURL: res.data.data.url,
        //         phoneNumber: d.phone,
        //       };
        //       console.log(userData);
        //       updateUserData(userData);
        //     }
        //   })
        //   .catch((error) => console.error(error));
    };

    const updateUserData = (data: any) => {
        console.log(data)
        // updateUser(data)
        //   .then((res) => toast.success("Profile Updated!"))
        //   .catch((err) => {
        //     console.error(err);
        //     return toast.error(err.message);
        //   });
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 p-5">
            <h4 className="text-base text-gray-700 font-semibold leading-none">
                Update Profile
            </h4>
            <form
                onSubmit={handleUpdateProfile}
                className="lg:w-[80%] mx-auto border rounded-md p-5 flex flex-col gap-3 "
            >
                {/* Email */}
                <div>
                    <label htmlFor="firstname" className="tori-label">
                        Email
                    </label>
                    <div className="tori-input-wrapper">
                        <MdEmail />
                        <input
                            readOnly
                            type="email"
                            defaultValue={user?.email}
                            className="tori-input border-none"
                            required
                        />
                    </div>
                </div>

                {/* name */}
                <div>
                    <label htmlFor="firstname" className="tori-label">
                        User Name
                    </label>
                    <div className="tori-input-wrapper">
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            defaultValue={user?.name}
                            placeholder="Your Name"
                            className="tori-input border-none"
                            required
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="firstname" className="tori-label">
                        Phone Number
                    </label>
                    <div className="tori-input-wrapper">
                        <BiPhoneCall />
                        <input
                            type="text"
                            defaultValue={user?.phoneNumber}
                            placeholder="Your Phone Number"
                            className="tori-input border-none"
                            required
                        />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="firstname" className="tori-label">
                        Image
                    </label>
                    <div className="tori-input-wrapper">
                        <HiOutlinePhotograph />
                        <input
                            type="file"
                            placeholder="Your Photo"
                            className="tori-input border-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="tori-btn-secondary">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
