const Card = ({ children }) => (
  <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-3 | mb-5 p-4 | card cursor-pointer">
    {children}
  </div>
);

export default Card;
