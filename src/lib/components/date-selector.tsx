import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import React from 'react';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export const DateSelector = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <div className="flex h-16 w-full items-start justify-center">
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="gap-2 rounded-xl text-base font-bold text-primary"
          >
            {date ? format(date, 'PPP') : format(new Date(), 'PPP')}
            <Icon
              icon="material-symbols:calendar-month-outline-rounded"
              className="size-5"
            />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
