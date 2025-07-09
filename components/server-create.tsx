'use client';

import React, { useState } from "react";
import { Button } from "./ui/button";
import { DialogTitle, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { Server } from "@/lib/data";
import { toast } from "sonner";
import { DialogTrigger } from "@radix-ui/react-dialog";

type ServerCreateProps = {
    refreshServers?: () => void;
};

export default function ServerCreate({ refreshServers }: ServerCreateProps): React.ReactNode {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [isSoftwareOpen, setSoftwareOpen] = useState(false);
    const [software, setSoftware] = useState("");
    const [isVersionOpen, setVersionOpen] = useState(false);
    const [version, setVersion] = useState("");
    const [port, setPort] = useState("");

    const softwares = [
        {
            value: "paper",
            label: "Paper",
            versions: ["1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1"]
        },
        {
            value: "spigot",
            label: "Spigot",
            versions: ["1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1"]
        },
        {
            value: "forge",
            label: "Forge",
            versions: ["1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1", "1.8"]
        }
    ];

    function getVersions() {
        if (software != "") {
            return softwares.filter(s => s.value === software)[0].versions;
        } else {
            return [];
        }
    }

    function reset() {
        setName("");
        setDesc("");
        setSoftware("");
        setVersion("");
    }

    async function create() {
        if (name.trim() === "") {
            toast.error("Server name is required!");
            return;
        }

        if (desc.trim() === "") {
            toast.error("Server description is required!");
            return;
        }

        if (software === "") {
            toast.error("Please select a server software!");
            return;
        }

        if (version === "") {
            toast.error("Please select a version!");
            return;
        }

        if (port.trim() === "" || isNaN(parseInt(port))) {
            toast.error("Please enter a valid port number!");
            return;
        }

        try {
            const server = Server.of(
                name,
                desc,
                false,
                software,
                version,
                parseInt(port),
                Date.now(),
                0
            );

            await server.write();
            toast.success("Server created successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to create server!");
            console.error(error);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new server</DialogTitle>
                <DialogDescription>Select the properties of the server</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label>Server Name</Label>
                    <Input id="name" name="name" placeholder="1.8 PVP" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label>Server Description</Label>
                    <Input id="desc" name="desc" placeholder="1.8 combat for friends" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label>Server Software & Version</Label>
                    <div className="flex space-x-4">
                        <Popover open={isSoftwareOpen} onOpenChange={setSoftwareOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={isSoftwareOpen}
                                    className="w-[200px] justify-between"
                                >
                                    {software
                                        ? softwares.find((s) => s.value === software)?.label
                                        : "Select software..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search softwares..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No software found.</CommandEmpty>
                                        <CommandGroup>
                                            {softwares.map((s) => (
                                                <CommandItem
                                                    key={s.value}
                                                    value={s.value}
                                                    onSelect={(current) => {
                                                        setSoftware(current === software ? "" : current);
                                                        setVersion("");
                                                        setSoftwareOpen(false);
                                                    }}
                                                >
                                                    {s.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            software === s.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Popover open={isVersionOpen} onOpenChange={setVersionOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    disabled={software === ""}
                                    aria-expanded={isVersionOpen}
                                    className="w-[200px] justify-between"
                                >
                                    {version
                                        ? getVersions().find((v) => v === version)
                                        : "Select version..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search versions..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No version found.</CommandEmpty>
                                        <CommandGroup>
                                            {getVersions().map((v) => (
                                                <CommandItem
                                                    key={v}
                                                    value={v}
                                                    onSelect={(current) => {
                                                        setVersion(current === version ? "" : current);
                                                        setVersionOpen(false);
                                                    }}
                                                >
                                                    {v}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            version === v ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid gap-3">
                    <Label>Server Port</Label>
                    <Input id="port" name="port" placeholder="25565" value={port} onChange={(e) => setPort(e.target.value)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" onClick={reset}>Cancel</Button>
                </DialogClose>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={() => {
                        create();
                        reset();
                        refreshServers?.();
                    }}>Create</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    );
}