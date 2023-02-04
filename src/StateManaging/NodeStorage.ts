import { createStore } from "jotai";
import { Node } from "reactflow";
import { NODES } from "./Atoms";
import { addHistoryNodeAction } from "./history/HistoryManager";

export const storage = createStore()

export function updateNodesList(newNode : Node) {
    storage.set(NODES, (NODES) => [...NODES, newNode])
    storage.sub(NODES, () => {
        console.log(`New node added: ${storage.get(NODES)}`)
    })
}

export function updateNodeSize(nodeId : string, height : number, width : number) : void {
    storage.get(NODES).map((node) => {
        if (node.id == nodeId) {
            addHistoryNodeAction({
                usedFunction : 'updateNodeSize', 
                nodeId : nodeId, 
                oldValue : { height: node.height, width: node.width }, 
                newValue : { height: height, width: node.width }
            })
            node.style = { width : width, height : height }
            console.log(height + ' ' + width)
        }
    })
}

export function updateNodePosition(nodeId : string, xPos : number, yPos : number) : void {
    storage.get(NODES).map((node) => {
        if (node.id == nodeId) {
            node.position = { x: xPos, y: yPos}
        }
    })
}

// export function updateNodeSize()