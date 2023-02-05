import { atom } from "jotai";

import { storage, updateNodeSize } from "../NodeStorage";

type historyAction = {
    usedFunction ?: 'Update Node Size',
    nodeId ?: string,
    keys ?: string[],
    oldValue : unknown,
    newValue : unknown
}

export const HISTORY = atom<historyAction[]>([])

export function addHistoryNodeAction(historyAction : historyAction) {
    storage.set(HISTORY, (HISTORY) => [...HISTORY, historyAction])
    console.log(storage.get(HISTORY))
}

export function undoAction() {
    if (storage.get(HISTORY).length >= 1) {
        const actionToUndoValues = storage.get(HISTORY)[storage.get(HISTORY).length - 1]
        if (actionToUndoValues.usedFunction === 'Update Node Size') {
            undoSizeAction(actionToUndoValues)
        }
    }
}

function undoSizeAction(values : historyAction) : void {
    type sizeType = {
        height : number,
        width : number
    }
    var size = values!.oldValue as sizeType
    updateNodeSize(values.nodeId as string, size.height, size.width)
}