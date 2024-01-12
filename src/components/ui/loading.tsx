import React from 'react';

interface LoadingProps {
  spinnerWidth?: number;
  spinnerHeight?: number;
  parentHeight?: number;
}

const Loading: React.FC<LoadingProps> = ({
  spinnerWidth = 64,
  spinnerHeight = 64,
  parentHeight = 75
}) => {
  const spinnerStyle: React.CSSProperties = {
    width: `${spinnerWidth}px`,
    height: `${spinnerHeight}px`
  };

  const containerStyle: React.CSSProperties = {
    height: `${parentHeight}vh`
  };

  return (
    <div
      className="bg-inherit flex flex-col gap-2 items-center justify-center"
      style={containerStyle}
    >
      <div
        className="animate-loading rounded-full border-t-4 border-brand-iris dark:border-white"
        style={spinnerStyle}
      >
        &nbsp;
      </div>
      <span className="text-lg text-brand-iris dark:text-white">Loading</span>
    </div>
  );
};

export default Loading;
