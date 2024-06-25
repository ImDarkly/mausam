import { Icon } from '@iconify/react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

const Day = ({ index }: { index: number }) => {
  return (
    <Card
      shadow="none"
      className={`flex h-16 w-full flex-row rounded-[20px] px-4 ${index === 3 ? ' text-blue-600' : 'bg-transparent text-default-50'}`}
    >
      <CardHeader className="flex w-auto flex-col justify-center">
        <p>Monday</p>
      </CardHeader>
      <CardBody className="flex w-full flex-col items-end justify-center p-3">
        <p className="text-base font-bold">22°/12°</p>
      </CardBody>
      <CardFooter className="flex w-auto flex-col justify-center">
        <Icon icon="material-symbols:cloud" className="size-9" />
      </CardFooter>
    </Card>
  );
};

export default Day;
