import { Icon } from '@iconify/react';

import { Button } from '@/lib/components/ui/button';

const Demo = () => {
  return (
    <div>
      <div className="flex h-16 w-full items-center justify-center">
        <Button
          variant="ghost"
          className="gap-2 rounded-xl text-xl font-bold text-primary"
        >
          San Francisco
          <Icon icon="material-symbols:swap-vert-rounded" className="size-5" />
        </Button>
      </div>
      <div className="flex h-16 w-full items-center justify-center">
        <Button
          variant="ghost"
          className="gap-2 rounded-xl text-base font-bold text-primary"
        >
          Monday, 12 April
          <Icon
            icon="material-symbols:calendar-month-outline-rounded"
            className="size-5"
          />
        </Button>
      </div>
    </div>
  );
};

export default Demo;
