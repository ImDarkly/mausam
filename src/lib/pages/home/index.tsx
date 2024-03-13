import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600">
      <h1 className="text-4xl font-bold text-primary">Mausam</h1>
      <p className="text-muted-foreground">
        A lightweight{' '}
        <Link
          to="https://github.com/ImDarkly/mausam"
          className="relative font-semibold text-primary before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:rounded-full before:bg-primary before:transition-transform before:delay-75 before:duration-300 hover:before:origin-left hover:before:scale-x-100"
        >
          open source
        </Link>{' '}
        weather forecast app.
      </p>
    </div>
  );
};

export default Home;
