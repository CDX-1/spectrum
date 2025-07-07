'use client';

import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { Pin } from "lucide-react";
import { motion } from 'framer-motion';

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
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 * (index + 1) }}
			viewport={{ once: true }}
			key={server.id}
		>
			<Card className="w-full hover:drop-shadow-sm">
				<CardContent className="flex justify-between items-center">
					<div className="flex space-x-4 items-center">
						<Button variant="secondary" size="icon" className="size-8">
							{server.running ? <IconPlayerPlay /> : <IconPlayerPause />}
						</Button>
						<div className="flex items-baseline space-x-4">
							<TypingAnimation
								className="font-light text-lg truncate w-48"
								style={{ fontFamily: '"Times New Roman", Times, serif' }}
							>
								{server.name}
							</TypingAnimation>
							<TypingAnimation
								delay={1000}
								duration={20}
								className="text-sm text-muted-foreground dark:text-muted font-extralight truncate w-54"
								style={{ fontFamily: '"Times New Roman", Times, serif' }}
							>
								{server.desc}
							</TypingAnimation>
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="flex space-x-2"
					>
						{server.software && <Badge>{server.software}</Badge>}
						{server.version && <Badge>{server.version}</Badge>}
						<Badge className="bg-orange-300">
							<Pin />
						</Badge>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
