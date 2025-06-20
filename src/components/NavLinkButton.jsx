export default function NavLinkButton({ onClick, text }) {
    return (
        <button
            onClick={onClick}
            className="mx-5 text-xl font-bold transition-all hover:scale-110"
        >
            {text}
        </button>
    );
}
