import { Icon } from '@iconify/react';

import { Card, CardContent, CardFooter } from './ui/card';

interface TodayProps {
  icon: string;
  temperature: number;
  description: string;
}

export const Today = ({ icon, temperature, description }: TodayProps) => {
  return (
    <Card className="flex flex-col items-center justify-center gap-0 bg-transparent text-primary">
      <CardContent>
        <Icon icon={icon} className="size-32" />
      </CardContent>
      <CardFooter className="flex-col">
        <span className="text-6xl font-bold">{temperature}°</span>
        <div className="text-base font-bold">{description}</div>
      </CardFooter>
    </Card>
  );
};
