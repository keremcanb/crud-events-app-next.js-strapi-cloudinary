const Card = ({ children }) => (
  <div className="bg-gray-100 bg-opacity-95 border-opacity-60 border-solid rounded-xl border-2 hover:bg-gray-200 hover:border-transparent transition-colors duration-500 | flex flex-col md:flex-row justify-center md:justify-around items-center gap-3 | mb-5 p-4 |">
    {children}
  </div>
);

export default Card;
