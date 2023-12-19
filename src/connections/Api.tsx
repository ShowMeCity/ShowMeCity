import axios from "axios";
import { ApiData, citiesInterface } from "@/state/AppInteface";


export class Api {
    public static url = "http://10.0.0.199/drive&listen/server.php";
    public static async get() {
        const response = await fetch(this.url);
        if (response.status !== 200) {
            throw new Error("Api error");
        }
        const data: ApiData[] = await response.json();

        return data.sort(this.compareApiData);
    }
    public static compareApiData(a: ApiData, b: ApiData): number {
        // First, compare by country
        const countryComparison = a.country.localeCompare(b.country);
        if (countryComparison !== 0) {
            return countryComparison;
        }

        // If countries are the same, compare by cities
        const citiesA = a.cities as citiesInterface[];
        const citiesB = b.cities as citiesInterface[];
        const cityA = citiesA.length > 0 ? citiesA[0].city : ''; // Assuming the first city is the primary one
        const cityB = citiesB.length > 0 ? citiesB[0].city : '';

        return cityA.localeCompare(cityB);
    }
}