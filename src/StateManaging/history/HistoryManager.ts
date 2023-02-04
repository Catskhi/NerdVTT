import { atom } from "jotai";

import { storage } from "../NodeStorage";

type historyAction = {
    usedFunction ?: String,
    nodeId ?: string
    oldValue : unknown,
    newValue : unknown
}

export const HISTORY = atom<historyAction[]>([])

export function addHistoryNodeAction(historyAction : historyAction) {
    storage.set(HISTORY, (HISTORY) => [...HISTORY, historyAction])
}

