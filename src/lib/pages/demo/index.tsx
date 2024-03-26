import { CitySelector } from '@/lib/components/city-selector';
import { DateSelector } from '@/lib/components/date-selector';
import { Day } from '@/lib/components/day';
import { Footer } from '@/lib/components/footer';
import { Hour } from '@/lib/components/hour';
import { Today } from '@/lib/components/today';
import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';

const CLOUD_ICON = 'material-symbols:cloud';
const SUNNY_ICON = 'material-symbols:sunny-rounded';
const RAINY_ICON = 'material-symbols:rainy';

const hours = [
  { time: 0, temperature: 15, icon: CLOUD_ICON },
  { time: 1, temperature: 16, icon: SUNNY_ICON },
  { time: 2, temperature: 17, icon: RAINY_ICON },
  { time: 3, temperature: 16, icon: CLOUD_ICON },
  { time: 4, temperature: 15, icon: CLOUD_ICON },
  { time: 5, temperature: 14, icon: RAINY_ICON },
  { time: 6, temperature: 14, icon: RAINY_ICON },
  { time: 7, temperature: 15, icon: RAINY_ICON },
  { time: 8, temperature: 16, icon: RAINY_ICON },
  { time: 9, temperature: 17, icon: SUNNY_ICON },
  { time: 10, temperature: 18, icon: SUNNY_ICON },
  { time: 11, temperature: 20, icon: SUNNY_ICON },
  { time: 12, temperature: 21, icon: SUNNY_ICON },
  { time: 13, temperature: 22, icon: SUNNY_ICON },
  { time: 14, temperature: 23, icon: SUNNY_ICON },
  { time: 15, temperature: 23, icon: SUNNY_ICON },
  { time: 16, temperature: 22, icon: SUNNY_ICON },
  { time: 17, temperature: 21, icon: SUNNY_ICON },
  { time: 18, temperature: 20, icon: CLOUD_ICON },
  { time: 19, temperature: 19, icon: CLOUD_ICON },
  { time: 20, temperature: 18, icon: CLOUD_ICON },
  { time: 21, temperature: 17, icon: RAINY_ICON },
  { time: 22, temperature: 16, icon: CLOUD_ICON },
  { time: 23, temperature: 15, icon: CLOUD_ICON },
];

const days = [
  {
    day: 'Monday',
    weatherIcon: 'material-symbols:cloud',
    highTemperature: 22,
    lowTemperature: 12,
  },
  {
    day: 'Tuesday',
    weatherIcon: 'material-symbols:sun',
    highTemperature: 26,
    lowTemperature: 14,
  },
  {
    day: 'Wednesday',
    weatherIcon: 'material-symbols:partly-sunny',
    highTemperature: 24,
    lowTemperature: 16,
  },
  {
    day: 'Thursday',
    weatherIcon: 'material-symbols:cloudy',
    highTemperature: 21,
    lowTemperature: 11,
  },
  {
    day: 'Friday',
    weatherIcon: 'material-symbols:rainy',
    highTemperature: 18,
    lowTemperature: 9,
  },
  {
    day: 'Saturday',
    weatherIcon: 'material-symbols:thunderstorm',
    highTemperature: 17,
    lowTemperature: 8,
  },
  {
    day: 'Sunday',
    weatherIcon: 'material-symbols:snowy',
    highTemperature: 15,
    lowTemperature: 7,
  },
];

const now = {
  icon: CLOUD_ICON,
  temperature: 22,
  description: 'Partly Cloudy',
};

const Demo = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <CitySelector />
      <DateSelector />
      <div className="flex h-full w-full max-w-sm flex-1 flex-col">
        <Today
          icon={now.icon}
          temperature={now.temperature}
          description={now.description}
        />
        <ScrollArea className="whitespace-nowrap">
          <div className="g-2 flex w-max space-x-4">
            {hours.map((hour) => (
              <Hour
                key={hour.time}
                time={hour.time}
                temperature={hour.temperature}
                icon={hour.icon}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="h-full w-full px-4">
          {days.map((day) => (
            <Day
              key={day.day}
              day={day.day}
              weatherIcon={day.weatherIcon}
              highTemperature={day.highTemperature}
              lowTemperature={day.lowTemperature}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Demo;
