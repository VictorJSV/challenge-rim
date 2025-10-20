export interface UserDTO {
  name: string;
  lastName: string;
  birthDay: string;
}

export interface PlanDTO {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface PlansListDTO {
  list: Array<PlanDTO>;
}
