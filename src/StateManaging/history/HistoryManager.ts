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
const currentIndexInHistory = atom<number>(0)
const undid = atom<boolean>(false)

export function addHistoryNodeAction(historyAction : historyAction) : void {
    storage.set(HISTORY, (HISTORY) => [...HISTORY, historyAction])
    storage.sub(HISTORY, () => {
        console.log('New history item added')
    })
    if (!storage.get(undid)) {
        storage.set(currentIndexInHistory, (storage.get(HISTORY).length - 1))
        console.log(storage.get(currentIndexInHistory), ' undid is false')
    } else {
        remakeHistory(historyAction)
    }
    console.log(storage.get(HISTORY))
}

function remakeHistory(newHistoryAction : historyAction) : void {
    console.log('Needs to make new history!')
    const oldHistory = storage.get(HISTORY)
    let newHistory : historyAction[] = []
    oldHistory.map((historyElement) => {
        if (oldHistory.indexOf(historyElement) <= storage.get(currentIndexInHistory)) {
            newHistory.push(historyElement)
        } else if (historyElement === oldHistory[oldHistory.length - 1]) {
            historyElement.oldValue = newHistory[newHistory.length - 1].newValue
            newHistory.push(historyElement)
            console.log('LAST ELEMENT')
        }
    })
    storage.set(HISTORY, newHistory)
    storage.set(undid, false)
    storage.set(currentIndexInHistory, (storage.get(HISTORY).length - 1))
    console.log(storage.get(HISTORY), ' ', storage.get(currentIndexInHistory))
}

function subtractIndexValue(steps : number) : void {
    storage.set(currentIndexInHistory, storage.get(currentIndexInHistory) - steps)
}

function addIndexValue(steps : number) : void {
    storage.set(currentIndexInHistory, storage.get(currentIndexInHistory) + steps)
}

function getCurrentElementInHistory() {
    let currentElement = storage.get(HISTORY)[storage.get(currentIndexInHistory)]
    console.log(storage.get(currentIndexInHistory))
    console.log(currentElement)
}

export function redo() {
    if ((storage.get(currentIndexInHistory) + 1) < storage.get(HISTORY).length) {
        addIndexValue(1)
    } else if ((storage.get(currentIndexInHistory) + 1) === storage.get(HISTORY).length) {
        storage.set(undid, false)
    }
    getCurrentElementInHistory()
}

export function undo() {
    if (storage.get(currentIndexInHistory) > 0) {
        subtractIndexValue(1)
        storage.set(undid, true)
    }
    getCurrentElementInHistory()
}