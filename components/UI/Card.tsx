const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-3 place-items-center gap-3 | bg-gray-100 hover:bg-gray-200 bg-opacity-95 | border-2 border-opacity-60 border-solid hover:border-transparent rounded-xl | transition-colors duration-500 | mb-5 p-5">
    {children}
  </div>
);

export default Card;
