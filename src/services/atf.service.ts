import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Atf } from '../models/atf';
import { Address } from '../models/address';

@Injectable()
export class AtfService {

    constructor() { }

    getAtfs(): Observable<Atf[]> {
        return of(ATFS);
    }

    getClosestAtf(): Observable<Atf> {
        return of(ATFS[0]);
    }
}

// MOCKED ATFS & ADDRESSES

var address1 = new Address("Woodend Ave", "Liverpool", "L24 9NB", 53.350456, -2.850416);
address1.distanceFromLocation = 1;
var address2 = new Address("36 Greenhey Place", "Skelmersdale", "WN8 9SA", 53.545144, -2.790066);
address2.distanceFromLocation = 5;
var address3 = new Address("Shepcote Lane", "Sheffield", "S9 1TX", 53.4034202, -1.4083971);
address3.distanceFromLocation = 8;
var address4 = new Address("252 Anlaby", "Hull", "HU3 2RS", 53.7435128, -0.3645868);
address4.distanceFromLocation = 13;
var address5 = new Address("New York Way", "Newcastle Upon Tyne", "NE27 0QE", 55.0189855, -1.4967935);
address5.distanceFromLocation = 15;
var address6 = new Address("Luton Road", "Dunstable", "LU5 4QF", 51.8892378, -0.5045263);
address6.distanceFromLocation = 23;
var address7 = new Address("Ashbourne Road", "Derby", "DE22 4NB", 52.9355494, -1.5379441);
address7.distanceFromLocation = 45;
var address8 = new Address("Langbridge", "Sandown", "PO36 0NP", 50.6707952, -1.2114675);
address8.distanceFromLocation = 89;
var address9 = new Address("Cambridge Road", "Leicester", "LE8 6LH", 52.5658989, -1.1796595);
address9.distanceFromLocation = 93;
var address10 = new Address("Leeds Road", "Batley", "WF17 0JB", 53.7391348, -1.6361753);
address10.distanceFromLocation = 98;
var address11 = new Address("Quarry Crescent", "Launceston", "PL15 7ED", 50.6270049, -4.3765422);
address11.distanceFromLocation = 104;
var address12 = new Address("Holyhead Road", "Llangollen", "LL20 7RA", 52.9620697, -3.0829324);
address12.distanceFromLocation = 121;
var address13 = new Address("3 West Road", "Radstock", "BA3 2TP", 51.2927382, -2.4789433);
address13.distanceFromLocation = 144;
var address14 = new Address("Blenheim Way", "Peterborough", "PE6 8LD", 52.6854914, -0.3142264);
address14.distanceFromLocation = 156;

export const ATFS: Atf[] = [
    new Atf("South Liverpool Commercials", address1, "P1234 ABCD"),
    new Atf("RNB Commercials", address2, "P1234 ABCD"),
    new Atf("HRVS Sheffield", address3, "P1234 ABCD"),
    new Atf("East Yorkshire Motor Services", address4, "P1234 ABCD"),
    new Atf("Ramage Transport", address5, "P1234 ABCD"),
    new Atf("Renault Trucks (Chiltern)", address6, "P1234 ABCD"),
    new Atf("Imperial Commercials - Derby", address7, "P1234 ABCD"),
    new Atf("Bartletts Service Station", address8, "P1234 ABCD"),
    new Atf("Beaver Bus", address9, "P1234 ABCD"),
    new Atf("Leeds Fleet Services", address10, "P1234 ABCD"),
    new Atf("Pannell Commercials", address11, "P1234 ABCD"),
    new Atf("AN Richards", address12, "P1234 ABCD"),
    new Atf("Centurion Travel", address13, "P1234 ABCD"),
    new Atf("Wilcox Commercial Vehicles", address14, "P1234 ABCD"),
];