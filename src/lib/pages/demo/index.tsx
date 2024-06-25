import CitySelector from '@/lib/components/city-selector';
import DateSelector from '@/lib/components/date-selector';
import Day from '@/lib/components/day';
import Hour from '@/lib/components/hour';
import Today from '@/lib/components/today';

const generateUniqueKey = (index: number) => {
  return `${index}-${Math.random().toString(36).substr(2, 9)}`;
};

const Demo = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex h-32 flex-col items-center justify-center gap-1">
        <CitySelector />
        <DateSelector />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Today />
        <div className="flex flex-col items-center gap-4 pb-4">
          <div className="flex select-none flex-row gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Hour key={generateUniqueKey(index)} index={index} />
            ))}
          </div>
          <div className="flex w-full select-none flex-col gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <Day key={generateUniqueKey(index)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
