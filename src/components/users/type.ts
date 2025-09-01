export type UserFilterStatusType = "active" | "inactive";

export type UserType = {
  id: number;
  username: string;
  password: string;
  status: string;
};
