export interface UpdateUser {
  _id: string;
  userName: string;
  login: string;
  password: string;
  role: string;
}

export interface UpdateProject {
  _id: string;
  projectName: string;
  users: string[];
}

export interface UpdateTask {
  _id: string;
  userId: string;
  description: string;
  startDate: string;
  endDate: string;
  taskName: string;
  project: string;
  taskStatus: string;
  isCurrent: boolean;
  startStopHistory: string[];
}

export interface UpdateTaskList {
  userId: string;
  taskId: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
  userId: string;
}

export interface DataStoredInToken {
  _id: string;
}

export interface LoginDto {
  login: string;
  password: string;
}
