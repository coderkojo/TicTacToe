import "./../App.css";

const Square = ({ onclick, value, index }) => {
  return (
    <button className="square" onClick={() => onclick(index)}>
	{value}
    </button>
  );
};

export default Square;
