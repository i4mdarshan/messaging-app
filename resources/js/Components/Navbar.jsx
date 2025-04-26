import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { LogoutOutlined } from "@mui/icons-material";
import {
    Avatar,
    Divider,
    Dropdown,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Typography,
} from "@mui/joy";

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
                            <Dropdown>
                                <MenuButton
                                    slots={{ root: Avatar }}
                                    slotProps={{
                                        root: {
                                            size: "md",
                                            color: "neutral",
                                            variant: "outlined",
                                            className:
                                                "hover:shadow-md transition-shadow duration-200",
                                        },
                                    }}
                                >
                                    D
                                </MenuButton>

                                <Menu
                                    placement="bottom-end"
                                    sx={{
                                        minWidth: 140,
                                        borderRadius: "12px",
                                        boxShadow: "var(--joy-shadow-md)",
                                        padding: "0.5rem",
                                        zIndex: 1200,
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            opacity: 1,
                                            cursor: "default",
                                            backgroundColor: "transparent",
                                            paddingY: "6px", // softer vertical padding
                                            paddingX: "8px",
                                            color: "text-gray-800",
                                            fontWeight: "md",
                                            fontSize: "md",
                                        }}
                                    >
                                        {"Hi, " + user.name}
                                    </MenuItem>

                                    <Divider className="my-1" />

                                    {navLinks?.map((navLink) => {
                                        return (
                                            <MenuItem
                                                component={ResponsiveNavLink}
                                                key={
                                                    "responsive_" + navLink.name
                                                }
                                                className="text-xs text-gray-700 hover:bg-gray-100"
                                                href={route(navLink.name)}
                                                active={route().current(
                                                    navLink.name
                                                )}
                                            >
                                                {navLink.label}
                                            </MenuItem>
                                        );
                                    })}

                                    <Divider className="my-1" />

                                    <MenuItem
                                        color="danger"
                                        className="text-xs font-medium"
                                        component={ResponsiveNavLink}
                                        method="post"
                                        href={route("logout")}
                                    >
                                        Log Out
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
