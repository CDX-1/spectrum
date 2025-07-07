'use client';

import { motion } from "framer-motion";
import { TypingAnimation } from "./magicui/typing-animation";
import { Button } from "./ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ServerCreate from "./server-create";
import { Sun } from "lucide-react";

export default function Header() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
        >
            <div className="flex items-center space-x-4 pb-2">
                <Sun className="text-orange-400/50 size-8" />
                <TypingAnimation
                    className="text-4xl font-light"
                    duration={50}
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                    Welcome, select a server
                </TypingAnimation>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="drop-shadow-xs rounded-4xl hover:bg-orange-400/50">
                        <IconPlus />
                        Create new
                    </Button>
                </DialogTrigger>
                <ServerCreate />
            </Dialog>
        </motion.div>
    );
}
