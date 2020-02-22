export interface IMemory {
  levelBlock: number;
  title: string;
  details: string;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  memoryLevel: number;
  memories: IMemory[];
}

export class User implements IUser {
  public id?: number;
  public name: string;
  public email: string;
  public memoryLevel: number;
  public memories: IMemory[];

  constructor(
    nameOrUser: string | IUser,
    email?: string,
    memoryLevel?: number,
    memories?: IMemory[]
  ) {
    if (typeof nameOrUser === 'string') {
      this.name = nameOrUser;
      this.email = email || '';
      this.memoryLevel = memoryLevel || 0;
      this.memories = memories || [];
    } else {
      this.name = nameOrUser.name;
      this.email = nameOrUser.email;
      this.memoryLevel = nameOrUser.memoryLevel;
      this.memories = nameOrUser.memories;
    }
  }
}
