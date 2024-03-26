import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const isProduction = process.env.NODE_ENV === 'production';

export const Footer = () => {
  return (
    <footer className="flex h-16 w-full items-center justify-center gap-1 text-primary">
      <p>Made with</p>
      <TooltipProvider>
        <Tooltip delayDuration={5000}>
          <TooltipTrigger asChild>
            <Icon
              icon="heroicons:heart-16-solid"
              className="text-2xl text-primary transition-all duration-500 hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,1)]"
            />
          </TooltipTrigger>
          <TooltipContent
            className="bg-primary text-primary-foreground"
            side="top"
          >
            <p>{isProduction ? '' : 'dev'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>by</p>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <Link
              to="https://github.com/ImDarkly"
              className="relative font-semibold text-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:rounded-full before:bg-primary before:transition-transform before:delay-100 before:duration-300 hover:before:origin-left hover:before:scale-x-100"
            >
              ImDarkly
            </Link>
          </TooltipTrigger>
          <TooltipContent
            className="bg-popover-foreground text-popover"
            side="top"
          >
            <p>https://github.com/ImDarkly</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </footer>
  );
};
