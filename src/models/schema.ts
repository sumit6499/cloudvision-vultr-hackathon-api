enum Status {
  NOT_STARTED = 'NOT_STARTED',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED'
}

enum Currency {
  RS = 'RS',
  USD = 'USD'
}

export class User {
  userId?:string
  name: string;
  email: string;
  passwordHash: string;

  constructor( name: string, email: string, passwordHash: string) {
      this.name = name;
      this.email = email;
      this.passwordHash = passwordHash;
  }

  public setUserId(id:string){
    this.userId=id
  }

}

export class Diagrams {
  id?: string;
  userID: string;
  userId?: string;
  url: string;
  status: Status;
  terraformID?: string;

  constructor(userID: string, url: string, status: Status = Status.NOT_STARTED, uploadAt: Date = new Date(), terraformID?: string) {
      this.userID = userID;
      this.url = url;
      this.status = status;
      this.terraformID = terraformID;
  }
}

export class Terraform {
  id: string;
  uploadedAt: Date;
  terraformCode: string;
  status: Status;

  constructor(id: string, terraformCode: string, status: Status = Status.NOT_STARTED, uploadedAt: Date = new Date()) {
      this.id = id;
      this.terraformCode = terraformCode;
      this.status = status;
      this.uploadedAt = uploadedAt;
  }
}

export class Cost {
  id: string;
  estimatedCost: number;
  currency: Currency;

  constructor(id: string, estimatedCost: number = 0.0, currency: Currency = Currency.RS) {
      this.id = id;
      this.estimatedCost = estimatedCost;
      this.currency = currency;
  }
}
