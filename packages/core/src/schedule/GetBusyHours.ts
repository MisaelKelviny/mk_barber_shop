import { TIME_SLOT } from "../constants";
import RepositorySchedule from "./RepositorySchedule";

export default class GetBusyHours {
  constructor(private readonly repo: RepositorySchedule) {}

  async executar(professionalId: number, date: Date): Promise<string[]> {
    const schedules = await this.repo.searchForProfessionalAndDate(
      professionalId,
      date
    );
    const data = schedules
      .map((schedule) => {
        return {
          data: schedule.date,
          slots: schedule.services.reduce(
            (total, s) => total + s.slotsQuantity,
            0
          ),
        };
      })
      .reduce((busyHours: Date[], data: any) => {
        const time = data.date;
        const slots = data.slots;
        const times = Array.from({ length: slots }, (_, i) =>
          this.sumMinutes(time, i * TIME_SLOT)
        );
        return [...busyHours, ...times];
      }, [])
      .map((d) => d.toTimeString().slice(0, 5));

    return data;
  }

  private sumMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
