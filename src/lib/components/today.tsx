import { Icon } from '@iconify/react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';

const Today = () => {
  return (
    <Card shadow="none" className="w-full bg-transparent py-8 text-default-50">
      <CardBody className="flex items-center">
        <Icon icon="material-symbols:cloud" className="size-32" />
      </CardBody>
      <CardFooter>
        <div className="flex w-full flex-col items-center gap-2">
          <p className="text-6xl font-bold">22°</p>
          <p className="text-base">Partly Cloudy</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Today;
