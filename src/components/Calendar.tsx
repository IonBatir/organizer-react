import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";

import "./Calendar.css";

type Day = {
  active: boolean;
  disabled: boolean;
  selected: boolean;
  value: dayjs.Dayjs;
};

type Week = Day[];

type Props = {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (selectedDate: dayjs.Dayjs) => void;
};

export default function Calendar({ selectedDate, setSelectedDate }: Props) {
  const [calendar, setCalendar] = React.useState<Week[]>([]);

  React.useEffect(() => {
    const startDay = selectedDate.startOf("month").startOf("week");
    const endDay = selectedDate.endOf("month").endOf("week");

    let date = startDay.subtract(1, "day");

    const calendar: Week[] = [];
    for (let i = 0; date.isBefore(endDay, "day"); i++) {
      calendar[i] = [];
      for (let j = 0; j < 7; j++, date = date.add(1, "day")) {
        const value = date.add(1, "day");
        const active = dayjs().isSame(value, "date");
        const disabled = !selectedDate.isSame(value, "month");
        const selected = selectedDate.isSame(value, "date");

        calendar[i][j] = { active, disabled, selected, value };
      }
    }

    setCalendar(calendar);
  }, [selectedDate]);

  return (
    <table>
      <thead>
        <tr>
          <th>Lun</th>
          <th>Mar</th>
          <th>Mie</th>
          <th>Joi</th>
          <th>Vin</th>
          <th>Sâm</th>
          <th>Dum</th>
        </tr>
      </thead>

      <tbody>
        {calendar.map((week, i) => (
          <tr key={i}>
            {week.map((day, j) => (
              <td
                key={i + j}
                className={clsx(day.disabled && "disabled")}
                onClick={() => setSelectedDate(day.value)}
              >
                <span
                  className={clsx(
                    day.active && "active",
                    day.selected && "selected"
                  )}
                >
                  {day.value.format("ddd DD")}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
