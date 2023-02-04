import { NodeResizer } from "@reactflow/node-resizer";
import { NodeProps, useStore, Dimensions, useReactFlow } from "reactflow";

import '@reactflow/node-resizer/dist/style.css';
import { useEffect, useState } from "react";
import { updateNodeSize, updateNodePosition } from "../../StateManaging/NodeStorage";

type sizeType = {
    height: number | string | null | undefined,
    width: number | string | null | undefined
}

export function Square({ selected, xPos, yPos, id } : NodeProps) {

    const [previousSize, setPreviousSize] = useState<sizeType>()

    let reactFlowInstance = useReactFlow()

    function previousSizeSetter() {
        let thisNode = reactFlowInstance.getNode(id)
        if (thisNode?.height !== undefined && thisNode?.width !== undefined) {
            setPreviousSize({
                height: thisNode?.height,
                width: thisNode?.width
            })
        } else {
            setPreviousSize({
                height: thisNode?.style?.height,
                width: thisNode?.style?.width
            })
        }
    }

    useEffect(() => {
        if (previousSize) {
            console.log(previousSize)
        }
    }, [previousSize])

    function updateSize(): void {
        let thisNode = reactFlowInstance.getNode(id)
        console.log(thisNode?.height + ' ' + thisNode?.width)
    }

    useEffect(() => {
        updateNodePosition(id, xPos, yPos)
    }, [xPos, yPos])

    return (
        <div className="w-full h-full min-w-[50px] min-h-[50px] bg-red-500 rounded-lg">
            <NodeResizer handleClassName='h-3 w-3 border-2 border-blue-400 bg-white rounded-md' 
                lineClassName="border-blue-400"
        minHeight={50} minWidth={50} onResizeStart={previousSizeSetter}
            onResizeEnd={() => updateSize()} isVisible={selected} />
        </div>
    )
}