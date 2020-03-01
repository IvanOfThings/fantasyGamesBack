export interface IMemory {
  levelBlock: number;
  title: string;
  details: string;
}

export interface IInputUser {
  id: string;
  name: string;
  email: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  memoryLevel: number;
  memories: IMemory[];
  transported: string;
}

export class User implements IUser {
  public id: string;
  public name: string;
  public email: string;
  public memoryLevel: number;
  public memories: IMemory[];
  public transported: string;

  constructor(
    nameOrUser: string | IUser,
    id?: string,
    email?: string,
    memoryLevel?: number,
    memories?: IMemory[],
    transported?: string
  ) {
    if (typeof nameOrUser === 'string') {
      this.id = id!;
      this.name = nameOrUser;
      this.email = email || '';
      this.memoryLevel = memoryLevel || 0;
      this.memories = memories || [];
      this.transported = transported || '';
    } else {
      this.id = nameOrUser.id;
      this.name = nameOrUser.name;
      this.email = nameOrUser.email;
      this.memoryLevel = nameOrUser.memoryLevel;
      this.memories = nameOrUser.memories;
      this.transported = nameOrUser.transported;
    }
  }
}
