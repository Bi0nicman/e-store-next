"use client";
import Link from "next/link";
import { NAV_LINKS } from "../../lib/constants/navbar";
import { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useSearchGamesQuery } from "@/app/lib/services/gamesApi";
import { useAppSelector } from "@/app/lib/hooks";
import { SignInModal } from "./modalSignIn/SignIn";
import { authenticateUser, fetchCurrentUser, logoutUser } from "@/app/lib/services/eStoreApi";
import { useDispatch } from "react-redux";
import { storeUser, clearUser } from "@/app/lib/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import { SearchInput } from "./Searchbar/SearchInput";

export function Navbar() {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selector = useAppSelector((state) => state.favourites);
  const { data: searchResults, isFetching } = useSearchGamesQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const user = useSelector((state: RootState) => state.user);
  const isUserAuthenticated = user.length > 0;
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowSearch(false);
      setSearchTerm("");
    }
  }, []); const triggerSearch = () => {
    setShowSearch(canShow => !canShow);
    if (showSearch) {
      setSearchTerm("");
    }
  }

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  const handleUserData = async () => {
    try {
      const loggedUserData = await fetchCurrentUser();
      dispatch(storeUser(loggedUserData));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Qui puoi gestire l'errore, ad esempio mostrando una notifica o forzando il logout
    }
  }

  const handleSignIn = async (formData: FormData) => {
    await authenticateUser(formData);
    // Dopo il login, recupera i dati completi dell'utente
    await handleUserData();
    // Qui puoi aggiungere: redirect, toast notification, ecc.
  }

  const handleSignOut = async () => {
    await logoutUser();
    dispatch(clearUser());
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [onKeyDown]);

  useEffect(() => {
    // Verifica sessione solo al mount iniziale e solo se NON è già autenticato
    if (!isUserAuthenticated) {
      handleUserData();
    }
  }, []); // Array vuoto = esegue solo al mount

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
          {!showSearch && NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold hover:underline">
              {l.label}
            </Link>
          ))}

          {isUserAuthenticated ? (
            <span className="text-sm text-green-400 font-semibold">
              Welcome, {user[0].username}!
            </span>
          ) : (
            <div className="hidden lg:flex">
              <SignInModal onSignIn={handleSignIn} />
            </div>
          )}
        </div>

        <SearchInput
          showSearch={showSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          closeSearch={closeSearch}
          triggerSearch={triggerSearch}
          isFetching={isFetching}
          searchResults={searchResults}
        />
        <span className="text-sm bg-purple-900 px-2 py-1 font-bold rounded">
          {selector.length} {selector.length === 1 ? "favorite" : "favorites"}
        </span>
        {
          isUserAuthenticated ?
          <ProfileDropdown onSignOut={handleSignOut} /> : null
        }


      </nav>

      {/* Mobile panel */}

    </header>
  );
}