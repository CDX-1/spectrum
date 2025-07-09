'use client';

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { IconHome, IconPlug, IconSettings, IconTerminal2 } from "@tabler/icons-react";

export default function ServerDock() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
    const dockRef = useRef<HTMLDivElement>(null);
    const initialPosition = useRef({ x: 0, y: 0 });
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        if (dockRef.current) {
            const dockRect = dockRef.current.getBoundingClientRect();
            const x = window.innerWidth / 2 - dockRect.width / 2;
            const y = window.innerHeight - dockRect.height - 16;
            setPosition({ x, y });
            initialPosition.current = { x, y };
        }
    }, []);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        document.body.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    };

    const onMouseUp = () => {
        setDragging(false);
        document.body.style.userSelect = "";
        setTransitioning(true);
        setPosition(initialPosition.current);
    };

    useEffect(() => {
        if (!transitioning) return;
        const timeout = setTimeout(() => setTransitioning(false), 300);
        return () => clearTimeout(timeout);
    }, [transitioning]);

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [dragging]);

    return (
        <div
            ref={dockRef}
            className={`fixed z-10 ${transitioning ? "transition-all duration-400 ease-out" : ""}`}
            style={{ left: position.x, top: position.y, cursor: dragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
        >
            <div
                className="h-10 bg-secondary backdrop-blur-sm flex items-center px-6 border-1 drop-shadow-md rounded-xl"
            >
                <div className="flex gap-1">
                    <Button variant="link" size="icon" className="hover:text-orange-400 hover:scale-150"><IconHome /></Button>
                    <Button variant="link" size="icon" className="hover:text-orange-400 hover:scale-150"><IconTerminal2 /></Button>
                    <Button variant="link" size="icon" className="hover:text-orange-400 hover:scale-150"><IconPlug /></Button>
                    <Button variant="link" size="icon" className="hover:text-orange-400 hover:scale-150"><IconSettings /></Button>
                </div>
            </div>
        </div>
    );
}