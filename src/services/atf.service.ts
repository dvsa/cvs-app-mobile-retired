import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AtfModel} from '../models/atf.model';
import {AddressModel} from '../models/address.model';

@Injectable()
export class AtfService {

  constructor() {
  }

  getAtfs(): Observable<AtfModel[]> {
    return of(ATFS);
  }

  getClosestAtf(): Observable<AtfModel> {
    return of(ATFS[0]);
  }
}

// MOCKED ATFS & ADDRESSES

let address1 = new AddressModel("Woodend Ave", "Liverpool", "L24 9NB", 53.350456, -2.850416);
address1.distanceFromLocation = 1;
let address2 = new AddressModel("36 Greenhey Place", "Skelmersdale", "WN8 9SA", 53.545144, -2.790066);
address2.distanceFromLocation = 5;
let address3 = new AddressModel("Shepcote Lane", "Sheffield", "S9 1TX", 53.4034202, -1.4083971);
address3.distanceFromLocation = 8;
let address4 = new AddressModel("252 Anlaby", "Hull", "HU3 2RS", 53.7435128, -0.3645868);
address4.distanceFromLocation = 13;
let address5 = new AddressModel("New York Way", "Newcastle Upon Tyne", "NE27 0QE", 55.0189855, -1.4967935);
address5.distanceFromLocation = 15;
let address6 = new AddressModel("Luton Road", "Dunstable", "LU5 4QF", 51.8892378, -0.5045263);
address6.distanceFromLocation = 23;
let address7 = new AddressModel("Ashbourne Road", "Derby", "DE22 4NB", 52.9355494, -1.5379441);
address7.distanceFromLocation = 45;
let address8 = new AddressModel("Langbridge", "Sandown", "PO36 0NP", 50.6707952, -1.2114675);
address8.distanceFromLocation = 89;
let address9 = new AddressModel("Cambridge Road", "Leicester", "LE8 6LH", 52.5658989, -1.1796595);
address9.distanceFromLocation = 93;
let address10 = new AddressModel("Leeds Road", "Batley", "WF17 0JB", 53.7391348, -1.6361753);
address10.distanceFromLocation = 98;
let address11 = new AddressModel("Quarry Crescent", "Launceston", "PL15 7ED", 50.6270049, -4.3765422);
address11.distanceFromLocation = 104;
let address12 = new AddressModel("Holyhead Road", "Llangollen", "LL20 7RA", 52.9620697, -3.0829324);
address12.distanceFromLocation = 121;
let address13 = new AddressModel("3 West Road", "Radstock", "BA3 2TP", 51.2927382, -2.4789433);
address13.distanceFromLocation = 144;
let address14 = new AddressModel("Blenheim Way", "Peterborough", "PE6 8LD", 52.6854914, -0.3142264);
address14.distanceFromLocation = 156;

export const ATFS: AtfModel[] = [
  new AtfModel("South Liverpool Commercials", address1, "P1234 ABCD"),
  new AtfModel("RNB Commercials", address2, "P1234 ABCD"),
  new AtfModel("HRVS Sheffield", address3, "P1234 ABCD"),
  new AtfModel("East Yorkshire Motor Services", address4, "P1234 ABCD"),
  new AtfModel("Ramage Transport", address5, "P1234 ABCD"),
  new AtfModel("Renault Trucks (Chiltern)", address6, "P1234 ABCD"),
  new AtfModel("Imperial Commercials - Derby", address7, "P1234 ABCD"),
  new AtfModel("Bartletts Service Station", address8, "P1234 ABCD"),
  new AtfModel("Beaver Bus", address9, "P1234 ABCD"),
  new AtfModel("Leeds Fleet Services", address10, "P1234 ABCD"),
  new AtfModel("Pannell Commercials", address11, "P1234 ABCD"),
  new AtfModel("AN Richards", address12, "P1234 ABCD"),
  new AtfModel("Centurion Travel", address13, "P1234 ABCD"),
  new AtfModel("Wilcox Commercial Vehicles", address14, "P1234 ABCD"),
];
