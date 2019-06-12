export interface IRole {
  id?: number;
  roleName?: string;
  canDelete?: boolean;
}

export class Role implements IRole {
  constructor(public id?: number, public roleName?: string, public canDelete?: boolean) {
    this.canDelete = this.canDelete || false;
  }
}
