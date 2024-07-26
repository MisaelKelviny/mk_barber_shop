import Schedule from "./Schedule";

export default interface RepositorySchedule {
  create(schedule: Schedule): Promise<void>;
  searchForEmail(email: string): Promise<Schedule[]>;
  searchForProfessionalAndDate(
    professional: number,
    date: Date
  ): Promise<Schedule[]>;
}
