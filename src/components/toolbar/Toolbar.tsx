import { ReactComponentElement, ReactNode } from "react";

interface ToolbarProps {
    children : ReactNode
}

export function Toolbar({children} : ToolbarProps) {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 h-20 w-96 bg-white rounded-2xl shadow-lg
            border border-zinc-300 px-8 flex items-center
        ">
            {children}
        </div>
    )
}