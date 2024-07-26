export default class ScheduleUtils {
  private static minutes = [0, 15, 30, 45];

  static dayTime() {
    return {
      morning: this.generateHours([8, 9, 10, 11]),
      afternoon: this.generateHours([14, 15, 16, 17]),
      night: this.generateHours([18, 19, 20, 21]),
    };
  }

  private static generateHours(hours: number[]) {
    return hours.reduce((hours, time) => {
      const all = this.minutes.map((minute) => {
        return `${String(time).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      });
      return hours.concat(all);
    }, [] as string[]);
  }
}
