export class Address {
    private address: string;
    private town: string;
    private postcode: string;
    private latitude: number;
    private longitude: number;
    distanceFromLocation: number; // this should be in the atf

    constructor(address: string, town: string, postcode: string, latitude: number, longitude: number) {
        this.address = address;
        this.town = town;
        this.postcode = postcode;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }
}