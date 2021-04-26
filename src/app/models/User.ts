import { Repository } from "./Repositoy";

export interface User {
  id?: number;
  name: string;
  username: string;
  password: string;

  repositories: Repository[];
}
