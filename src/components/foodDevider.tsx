function foodDevider({ time }: any) {
  return (
    <>
      <div className="food-devider--container">
        <div className="food-devider--first-line"></div>
        <h3 className="food-devider--date">{time}</h3>
        <div className="food-devider--second-line"></div>
      </div>
    </>
  );
}

export default foodDevider;
