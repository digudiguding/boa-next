import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';

function add(a: number, b: number): number {
    return a + b;
}



export async function GET(request: Request) {
    // Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    // Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/sample_events.json', 'utf8');

    // Return the content of the data file in json format
    const jsonData = JSON.parse(fileContents);
    const c = add(1, 2)
    console.log(c)
    return NextResponse.json(jsonData)

}