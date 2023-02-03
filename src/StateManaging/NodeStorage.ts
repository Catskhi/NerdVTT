import { createStore } from "jotai";
import { Node } from "reactflow";
import { NODES } from "./Atoms";

export const storage = createStore()

export function updateNodesList(newNode : Node) {
    storage.set(NODES, (NODES) => [...NODES, newNode])
    storage.sub(NODES, () => {
        console.log(`New node added: ${storage.get(NODES)}`)
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