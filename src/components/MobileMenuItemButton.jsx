export default function MobileMenuItemButton({ onClick, text, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`block w-full py-2 text-center my-4 ${className}`}
        >
            {text}
        </button>
    );
}
