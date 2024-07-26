import { ScheduleContext } from "@/data/contexts/ScheduleContext";
import { useContext } from "react";

const useSchedule = () => useContext(ScheduleContext);
export default useSchedule;
