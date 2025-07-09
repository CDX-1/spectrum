'use client';

import { getCurrentWindow } from '@tauri-apps/api/window';
import { Button } from './ui/button';
import { Maximize, Minus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Titlebar() {
    const router = useRouter();

    const minimize = () => getCurrentWindow().minimize();
    const maximize = () => getCurrentWindow().toggleMaximize();
    const close = () => getCurrentWindow().close();

    return (
        <div className="fixed left-2 top-2 right-2 z-10">
            <div
                className="h-10 bg-secondary backdrop-blur-sm flex items-center justify-between px-4 border-1 drop-shadow-xs rounded-sm"
                data-tauri-drag-region
            >
                <Button variant="link" size="icon" className="pl-8" onClick={() => router.push("/")}>
                    Spectrum
                </Button>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="hover:bg-secondary hover:text-orange-400" onClick={minimize}><Minus /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-secondary hover:text-orange-400" onClick={maximize}><Maximize /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-secondary hover:text-orange-400" onClick={close}><X /></Button>
                </div>
            </div>
        </div>
    );
}