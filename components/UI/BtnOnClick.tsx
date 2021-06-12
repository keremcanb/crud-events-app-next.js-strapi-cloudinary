const BtnOnClick = ({ text, color, onClick }: { text: string; color: string; onClick: () => {} }) => (
  <div className="flex justify-center">
    <button className={`btn btn-${color}`} onClick={onClick}>
      {text}
    </button>
  </div>
);

export default BtnOnClick;
