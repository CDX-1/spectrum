'use client';

import { getCurrentWindow } from '@tauri-apps/api/window';
import { Button } from './ui/button';
import { Maximize, Minus, X } from 'lucide-react';

export default function Titlebar() {
    const minimize = () => getCurrentWindow().minimize();
    const maximize = () => getCurrentWindow().toggleMaximize();
    const close = () => getCurrentWindow().close();

    return (
        <div className="fixed left-1 top-1 right-1 z-10">
            <div
                className="h-10 bg-[#f5f4ed] backdrop-blur-sm flex items-center justify-between px-4 border-1 drop-shadow-xs rounded-sm"
                data-tauri-drag-region
            >
                <p
                    className="text-lg font-medium"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                    Spectrum
                </p>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="hover:bg-[#f5f4ed] hover:text-orange-400" onClick={minimize}><Minus /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-[#f5f4ed] hover:text-orange-400" onClick={maximize}><Maximize /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-[#f5f4ed] hover:text-orange-400" onClick={close}><X /></Button>
                </div>
            </div>
        </div>
    );
}