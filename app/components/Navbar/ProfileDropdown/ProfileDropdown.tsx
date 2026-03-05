"use client";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { errorsLabels } from "./consts/const";
import { RootState } from "@/app/lib/store";

interface DropdownModalProps {
  onSignOut: () => Promise<void>;
}


export function ProfileDropdown({ onSignOut }: DropdownModalProps) {

  const [showProfileDropdown, setshowProfileDropdown] = useState(false);


  return (
    <div className="relative ml-3" onMouseEnter={() => setshowProfileDropdown(true)} onMouseLeave={() => setshowProfileDropdown(false)}>
      <button
        className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
      </button>

      {showProfileDropdown ? (
        <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-white/10 z-50 transition-all duration-100 ease-out">
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:outline-hidden">Your profile</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:outline-hidden">Settings</a>
          <a onClick={() => onSignOut()} href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:outline-hidden">Sign out</a>
        </div>) : null}
    </div>
  )
}

