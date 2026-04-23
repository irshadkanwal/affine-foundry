const CustomDiv = ({ children, title, value, showHr = true }) => {
  return (
    <div className="body_container">
      {showHr && <div className="card_custom_hr" />}
      <div className="data_card_details flex_between">
        <div>
          <p className="data_card_div_title">{title}</p>
          <p className="data_card_div_value">{value}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
export default CustomDiv;
