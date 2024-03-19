import { Icon } from '@iconify/react';

import { Button } from './ui/button';

export const CitySelector = () => {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <Button
        variant="ghost"
        className="gap-2 rounded-xl text-xl font-bold text-primary"
      >
        San Francisco
        <Icon icon="material-symbols:swap-vert-rounded" className="size-5" />
      </Button>
    </div>
  );
};
