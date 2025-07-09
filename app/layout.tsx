import type { Metadata } from "next";
import "./globals.css";
import Titlebar from "@/components/titlebar";

export const metadata: Metadata = {
	title: "Spectrum",
	description: "A Minecraft server management program",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={``}
			>
				<div
					className="p-2"
				>
					<Titlebar />
					{children}
				</div>
			</body>
		</html>
	);
}
