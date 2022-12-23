const Button = ({ text = 'Rent Now', bgColor = 'bg-btn-blue', color = 'text-white', handleClick, margin, textSize }) => (
  <button
    onClick={handleClick}
    type="submit"
    className={`${bgColor} lg:${textSize} flex font-jakarta ${color} px-4 justify-center items-center rounded py-2 dark:text-white ${margin}`}
  >
    {text}
  </button>
);

export default Button;

