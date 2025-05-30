export default function SubmitButton({ btnClick, ShowErrors }) {
  return (
    <>
      {btnClick ? (
        <button
          type="submit"
          disabled
          className="w-full py-2 rounded-xl font-bold transition-all text-violet-500 bg-green-400"
        >
          <img
            src="loading.png"
            className="h-6 mx-auto transition-all animate-spin"
            alt="Loading"
          />
        </button>
      ) : (
        <button
          type="submit"
          className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:bg-[#5071BE] hover:text-white"
          onClick={ShowErrors}
        >
          Submit
        </button>
      )}
    </>
  );
}
