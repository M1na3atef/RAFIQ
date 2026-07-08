import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUserData } from "@/services/patientService";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logoutUser } from "@/services/authService";
import logo from "@/assets/images/logo.png";
import {
  Bell,
  CircleUserRound,

  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function Navbar() {

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const loadData = async () => {

      if (!currentUser) return;

      const data = await getUserData(currentUser.uid);

      setUserData(data);

    };

    loadData();

  }, [currentUser]);

  const handleLogout = async () => {

    await logoutUser();

    navigate("/login");

  };
  return (

    <header className="h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <img

          src={logo}

          alt="RAFIQ"

          className="w-10 h-10 object-contain"

        />

        <div>

          <h1 className="font-bold text-xl whitespace-nowrap" style={{fontFamily: "'Cormorant Garamond', serif",fontWeight: "700"}}>

            RAFIQ

          </h1>

          <p className="hidden lg:block text-xs text-slate-500">

            Responsive Ai For Independent Quality-of-life

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3 md:gap-6">



        <Bell className="cursor-pointer hover:text-blue-600 transition" />

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100 transition">

              <CircleUserRound className="w-8 h-8" />

              <span className="hidden md:block font-medium">

                {

                  userData?.patient?.fullName ||

                  currentUser?.email

                }

              </span>

              <ChevronDown className="hidden md:block w-4 h-4" />

            </button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">

            <div className="px-2 py-2">

              <p className="font-medium">

                {

                  userData?.patient?.fullName ||

                  "Patient"

                }

              </p>

              <p className="text-xs text-slate-500 truncate">

                {currentUser?.email}

              </p>

            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/patient")}>

              My Profile

            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/settings")}>

              Settings

            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem

              onClick={handleLogout}

              className="text-red-600"

            >

              Logout

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>

  );
}

export default Navbar;