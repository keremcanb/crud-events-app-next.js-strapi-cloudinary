const Showcase = () => (
  <div
    className="flex flex-col items-center justify-center relative | bg-no-repeat bg-center bg-black | h-72 w-full p-2 | text-white text-center"
    style={{ backgroundImage: `url("/images/showcase.jpg")` }}
  >
    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-70" />
    <div className="z-20">
      <h1 className="text-4xl">Welcome to the party</h1>
      <h2 className="mt-5">Find the hottest DJ Events</h2>
    </div>
  </div>
);

export default Showcase;
