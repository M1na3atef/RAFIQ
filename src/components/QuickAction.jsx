function QuickAction({

    title,

    onClick,

}) {
    return (
        <button onClick={onClick} className="bg-white rounded-2xl shadow-md p-6 text-lg font-semibold hover:bg-blue-600 hover:text-white transition">
            {title}
        </button>
    );
}

export default QuickAction;