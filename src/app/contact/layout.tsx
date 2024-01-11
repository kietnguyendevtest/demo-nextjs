import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact page",
    description: "Website created by NMK",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
