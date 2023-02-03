import { NodeResizer } from "@reactflow/node-resizer";
import { NodeProps, Handle, Position } from "reactflow";

import '@reactflow/node-resizer/dist/style.css';
import { useEffect } from "react";
import { updateNodePosition } from "../../StateManaging/NodeStorage";

export function Square({ selected, xPos, yPos, id } : NodeProps) {

    useEffect(() => {
        updateNodePosition(id, xPos, yPos)
    }, [xPos, yPos])

    // console.log(xPos + ' ' + yPos)

    return (
        <div className="w-full h-full min-w-[50px] min-h-[50px] bg-red-500 rounded-lg">
            <NodeResizer handleClassName='h-3 w-3 border-2 border-blue-400 bg-white rounded-md' 
                lineClassName="border-blue-400"
            minHeight={50} minWidth={50} isVisible={selected} />
        </div>
    )
}