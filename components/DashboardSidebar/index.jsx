import React, { useContext } from "react";
import { AiOutlineMenuFold, AiOutlineSetting, AiOutlineGift } from "react-icons/ai";
import {
  RiDashboardLine,
  RiLockPasswordLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const DashboardSidebar = () => {
  // const { user, logout } = useContext(AuthContext);
  const route = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    route.push("/");
    // route.replace("/")
  };

  return (
    <div className="lg:w-[30%] w-full relative text-gray-800 ">
      <div className="flex flex-col divide-y-2 sticky top-0 bg-white px-5 py-3 rounded-sm ">
        <div className="flex justify-center mb-2">
          <h3>Melaku Birhanu</h3>
        </div>
        {/* {user?.photoURL ?
          <div className="flex justify-center mb-2">
            <img className="h-[70px] w-[70px] rounded-full" src={user?.photoURL} alt="profile" />
          </div>
          : null} */}
        <Link href="/profile" className="dashboard-link">
          <span className="border rounded-full p-1">
            <RiDashboardLine />
          </span>
          Dashboard
        </Link>
        <Link href="/profile/package" className="dashboard-link">
          <span className="border rounded-full p-1">
            <AiOutlineMenuFold />
          </span>
          My Package
        </Link>
        <Link href="/profile/updateprofile" className="dashboard-link">
          <span className="border rounded-full p-1">
            <AiOutlineSetting />
          </span>
          Update Profile
        </Link>
        <Link href="/profile/changepassword" className="dashboard-link">
          <span className="border rounded-full p-1">
            <RiLockPasswordLine />{" "}
          </span>{" "}
          Change Password
        </Link>
        <button onClick={handleLogout} className="dashboard-link">
          <span className="border rounded-full p-1">
            <RiLogoutCircleLine />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
