import Platform from '@/components/PlatformLayout';
import { Button } from '@/components/ui/button';

const PlatformLaunch = () => {
  return (
    <div className="grid grid-cols-4 gap-72 ">
      <div>
        <div className="inline-flex">
          <Button className="rounded-full bg-brand-todo" size={'icon'} />
          <p className="text-brand-regent-grey text-xs mb-6 ml-2"> TODO </p>
        </div>
        <Platform />
      </div>
    </div>
  );
};

export default PlatformLaunch;
