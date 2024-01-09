const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] dark:bg-brand-dark bg-brand-lavender-mist flex items-center justify-center bg-white bg-opacity-50">
      <div className="h-16 w-16 animate-loading rounded-full border-4 border-brand-iris border-opacity-50">
        &nbsp;
      </div>
    </div>
  );
};

export default Loading;
