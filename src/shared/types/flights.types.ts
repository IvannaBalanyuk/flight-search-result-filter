/* eslint-disable @typescript-eslint/no-explicit-any */
type CarrierType = {
  uid: string;
  caption: string;
  airlineCode: string;
};

type PassengerType = {
  uid: string;
  caption: string;
};

type PriceInfoType = {
  amount: string;
  currency?: string;
  currencyCode: string;
};

type RatesType = {
  totalUsd: PriceInfoType;
  totalEur: PriceInfoType;
};

type PassengerPricesType = {
  total: PriceInfoType;
  passengerType: PassengerType;
  singlePassengerTotal: PriceInfoType;
  passengerCount: number;
  tariff: PriceInfoType;
  feeAndTaxes: PriceInfoType;
};

type PriceType = {
  total: PriceInfoType;
  totalFeeAndTaxes: PriceInfoType;
  rates: RatesType;
  passengerPrices: Array<PassengerPricesType>;
};

type AirportType = {
  uid: string;
  caption: string;
};

type CityType = {
  uid: string;
  caption: string;
};

type AirlineType = {
  uid: string;
  caption: string;
  airlineCode: string;
};

export type SegmentType = {
  classOfServiceCode: string;
  classOfService: any;
  departureAirport: AirportType;
  departureCity?: CityType;
  aircraft: any;
  travelDuration: number;
  arrivalCity?: CityType;
  arrivalDate: string;
  flightNumber: string;
  techStopInfos: Array<any>;
  departureDate: string;
  stops: number;
  servicesDetails: any;
  airline: AirlineType;
  starting: boolean;
  arrivalAirport: AirportType;
  operatingAirline?: AirlineType;
};

export type FlightLegType = {
  duration: number;
  segments: Array<SegmentType>;
};

export type FlightType = {
  carrier: CarrierType;
  price: PriceType;
  servicesStatuses: any;
  legs: Array<FlightLegType>;
  airlineAlliance?: any;
  exchange: any;
  isTripartiteContractDiscountApplied: boolean;
  international: boolean;
  seats: Array<any>;
  refund: any;
};

export type FlightInfoType = {
  hasExtendedFare: boolean;
  flight: FlightType;
  flightToken: string;
};
