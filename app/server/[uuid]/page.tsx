import ServerDock from "@/components/server-dock";

export default async function ServerPage({ params }: { params: { uuid: string } }) {
    const { uuid } = await params;

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen space-y-4 mb-10">
                <h1>{uuid}</h1>
            </div>
            <ServerDock />
        </>
    )
}