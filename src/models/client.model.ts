import { MovementModel } from "./movement.model";

export interface ClientModel {
    key: string;
    firstName: string;
    lastName: string;
    debt?: number;
    movements?: MovementModel[];
}