import Navbar from "@/Components/Navbar";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import { useEffect } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const navItems = [
        {
            name: "chat",
            label: "Chat",
        },
        {
            name: "profile.edit",
            label: "Profile",
        },
    ];

    useEffect(() => {
        console.log("Authenticated Layout mounted");
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar navLinks={navItems} />
            {/* {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )} */}

            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: "flex", minHeight: "86dvh" }}>
                    <Box
                        component="main"
                        className="MainContent"
                        sx={{ flex: 1 }}
                    >
                        {children}
                    </Box>
                </Box>
            </CssVarsProvider>
        </div>
    );
}
