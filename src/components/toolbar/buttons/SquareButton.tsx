interface SquareButtonProps {
    addNodeFunction : Function
}

export default function SquareButton({addNodeFunction} : SquareButtonProps) {
    return (
        <button onClick={addNodeFunction()} className='rounded-lg h-10 px-2 bg-red-500
        hover:bg-red-600
        active:bg-red-700
        transition-all duration-300
        '>
            Create Square
        </button>
    )
}