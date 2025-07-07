'use client';

import { IconStar } from '@tabler/icons-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useRouter } from 'next/navigation';

export default function Serverbar() {
    const router = useRouter();

    const servers = [
        {
            id: "huifh3gfhuie",
            name: "Cool Server",
            starred: true
        },
        {
            id: "htrhbgfdb",
            name: "Better Server",
            starred: false
        },
        {
            id: "tf43t34h5t",
            name: "dih heh",
            starred: false
        }
    ]

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Spectrum</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => router.push(`/`)}>
                                    <span>Home</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Servers</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {servers.map((item) => (
                            <SidebarMenu key={item.id}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={() => router.push(`/server/${item.id}`)}>
                                        <span>{item.name}</span>
                                        {item.starred && <IconStar />}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}