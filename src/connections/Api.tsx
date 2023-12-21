import { ApiData, citiesInterface } from "@/state/AppInteface";

export class Api {
    public static url = "https://simrikstudio.com/drive&listen/server.php";

    public static async get() {
        try {
            const response = await fetch(this.url);

            if (response.status !== 200) {
                throw new Error("Api error");
            }

            const data = await response.json();
            const datas: ApiData[] = data;
            const sortedData = datas.sort(this.compareApiData) as ApiData[];
            return sortedData;
        } catch (error) {
            console.error("Error fetching data:", error);
            return Promise.resolve([{
                country: "Loading...",
                cities: [{
                    city: "Loading",
                    orginalUrl: [],
                }],
                radios: [{
                    stationName: "Loading",
                    src: undefined,
                }],
            }]);
        }
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
