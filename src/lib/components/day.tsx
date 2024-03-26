import { Icon } from '@iconify/react';

import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';

interface DayProps {
  day: string;
  weatherIcon: string;
  highTemperature: number;
  lowTemperature: number;
  active?: boolean;
}

export const Day = ({
  day,
  weatherIcon,
  highTemperature,
  lowTemperature,
  active,
}: DayProps) => {
  return (
    <Card
      className={`flex h-16 w-full rounded-[20px] p-0 ${
        active ? '' : 'bg-transparent text-primary'
      }`}
    >
      <CardHeader className="w-full p-0">
        <CardTitle className="justify-left flex h-full w-full items-center text-base font-bold">
          {day}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center justify-center gap-4 p-0 text-lg font-bold">
        <Icon icon={weatherIcon} className="size-9" />
        {highTemperature}°/{lowTemperature}°
      </CardFooter>
    </Card>
  );
};
