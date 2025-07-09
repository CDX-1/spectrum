'use client';

import { motion } from "framer-motion";
import { TypingAnimation } from "./magicui/typing-animation";
import { Button } from "./ui/button";
import { IconPlus, IconReload } from "@tabler/icons-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ServerCreate from "./server-create";
import React from "react";
import Settings from "./settings";

type HeaderProps = {
    refreshServers?: () => void;
};

export default function Header({ refreshServers }: HeaderProps): React.ReactNode {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
        >
            <TypingAnimation
                className="text-4xl font-light font-times"
                duration={50}
            >
                Welcome, select a server
            </TypingAnimation>
            <div className="flex space-x-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="drop-shadow-xs rounded-4xl hover:text-orange-400 hover:no-underline font-times">
                            <IconPlus />
                            Create
                        </Button>
                    </DialogTrigger>
                    <ServerCreate refreshServers={refreshServers} />
                </Dialog>
                <Button variant="link" className="drop-shadow-xs rounded-4xl hover:text-orange-400 hover:no-underline font-times" onClick={refreshServers}>
                    <IconReload />
                    Refresh
                </Button>
                <Settings />
            </div>
        </motion.div>
    );
}
