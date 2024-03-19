'use client';

import { Icon } from '@iconify/react';
import type * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/lib/components/ui/button';
import { cn } from '@/lib/styles/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-primary-foreground',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-accent p-0 text-primary hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-blue-500 rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal hover:text-primary aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-accent hover:text-primary text-primary hover:text-primary-foreground focus:bg-accent focus:text-primary',
        day_today: 'bg-blue-100 text-primary-foreground hover:text-primary',
        day_outside:
          'day-outside text-blue-400/50 aria-selected:bg-accent/50 aria-selected:text-white aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            className="size-4"
          />
        ),
        IconRight: () => (
          <Icon
            icon="material-symbols:arrow-forward-ios-rounded"
            className="size-4"
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
