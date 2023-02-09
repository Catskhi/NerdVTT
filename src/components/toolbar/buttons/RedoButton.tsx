
import { canRedo, redo, removeTimelineConflicts } from "../../../StateManaging/history/HistoryManager"
import { storage } from "../../../StateManaging/NodeStorage"

interface RedoProps {
    updateNodesFunction : Function
}

export function RedoButton({updateNodesFunction} : RedoProps) {

    function buttonAction() {
        if (canRedo()) {
            redo()
            updateNodesFunction()
        }
    }

    return (
        <button className='h-10 px-3 ml-3
            rounded-lg
            bg-blue-500
            hover:bg-blue-600
            active:bg-blue-700
            transition-all duration-300
        '
        onClick={() => buttonAction()}
        >
            <i className="bi bi-arrow-clockwise"></i>
        </button>
    )
}