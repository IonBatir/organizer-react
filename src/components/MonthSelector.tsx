import dayjs from "dayjs";

import "./MonthSelector.css";

type Props = {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
};

export default function MonthSelector({
  selectedDate,
  setSelectedDate,
}: Props) {
  const handleGoBackMonth = () =>
    setSelectedDate(selectedDate.subtract(1, "month"));

  const handleGoForwardMonth = () =>
    setSelectedDate(selectedDate.add(1, "month"));

  return (
    <p>
      <i className="material-icons" onClick={handleGoBackMonth}>
        arrow_left
      </i>
      <span>{selectedDate.format("MMMM YYYY")}</span>
      <i className="material-icons" onClick={handleGoForwardMonth}>
        arrow_right
      </i>
    </p>
  );
}
