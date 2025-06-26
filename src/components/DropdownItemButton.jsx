export default function DropdownItemButton({ onClick, text }) {
    return (
        <button
            onClick={onClick}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-600"
        >
            {text}
        </button>
    );
}
