export interface UserDTO {
  name: string;
  lastName: string;
  birthDay: string;
}

export interface PlansDTO {
  list: Array<{
    name: string;
    price: number;
    description: string[];
    age: number;
  }>;
}
