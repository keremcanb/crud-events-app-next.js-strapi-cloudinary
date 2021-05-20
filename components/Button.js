const Button = ({ value }) => (
  <div className="flex justify-center">
    <button
      className="py-2 px-4 mt-5 | bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 | focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      type="submit"
    >
      {value}
    </button>
  </div>
);

export default Button;
