export class User {
    private userId: string;
    private email: string;
    private createdAt: Date;
  
    constructor(userId: string, email: string, createdAt: Date = new Date()) {
      this.userId = userId;
      this.email = email;
      this.createdAt = createdAt;
    }
  
    getUserId(): string {
      return this.userId;
    }
  
    setUserId(userId: string): void {
      this.userId = userId;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    setEmail(email: string): void {
      this.email = email;
    }
  
    getCreatedAt(): Date {
      return this.createdAt;
    }
}

export class Infrastructure {
    private infraId: string;
    private userId: string;
    private configData: object;
    private createdAt: Date;
  
    constructor(infraId: string, userId: string, configData: object, createdAt: Date = new Date()) {
      this.infraId = infraId;
      this.userId = userId;
      this.configData = configData;
      this.createdAt = createdAt;
    }
  
    getInfraId(): string {
      return this.infraId;
    }
  
    setInfraId(infraId: string): void {
      this.infraId = infraId;
    }
  
    getUserId(): string {
      return this.userId;
    }
  
    setUserId(userId: string): void {
      this.userId = userId;
    }
  
    getConfigData(): object {
      return this.configData;
    }
  
    setConfigData(configData: object): void {
      this.configData = configData;
    }
  
    getCreatedAt(): Date {
      return this.createdAt;
    }
}

export class CostEstimation {
    private estimationId: string;
    private infraId: string;
    private estimatedCost: number;
    private calculatedAt: Date;
  
    constructor(estimationId: string, infraId: string, estimatedCost: number, calculatedAt: Date = new Date()) {
      this.estimationId = estimationId;
      this.infraId = infraId;
      this.estimatedCost = estimatedCost;
      this.calculatedAt = calculatedAt;
    }
  
    getEstimationId(): string {
      return this.estimationId;
    }
  
    setEstimationId(estimationId: string): void {
      this.estimationId = estimationId;
    }
  
    getInfraId(): string {
      return this.infraId;
    }
  
    setInfraId(infraId: string): void {
      this.infraId = infraId;
    }
  
    getEstimatedCost(): number {
      return this.estimatedCost;
    }
  
    setEstimatedCost(estimatedCost: number): void {
      this.estimatedCost = estimatedCost;
    }
  
    getCalculatedAt(): Date {
      return this.calculatedAt;
    }
}

export class SecurityReport {
    private reportId: string;
    private infraId: string;
    private issues: string[];
    private reportGeneratedAt: Date;
  
    constructor(reportId: string, infraId: string, issues: string[], reportGeneratedAt: Date = new Date()) {
      this.reportId = reportId;
      this.infraId = infraId;
      this.issues = issues;
      this.reportGeneratedAt = reportGeneratedAt;
    }
  
    getReportId(): string {
      return this.reportId;
    }
  
    setReportId(reportId: string): void {
      this.reportId = reportId;
    }
  
    getInfraId(): string {
      return this.infraId;
    }
  
    setInfraId(infraId: string): void {
      this.infraId = infraId;
    }
  
    getIssues(): string[] {
      return this.issues;
    }
  
    setIssues(issues: string[]): void {
      this.issues = issues;
    }
  
    getReportGeneratedAt(): Date {
      return this.reportGeneratedAt;
    }
}

export class DiagramUpload {
    private uploadId: string;
    private userId: string;
    private filePath: string;
    private uploadedAt: Date;
  
    constructor(uploadId: string, userId: string, filePath: string, uploadedAt: Date = new Date()) {
      this.uploadId = uploadId;
      this.userId = userId;
      this.filePath = filePath;
      this.uploadedAt = uploadedAt;
    }
  
    getUploadId(): string {
      return this.uploadId;
    }
  
    setUploadId(uploadId: string): void {
      this.uploadId = uploadId;
    }
  
    getUserId(): string {
      return this.userId;
    }
  
    setUserId(userId: string): void {
      this.userId = userId;
    }
  
    getFilePath(): string {
      return this.filePath;
    }
  
    setFilePath(filePath: string): void {
      this.filePath = filePath;
    }
  
    getUploadedAt(): Date {
      return this.uploadedAt;
    }
}

export class JobStatus {
    private jobId: string;
    private infraId: string;
    private status: string;
    private updatedAt: Date;
  
    constructor(jobId: string, infraId: string, status: string, updatedAt: Date = new Date()) {
      this.jobId = jobId;
      this.infraId = infraId;
      this.status = status;
      this.updatedAt = updatedAt;
    }
  
    getJobId(): string {
      return this.jobId;
    }
  
    setJobId(jobId: string): void {
      this.jobId = jobId;
    }
  
    getInfraId(): string {
      return this.infraId;
    }
  
    setInfraId(infraId: string): void {
      this.infraId = infraId;
    }
  
    getStatus(): string {
      return this.status;
    }
  
    setStatus(status: string): void {
      this.status = status;
    }
  
    getUpdatedAt(): Date {
      return this.updatedAt;
    }
}
  
  
  