import { UserInfo } from "./user-info.interface";

export interface UserData {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: UserInfo[];
  }
  

