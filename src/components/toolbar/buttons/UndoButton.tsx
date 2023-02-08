import { undo } from "../../../StateManaging/history/HistoryManager"


interface UndoProps {
    updateNodesFunction : Function
}

export function UndoButton({updateNodesFunction} : UndoProps) {

    // function buttonAction() {
    //     if (verifyIfCanUndo()) {
    //         undoAction()
    //         updateNodesFunction()
    //     }
    // }

    return (
        <button className='h-10 px-3
            rounded-lg
            bg-blue-500
            hover:bg-blue-600
            active:bg-blue-700
            transition-all duration-300
        '
        onClick={() => undo()}
        >
            <i className="bi bi-arrow-counterclockwise"></i>
        </button>
    )
}