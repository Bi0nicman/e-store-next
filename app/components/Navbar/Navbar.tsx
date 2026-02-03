"use client";
import Link from "next/link";
import { NAV_LINKS } from "../constants/nat";
import { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
export function Navbar() {

  const [showSearch, setShowSearch] = useState(false);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowSearch(false);
    }
  }, []);

  const triggerSearch = () => {
    setShowSearch(canShow => !canShow);
  }

  const closeSearch = () => setShowSearch(false);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, []);

  return (
    <header className="border-b border-purple-600 bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block size-2 rounded-full bg-purple-500" />
          Nebula
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {
            showSearch ? (
              <input
                type="text"
                className={[
                  "border-b-2 border-gray-300 bg-slate-900 px-3 py-1 text-sm text-white",
                  "placeholder-gray-400 focus:border-purple-600 focus:outline-none ",
                  styles.searchBar].join(" ")}
                placeholder="Search..."
                autoFocus
                onMouseDown={(e) => {
                  e.preventDefault();
                  closeSearch();
                }}
              />
            ) : (
              NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-semibold hover:underline">
                  {l.label}
                </Link>
              ))
            )
          }

          <div className="hidden lg:flex">
            <Link href="/login" className="text-sm text-purple-500 font-semibold hover:underline">
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {
          showSearch ?
            (
              <button
                type="button"
                aria-label="cancel search"
                className="rounded-md p-2 text-gray-200 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  closeSearch();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

            ) : (
              <button
                type="button"
                aria-label="Search"
                className="rounded-md p-2 text-gray-200 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  triggerSearch();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            )
        }

        {/* Mobile button */}

      </nav>

      {/* Mobile panel */}

    </header>
  );
}