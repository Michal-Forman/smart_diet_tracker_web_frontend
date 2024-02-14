function foodDevider({ time }: any) {
  const getRelativeFoodLabel = (date: string) => {
    console.log("date", date);
    // Get today's date in correct format
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
    const todayDay = today.getDate().toString().padStart(2, "0");
    const todayString = `${todayYear}-${todayMonth}-${todayDay}`;

    // Get yesterday's date in correct format
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayYear = yesterday.getFullYear();
    const yesterdayMonth = (yesterday.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const yesterdayDay = yesterday.getDate().toString().padStart(2, "0");
    const yesterdayString = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;

    // Compare the date to today's date
    if (date === todayString) {
      return "Today";
    } else if (date === yesterdayString) {
      return "Yesterday";
    } else {
      return date;
    }
  };

  const timeLabel = getRelativeFoodLabel(time);

  return (
    <>
      <div className="food-devider--container">
        <div className="food-devider--first-line"></div>
        <h3 className="food-devider--date">{timeLabel}</h3>
        <div className="food-devider--second-line"></div>
      </div>
    </>
  );
}

export default foodDevider;
