import { NextResponse } from "next/server";

const APIs = {
    equipements: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records",
    greenSpaces: "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records",
    fountains: "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records",
};

const DEFAULT_LIMIT = 100;

async function fetchAllData(apiUrl: string, page: number, limit: number) {
    let allData = [];
    let offset = page * limit;

    try {
        const res = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error(`API failed: ${res.status}`);

        const data = await res.json();
        const results = data.results ?? [];
        const totalCount = data.total_count ?? 0;

        allData.push(...results);
        return { data: allData, totalCount };

    } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error);
    }

    return { data: allData, totalCount: 0 };
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        const page = parseInt(url.searchParams.get("page") || "0", 10);
        const limit = parseInt(url.searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);

        console.log(`Fetching data for id ${id}: page ${page}, limit ${limit}`);

        const equipementsData = await fetchAllData(APIs.equipements, page, limit);

        const equipement = equipementsData.data.find((item: any) => item.identifiant === id);

        if (!equipement) {
            return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
        }

        return NextResponse.json({
            equipements: { data: [equipement], totalCount: 1 },
        });
    } catch (error) {
        console.error("API Fetch Error:", (error as Error).message);
        return NextResponse.json(
            { error: `Failed to fetch data: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}
