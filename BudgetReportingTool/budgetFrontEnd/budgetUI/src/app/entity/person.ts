import { Department } from './department';
import { Rate } from './rate';
import { Type } from './type';

export class Person {
    id: number;
    firstName: string;
    lastName: string;
    department: Department;
    rate: Rate;
    type: any;
}