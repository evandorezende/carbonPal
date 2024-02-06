import { NextResponse } from "next/server";
import executeQuery from "../../../db/db";
import axios from 'axios';

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const { origin, destination, volume, weight } = body;

        const query = `
        SELECT equipment.*, fuel.type AS fuel_type, fuel.emission_factor
        FROM equipment
        LEFT JOIN fuel ON equipment.fuel_id = fuel.id
        WHERE equipment.max_weight >= ?
        ORDER BY equipment.max_weight ASC
        LIMIT 1
        `;

        let equipment: any = await executeQuery({
            query,
            values: [weight] // Pass the weight as a parameter to the query
        });

        if (!equipment.length) {
            equipment = await executeQuery({
                query:
                    `SELECT equipment.*, fuel.type AS fuel_type, fuel.emission_factor
            FROM equipment
            LEFT JOIN fuel ON equipment.fuel_id = fuel.id
            ORDER BY equipment.max_weight DESC
            LIMIT 1
            `,
            });
        }

        if (!equipment.length) {
            return new NextResponse("No Equipment", { status: 500 })
        }

        const { emission_factor, fuel_consumption, max_weight } = equipment[0] ?? {};

        if (!origin || !destination) {
            return new NextResponse("Addresses are required", { status: 400 });
        }

        const resp = await axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&transit_mode=driving&units=imperial&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
            headers: {}
        });

        const distance = resp.data.rows?.[0]?.elements?.[0]?.distance?.value;

        if (resp.data.rows?.length === 0) {
            return new NextResponse("Maps Api Not Available", { status: 503 });
        }

        if (resp.data.rows?.[0]?.elements?.[0]?.status === 'ZERO_RESULTS') {
            return new NextResponse("Invalid Address", { status: 400 });
        }

        let trips = 1;
        if (weight > max_weight) {
            trips = Math.ceil(weight / max_weight);
        }

        let ocupancyFactor = 1;
        if (weight < max_weight) {
            ocupancyFactor = weight / max_weight;
        }

        // conver to tonCO2e
        const carbonFootprint = (((distance / 1000 * 1.60934) * ocupancyFactor * emission_factor) / fuel_consumption / 1000) * trips;

        // Convert weight to a number
        const weightNumber = Number(weight);
        const volumeNumber = Number(volume);

        const weightFormatted = !isNaN(weightNumber) ? weightNumber.toFixed(2) : 'N/A';
        const volumeFormatted = !isNaN(volumeNumber) ? volumeNumber.toFixed(2) : 'N/A';

        const offsetCompanies: any = await executeQuery({
            query: `SELECT * FROM offset_company`
        });

        if (!offsetCompanies.length) {
            return new NextResponse("No Offset Company", { status: 500 });
        }

        // create an array of offset companies
        const offsetCompanyArray = offsetCompanies.map((company: any) => ({
            name: company.name,
            cost: (carbonFootprint * company.price_per_ton).toFixed(2)
        }));

        const response = {
            carbonFootprint: carbonFootprint.toFixed(6),
            equipment: equipment[0].name,
            weight: weightFormatted,
            distance: distance.toFixed(2),
            trips,
            volume: volumeFormatted,
            offset: offsetCompanyArray
        }

        return NextResponse.json(response);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}