import { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";

import { ToastContainer } from "react-toastify";

// import "@/assets/css/reset.css";
import "@/assets/css/base.css";
import "@/assets/css/content.scss";

export const metadata: Metadata = {
    title: "Home",
    description: "Website created by NMK",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppHeader />

                <div className="content">{children}</div>

                <AppFooter />

                <ToastContainer />
            </body>
        </html>
    );
}
