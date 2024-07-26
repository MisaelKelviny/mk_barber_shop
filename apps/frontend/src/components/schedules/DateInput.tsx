import DayInput from "./DayInput";
import HoursInput from "./HoursInput";

export interface DateInputProps {
  date: Date;
  slotsQuantity: number;
  dateChange: (Date: Date) => void;
}

export default function DateInput(props: Readonly<DateInputProps>) {
  const { date, slotsQuantity, dateChange } = props;

  return (
    <div className="flex flex-col gap-10">
      <DayInput date={date} dateChange={dateChange} />
      <HoursInput
        date={date}
        hoursQuantity={slotsQuantity}
        dateChange={dateChange}
      />
    </div>
  );
}
