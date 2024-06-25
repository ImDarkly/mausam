import { Button } from '@nextui-org/button';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-lg flex-col items-center justify-center gap-8 px-4 py-0">
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-center justify-center gap-4 self-stretch">
          <div className="relative flex w-full flex-[0_0_auto] flex-col items-center justify-center gap-2 self-stretch">
            <p className="flexjustify-center font-text-6xl text-6xl font-semibold text-primary">
              404
            </p>
            <p className="text-center text-2xl font-semibold text-primary">
              Page Not Found
            </p>
          </div>
          <p className="text-muted-foreground w-full text-center text-base font-normal">
            Looks like your forecast was a bit cloudy today. This page seems to
            be lost in a fog.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <Button className="rounded-xl">
            <Link to="/ " className="flex flex-row gap-2">
              Cut Through the Fog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
