export class UserAuthBase {
  userId: number = 0;
  userName: string = "";
  bearerToken: string = "";
  isAuthenticated: boolean = false;
  claims: AppUserClaim[] = [];
  name: string = "";

  init(): void {
    this.userName = "";
    this.bearerToken = "";
    this.isAuthenticated = false;
    this.claims = [];
    this.name = "";
  }
}

export class AppUserClaim  {
  claimId: string = "";
  userId: string = "";
  claimType: string = "";
  claimValue: string = "";
}
