// Enums for roles, blood types, storage status, etc.

export enum UserRole {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    COLLECTOR = "COLLECTOR",
    MANAGER = "MANAGER",
    HOSPITAL_REPRESENTATIVE = "HOSPITAL_REPRESENTATIVE",
    STORE_MANAGER = "STORE_MANAGER",
    LABORATORY = "LABORATORY",
  }
  
  export enum BloodType {
    A_POS = "A_POS",
    A_NEG = "A_NEG",
    B_POS = "B_POS",
    B_NEG = "B_NEG",
    AB_POS = "AB_POS",
    AB_NEG = "AB_NEG",
    O_POS = "O_POS",
    O_NEG = "O_NEG",
  }
  
  export enum StorageStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED",
    USED = "USED",
    EXPIRED = "EXPIRED",
  }
  
  export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
  }
  
  export enum IntegrationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
  }
  