const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] dark:bg-brand-dark bg-brand-lavender-mist flex items-center justify-center bg-white bg-opacity-50">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="h-16 w-16 animate-loading rounded-full border-t-4 border-brand-iris dark:border-white border-opacity-50">
          &nbsp;
        </div>
        <span className="text-lg text-brand-iris dark:text-white">Loading</span>
      </div>
    </div>
  );
};

export default Loading;
