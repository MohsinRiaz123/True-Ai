const Loader = () => {
  return (
    <div
      className={` w-full flex  justify-center   items-center flex-col gap-5   `}
    >
      <div
        className="w-20 h-20 rounded-full animate-spin
          border-8 border-solid border-[#FF02DF] border-t-transparent"
      ></div>
      <div className="text-2xl font-bold uppercase text-[#FF02DF]">
        Please wait your results are being processed....
      </div>
    </div>
  );
};
export default Loader;
