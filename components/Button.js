import { forwardRef } from 'react';

const Button = forwardRef(({ onClick, href, text }, ref) => (
  <div className="flex justify-center">
    <button
      href={href}
      onClick={onClick}
      ref={ref}
      type="submit"
      className="py-2 px-4 mt-5 | bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 | focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      {text}
    </button>
  </div>
));

Button.displayName = 'Button';

export default Button;
