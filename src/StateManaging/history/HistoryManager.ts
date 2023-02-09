import { atom } from "jotai";
import { sizeType } from "../../components/nodes/Square";
import { NODES } from "../Atoms";

import { storage, updateNodeSize } from "../NodeStorage";

const numberOfUndos = atom(1)

export type historyAction = {
    usedFunction ?: 'Update Node Size',
    nodeId ?: string,
    keys ?: string[],
    oldValue : any,
    newValue : any
}

export const HISTORY = atom<historyAction[]>([])
const currentIndexInHistory = atom<number>(0)
const undid = atom<boolean>(false)

export function addHistoryNodeAction(historyAction : historyAction) : void {
    storage.set(HISTORY, (HISTORY) => [...HISTORY, historyAction])
    storage.sub(HISTORY, () => {
        console.log('History changed')
    })
    if (!storage.get(undid)) {
        storage.set(currentIndexInHistory, (storage.get(HISTORY).length - 1))
    } else {
        remakeHistory()
    }
    console.log(storage.get(HISTORY))
}

export function removeTimelineConflicts() {
    const oldHistory = storage.get(HISTORY)
    let newHistory : historyAction[] = []
    oldHistory.map((historyItem) => {
        const currentIndex = oldHistory.indexOf(historyItem)
        let oldWidth : number = historyItem.newValue.width
        let oldHeight : number = historyItem.newValue.height
        if (currentIndex + 1 < oldHistory.length) {
            if (oldWidth === oldHistory[currentIndex + 1].oldValue.width && oldHeight === oldHistory[currentIndex + 1].oldValue.height) {
                newHistory.push(historyItem)
            }
        } else {
            newHistory.push(historyItem)
        }
    })
    storage.set(HISTORY, newHistory)
    storage.set(undid, false)
} 

function remakeHistory() : void {
    const oldHistory = storage.get(HISTORY)
    let newHistory : historyAction[] = []
    oldHistory.map((historyElement) => {
        if (oldHistory.indexOf(historyElement) <= storage.get(currentIndexInHistory)) {
            newHistory.push(historyElement)
        } else if (historyElement === oldHistory[oldHistory.length - 1]) {
            historyElement.oldValue = newHistory[newHistory.length - 1].newValue
            newHistory.push(historyElement)
        }
        storage.get(currentIndexInHistory)
    })
    // newHistory.push(oldHistory[oldHistory.length - 1])
    storage.set(HISTORY, newHistory)
    storage.set(currentIndexInHistory, (storage.get(HISTORY).length - 1))
}

function getCurrentTimeline() : historyAction[] {
    const mainHistory = storage.get(HISTORY)
    let currentTimeline : historyAction[] = []
    mainHistory.map((historyElement) => {
        if (mainHistory.indexOf(historyElement) <= storage.get(currentIndexInHistory)) {
            currentTimeline.push(historyElement)
        }
    })
    return currentTimeline
}

function subtractIndexValue(steps : number) : void {
    storage.set(currentIndexInHistory, storage.get(currentIndexInHistory) - steps)
}

function addIndexValue(steps : number) : void {
    storage.set(currentIndexInHistory, storage.get(currentIndexInHistory) + steps)
}

export function canRedo() : boolean {
    if ((storage.get(currentIndexInHistory) + 1) < storage.get(HISTORY).length) {
        return true
    } else { 
        return false
    }
}

export function canUndo() : boolean {
    if (storage.get(currentIndexInHistory) > 0) {
        return true
    } else {
        return false
    }
}

export function redo() {
    if (canRedo()) {
        addIndexValue(1)
        applyTimelineOnScreen(false)
    } else if ((storage.get(currentIndexInHistory) + 1) === storage.get(HISTORY).length) {
        storage.set(undid, false)
    }
}

export function undo() {
    if (storage.get(HISTORY).length == 1) {
        // TODO Get the old value and set to the token
        storage.set(HISTORY, [])
        storage.set(currentIndexInHistory, 0)
        console.log(storage.get(HISTORY), ' ', storage.get(currentIndexInHistory))
    } else if (canUndo()) {
        subtractIndexValue(1)
        storage.set(undid, true)
        applyTimelineOnScreen(true)
    }
}

function applyTimelineOnScreen(undo : boolean) {
    const currentTimeline : historyAction[] = getCurrentTimeline()
    let lastElementInTimeline = currentTimeline[currentTimeline.length - 1]
    storage.get(NODES).map((node) => {
        if (node.id === lastElementInTimeline.nodeId) {
            if (lastElementInTimeline.usedFunction === 'Update Node Size') {
                updateNodeSize(node.id, lastElementInTimeline.newValue?.height, lastElementInTimeline.newValue!.width)
            }
        }
    })
    removeTimelineConflicts()
}