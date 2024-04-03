import { ImSpinner8 } from 'react-icons/im';

const Loading = ({ size = '24', description }: { size?: string; description?: string }) => {
  return (
    <div className="absolute inset-0 text-brand bg-white flex items-center justify-center flex-col gap-1">
      <ImSpinner8 className="animate-spin" size={`${size}px`} fill="currentColor" />
      {description && (
        <p className="text-base text-brand font-semibold">{description?.toLowerCase()}</p>
      )}
    </div>
  );
};

export default Loading;
