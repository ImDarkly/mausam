import { Icon } from '@iconify/react';
import React from 'react';

import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from './ui/command';

export const CitySelector = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex h-16 w-full items-center justify-center">
      <Button
        variant="ghost"
        className="gap-2 rounded-xl text-xl font-bold text-primary"
        onClick={() => setOpen(true)}
      >
        San Francisco
        <Icon icon="material-symbols:swap-vert-rounded" className="size-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a city..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
