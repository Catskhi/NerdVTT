import { NodeResizer } from "@reactflow/node-resizer";
import { NodeProps, useStore, Dimensions, useReactFlow } from "reactflow";

import '@reactflow/node-resizer/dist/style.css';
import { useEffect, useState } from "react";
import { updateNodeSize, updateNodePosition } from "../../StateManaging/NodeStorage";
import { addHistoryNodeAction, removeTimelineConflicts } from "../../StateManaging/history/HistoryManager";

export type sizeType = {
    height: number | string | null | undefined,
    width: number | string | null | undefined
}

export function Square({ selected, xPos, yPos, id } : NodeProps) {
    let reactFlowInstance = useReactFlow()

    const [previousSize, setPreviousSize] = useState<sizeType>()
    const [newSize, setNewSize] = useState<sizeType>()
    
    function previousSizeSetter() {
        let thisNode = reactFlowInstance.getNode(id)
        if (thisNode?.height !== undefined && thisNode?.width !== undefined) {
            const newPreviousSize : sizeType = {
                height: thisNode?.height,
                width: thisNode?.width
            }
            return newPreviousSize
        } else {
            const newPreviousSize = {
                height: thisNode?.style?.height,
                width: thisNode?.style?.width
            }
            return newPreviousSize
        }
    }

    function getNewSize() {
        let thisNode = reactFlowInstance.getNode(id)
        const newNewSize = {
            height: thisNode?.height,
            width: thisNode?.width
        }
        return newNewSize
    }

    useEffect(() => {
        if (previousSize && newSize) {
            if (previousSize?.height == newSize?.height && previousSize.width == newSize.width) {
                    return
            }
            updateNodeSize(id, newSize.height as number, newSize.width as number)
            addHistoryNodeAction({
                usedFunction: 'Update Node Size', nodeId: id,
                oldValue: previousSize,
                newValue: newSize,
            })
        }
    }, [previousSize, newSize])

    useEffect(() => {
        updateNodePosition(id, xPos, yPos)
    }, [xPos, yPos])

    return (
        <div className="w-full h-full min-w-[50px] min-h-[50px] bg-red-500 rounded-lg">
            <NodeResizer handleClassName='h-3 w-3 border-2 border-blue-400 bg-white rounded-md' 
                lineClassName="border-blue-400"
        minHeight={50} minWidth={50} onResizeStart={() => setPreviousSize(previousSizeSetter)}
            onResizeEnd={() => setNewSize(getNewSize)} isVisible={selected} />
        </div>
    )
}