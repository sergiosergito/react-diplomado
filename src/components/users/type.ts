export type UserFilterStatusType = "all" | "active" | "inactive";

export type UserType = {
  id: number;
  username: string;
  password: string;
  status: string;
};
