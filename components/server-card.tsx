'use client';

import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconServerCog } from "@tabler/icons-react";
import { Pin } from "lucide-react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

interface Server {
	id: string;
	name: string;
	desc: string;
	running: boolean;
	version: string;
	software: string;
	pinned: boolean;
}

interface ServerCardProps {
	server: Server;
	index: number;
}

export default function ServerCard({ server, index }: ServerCardProps) {
	const router = useRouter();

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 * (index + 1) }}
			onClick={() => router.push(`server/${server.id}`)}
			key={server.id}
		>
			<Card className="w-full hover:drop-shadow-sm">
				<CardContent className="flex justify-between items-center">
					<div className="flex space-x-4 items-center">
						<div className="bg-secondary p-2 rounded-4xl">
							<IconServerCog className="size-4" />
						</div>
						<div className="flex items-baseline space-x-4">
							<TypingAnimation
								className="font-light text-lg truncate w-48 font-times"
							>
								{server.name}
							</TypingAnimation>
							<TypingAnimation
								delay={1000}
								duration={20}
								className="text-sm text-muted-foreground dark:text-muted font-extralight truncate w-54 font-times"
							>
								{server.desc}
							</TypingAnimation>
						</div>
					</div>
					<div className="flex space-x-2 font-times">
						{server.software && <Badge>{server.software}</Badge>}
						{server.version && <Badge>{server.version}</Badge>}
						<Badge className="bg-orange-300">
							<Pin />
						</Badge>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
