import { Professional } from "../professional";
import { Service } from "../service";

export default interface Schedule {
  id: number;
  clientEmail: string;
  date: Date;
  professional: Professional;
  services: Service[];
}
