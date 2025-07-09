import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Settings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="drop-shadow-xs rounded-4xl hover:text-orange-400 hover:no-underline font-times">
                    <IconAdjustmentsHorizontal />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}