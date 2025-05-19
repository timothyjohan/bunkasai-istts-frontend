export default function AgreementButton({ onClick, text, additionalClasses = "" }) {
    return (
        <button
            onClick={onClick}
            className={`mt-5 bg-neutral-700 py-1.5 px-10 text-xl rounded-xl hover:bg-violet-500 hover:text-green-400 hover:font-bold transition-all hover:scale-110 shadow-xl ${additionalClasses}`}
        >
            {text}
        </button>
    );
}
