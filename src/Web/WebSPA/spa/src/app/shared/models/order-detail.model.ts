import {IOrderItem} from './order-item.model';

export interface IOrderDetail {
    ordernumber: string;
    status: string;
    street: string;
    date: Date;
    city: number;
    state: string;
    zipcode: string;
    country: number;
    total: number;
    orderitems: IOrderItem[];
}