import { Icon } from '@iconify/react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

const Hour = ({ index }: { index: number }) => {
  return (
    <Card
      shadow="none"
      className={`h-32 w-16 rounded-[20px] ${index === 2 ? ' text-blue-600' : 'bg-transparent text-default-50'}`}
    >
      <CardHeader className="flex flex-col items-center overflow-hidden px-0">
        <p>6 AM</p>
      </CardHeader>
      <CardBody className="flex h-full items-center p-0">
        <Icon icon="material-symbols:cloud" className="size-9" />
      </CardBody>
      <CardFooter className="flex h-full flex-col items-center p-3">
        <p className="text-base font-bold">22°</p>
      </CardFooter>
    </Card>
  );
};

export default Hour;
