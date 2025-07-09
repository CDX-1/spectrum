import { exists, create, open, BaseDirectory, readDir, readTextFile, mkdir } from '@tauri-apps/plugin-fs';

export class Server {
    id: string;
    name: string;
    desc: string;
    pinned: boolean;
    running: false;
    software: string;
    version: string;
    port: number;
    created_at: number;
    last_started: number;

    private constructor(id: string, name: string, desc: string, pinned: boolean, software: string, version: string, port: number, created_at: number, last_started: number) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.pinned = pinned;
        this.running = false;
        this.software = software;
        this.version = version;
        this.port = port;
        this.created_at = created_at;
        this.last_started = last_started;
    }

    async write(): Promise<void> {
        let file;

        if (!await exists('servers', {
            baseDir: BaseDirectory.AppLocalData
        })) {
            await mkdir('servers', {
                baseDir: BaseDirectory.AppLocalData,
            });
        }

        if (!await exists(`servers/${this.id}.server.json`, {
            baseDir: BaseDirectory.AppLocalData
        })) {
            file = await create(`servers/${this.id}.server.json`, {
                baseDir: BaseDirectory.AppLocalData
            });
        } else {
            file = await open(`servers/${this.id}.server.json`, {
                write: true,
                baseDir: BaseDirectory.AppLocalData
            });
        }

        const contents = JSON.stringify(this);
        await file.write(new TextEncoder().encode(contents));
        await file.close();
    }

    static of(name: string, desc: string, pinned: boolean, software: string, version: string, port: number, created_at: number, last_started: number) {
        const server = new Server(crypto.randomUUID(), name, desc, pinned, software, version, port, created_at, last_started);
        return server;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromJSON(json: any): Server {
        return new Server(
            json.id,
            json.name,
            json.desc,
            json.starred,
            json.software,
            json.version,
            json.port,
            json.created_at,
            json.last_started
        );
    }
}

export async function getServers(): Promise<Server[]> {
    if (!await exists('servers', {
        baseDir: BaseDirectory.AppLocalData
    })) {
        return [];
    }

    const entries = await readDir('servers', { baseDir: BaseDirectory.AppLocalData });
    const serverFiles = entries.filter(entry => entry.isFile && entry.name.toLowerCase().endsWith(".server.json"));
    
    const servers = await Promise.all(
        serverFiles.map(async (entry) => {
            const content = await readTextFile(`servers/${entry.name}`, {
                baseDir: BaseDirectory.AppLocalData
            });
            return Server.fromJSON(JSON.parse(content));
        })
    );

    return servers;
}
