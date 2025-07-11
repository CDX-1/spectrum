'use client';

import ServerCard from "@/components/server-card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getServers, Server } from "@/lib/data";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function useServers() {
	const [loading, setLoading] = useState(false);
	const [servers, setServers] = useState<Server[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadServers = async () => {
			try {
				setLoading(true);
				setError(null);
				const serverData = await getServers();
				setServers(serverData);
			} catch (err) {
				console.error("Failed to load servers: ", err);
				setError("Failed to load servers");
				setServers([]);
			} finally {
				setLoading(false);
			}
		};

		loadServers();
	}, []);

	const refreshServers = async () => {
		try {
			setError(null);
			const serverData = await getServers();
			setServers(serverData);
		} catch (err) {
			console.error("Failed to load servers: ", err);
			setError("Failed to load servers");
		}
	};

	return {
		servers,
		loading,
		error,
		refreshServers
	};
}

export default function Home() {
	const { servers, loading, error, refreshServers } = useServers()

	useEffect(() => {
		refreshServers();
	}, [refreshServers]);

	return (
		<div className="flex flex-col items-center justify-center space-y-6" style={{ minHeight: "calc(100vh - 2.5rem)" }}>
			<Header refreshServers={refreshServers} />
			<div className="flex flex-col space-y-3 w-2xl">
				{servers.map((server, i) => (
					<ServerCard key={server.id} server={server} index={i} />
				))}
			</div>
			{loading ? <Spinner /> :
				servers.length === 0 && (
					<TypingAnimation
						className="text-md font-medium"
						delay={200}
						duration={50}
					>
						You have no servers! Try making some!
					</TypingAnimation>
				)
			}
			{error !== null &&
				<TypingAnimation
					className="text-md font-medium"
					delay={200}
					duration={50}
				>
					{error}
				</TypingAnimation>
			}
			<Footer />
		</div>
	);
}
