import { atom } from "jotai";

import { storage, updateNodeSize } from "../NodeStorage";

const numberOfUndos = atom(1)

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

export function verifyIfCanUndo() : boolean {
    if (storage.get(numberOfUndos) > storage.get(HISTORY).length) {
        return false
    } else {
        return true
    }
}

export function verifyIfCanRedo() : boolean {
    if ((storage.get(numberOfUndos) - 1) > 0) {
        return true
    } else {
        console.log("Can't redo anymore")
        return false
    }
}

export function undoAction() {
    if (storage.get(HISTORY).length >= 1 && storage.get(HISTORY).length >= storage.get(numberOfUndos)) {
        const actionToUndoValues = storage.get(HISTORY)[storage.get(HISTORY).length - storage.get(numberOfUndos)]
        if (actionToUndoValues.usedFunction === 'Update Node Size') {
            undoSizeAction(actionToUndoValues)
        }
        storage.set(numberOfUndos, storage.get(numberOfUndos) + 1)
    }
}

export function redoAction() {
    if (storage.get(numberOfUndos) > 1) {
        const actionToUndoValues = storage.get(HISTORY)[storage.get(HISTORY).length - (storage.get(numberOfUndos) - 1)]
        if (actionToUndoValues.usedFunction === 'Update Node Size') {
            redoSizeAction(actionToUndoValues)
        }
        storage.set(numberOfUndos, storage.get(numberOfUndos) - 1)
    }
}

type sizeType = {
    height : number,
    width : number
}

function redoSizeAction(values : historyAction) : void {
    var size = values!.newValue as sizeType
    updateNodeSize(values.nodeId as string, size.height, size.width)
}

function undoSizeAction(values : historyAction) : void {
    var size = values!.oldValue as sizeType
    updateNodeSize(values.nodeId as string, size.height, size.width)
}