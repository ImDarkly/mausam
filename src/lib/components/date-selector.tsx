import { Icon } from '@iconify/react';
import type { DateValue } from '@internationalized/date';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { Calendar } from '@nextui-org/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { useDateFormatter } from '@react-aria/i18n';
import React from 'react';

const DateSelector = () => {
  const [value, setValue] = React.useState<DateValue>(
    today(getLocalTimeZone())
  );
  const formatter = useDateFormatter({
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="light" className="text-base font-bold text-default-50">
          {value ? formatter.format(value.toDate(getLocalTimeZone())) : '--'}
          <Icon
            icon="material-symbols:calendar-month-rounded"
            className="size-5"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar value={value} onChange={setValue} />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
