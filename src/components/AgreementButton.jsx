export default function AgreementButton({
  onClick,
  text,
  additionalClasses = "",
}) {
  const backColor = text === "Setuju" ? "#F15D8D" : "#5071BE";
  const textColor = text === "Setuju" ? "#F0070A" : "#133072";
  return (
    <button
      onClick={onClick}
      className={`mt-5 bg-neutral-700 py-1.5 px-10 text-xl rounded-xl ${
        text == "Setuju"
          ? "hover:bg-[#5071BE] hover:text-white"
          : "hover:bg-[#F15D8D] hover:text-white"
      } hover:font-bold transition-all hover:scale-110 shadow-xl ${additionalClasses}`}
    >
      {text}
    </button>
  );
}
