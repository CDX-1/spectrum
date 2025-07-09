import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { open } from '@tauri-apps/plugin-shell';

export default function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex space-x-2 items-center"
        >
            <p
                className="font-medium text-xs font-times"
            >
                Developed by CDX
            </p>
            <Button variant="link" size="icon" className="hover:text-orange-400/50" onClick={() => {
                open("https://github.com/CDX-1")
            }}>
                <IconBrandGithub />
            </Button>
        </motion.div>
    );
}