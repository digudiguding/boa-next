import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';


export async function GET(request: Request) {
    // Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    // Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/sample_events.json', 'utf8');

    // Return the content of the data file in json format
    const jsonData = JSON.parse(fileContents);
    return NextResponse.json(jsonData)

}