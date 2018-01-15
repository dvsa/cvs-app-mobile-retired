import { Address } from './address';

export class Atf {
    private name: string;
    private address: Address;
    private siteNumber: string;
    
    constructor(name: string, address: Address, siteNumber: string) {
        this.name = name;
        this.address = address;
        this.siteNumber = siteNumber
    }

    getAddress(): Address {
        return this.address;
    }
}