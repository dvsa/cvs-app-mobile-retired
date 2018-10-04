import { AddressModel } from './address.model';

export class AtfModel {
    private name: string;
    private address: AddressModel;
    private siteNumber: string;
    
    constructor(name: string, address: AddressModel, siteNumber: string) {
        this.name = name;
        this.address = address;
        this.siteNumber = siteNumber
    }

    getAddress(): AddressModel {
        return this.address;
    }
}
