import { Icon } from '@iconify/react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface HourProps {
  time: number;
  temperature: number;
  icon: string;
  active?: boolean;
}

export const Hour = ({ time, temperature, icon, active }: HourProps) => {
  return (
    <Card
      className={`flex h-32 w-16 flex-col rounded-[20px] p-0 ${
        active ? '' : 'bg-transparent text-primary'
      }`}
    >
      <CardHeader className="h-full w-full p-0">
        <CardTitle className="flex h-full w-full items-center justify-center text-base font-bold">
          {time % 12} {time < 12 ? 'AM' : 'PM'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center p-0">
        <Icon icon={icon} className="size-9" />
      </CardContent>
      <CardFooter className="flex h-full w-full items-center justify-center p-0 text-lg font-bold">
        {temperature}°
      </CardFooter>
    </Card>
  );
};
