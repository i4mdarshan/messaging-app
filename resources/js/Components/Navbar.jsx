import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { LogoutOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";

export default function Navbar({ navLinks }) {
    const page = usePage();
    const user = page.props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-6">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div> */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {navLinks?.map((navLink) => {
                                    return (
                                        <NavLink
                                            href={route(navLink.name)}
                                            active={route().current(
                                                navLink.name
                                            )}
                                            key={navLink.name}
                                        >
                                            {navLink.label}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center xs:ms-6 xs:flex xs:items-center">
                            <div className="relative ms-3">
                                <div className="mt-2 sm:mt-0 flex justify-center sm:justify-end items-center gap-2 text-gray-900">
                                    <div className="">
                                        <Typography variant="h5">
                                            Hi, {user.name}
                                        </Typography>
                                    </div>

                                    <NavLink
                                        underline="none"
                                        color="primary"
                                        aria-label="logout"
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <LogoutOutlined />
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {navLinks?.map((navLink) => {
                            return (
                                <ResponsiveNavLink
                                    href={route(navLink.name)}
                                    active={route().current(navLink.name)}
                                    key={navLink.name}
                                >
                                    {navLink.label}
                                </ResponsiveNavLink>
                            );
                        })}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
