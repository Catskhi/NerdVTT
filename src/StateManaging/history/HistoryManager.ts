import { atom } from "jotai";

import { storage } from "../NodeStorage";

type historyAction = {
    usedFunction ?: String,
    nodeId ?: string,
    keys ?: string[],
    oldValue : unknown,
    newValue : unknown
}

export const HISTORY = atom<historyAction[]>([])

export function addHistoryNodeAction(historyAction : historyAction) {
    storage.set(HISTORY, (HISTORY) => [...HISTORY, historyAction])
}

export function undoAction() {
    if (storage.get(HISTORY).length >= 1) {
        console.log(storage.get(HISTORY)[-1])
    }
}

