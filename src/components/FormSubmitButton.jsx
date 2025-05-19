export default function FormSubmitButton({ text }) {
    return (
        <button
            type="submit"
            className="w-full px-3 py-3 mt-2 mb-4 text-lg text-white bg-transparent border border-white rounded-lg hover:bg-white/10 transition-colors"
        >
            {text}
        </button>
    );
}
