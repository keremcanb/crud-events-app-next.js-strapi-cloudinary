import { IBtnOnClick } from '@/types/types';

const BtnOnClick = ({ text, color, onClick }: IBtnOnClick) => (
  <div className="flex justify-center">
    <button className={`btn btn-${color}`} onClick={onClick}>
      {text}
    </button>
  </div>
);

export default BtnOnClick;
