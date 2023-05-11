import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';


function processEvents(events: EventData[]) {
    let FinalConfig: any;
    let Output: {}[] = []
    let OutputDict = {}
    let existingFx: any = {}
    let calculation: any = {}
    let calculationArray: any = []
    events.forEach((event) => {

        // Process each event and update the input accordingly
        switch (event.EventType) {
            case 'ConfigEvent':
                /* A variable to store the ConfigEvent */
                FinalConfig = event as ConfigEvent;
                OutputDict = {
                    EventID: event.EventId,
                    EventType: event.EventType,
                    Config: {
                        EventID: FinalConfig.EventId,
                        EventType: FinalConfig.EventType,
                        m: FinalConfig.m,
                        b: FinalConfig.b,
                        DivisorRatio: FinalConfig.DivisorRatio,
                        Spread: FinalConfig.Spread,
                    },
                    fx: existingFx,
                    // calculation: calculationArray


                };
                break;
            case 'TradeEvent':
                calculation = {}
                let newEvent = event as TradeEvent;
                /* Check if there exists the currency */
                if (calculationArray.length == 0) {
                    calculation["Ccy"] = newEvent.Ccy;
                    calculation["Tenor"] = newEvent.Tenor;

                    if (newEvent.BuySell == 'buy') {
                        calculation["position"] = newEvent.Quantity
                    } else {
                        calculation["position"] = -newEvent.Quantity
                    }
                }
                // Loop through the array of object, check if CCy exists
                for (var j = 0; j < calculationArray.length; j++) {
                    // If it is the same, do calcuation based on sell/buy
                    calculation["Ccy"] = newEvent.Ccy;
                    calculation["Tenor"] = newEvent.Tenor;
                    if (calculationArray[j].Ccy == newEvent.Ccy) {
                        if (newEvent.BuySell == 'buy') {
                            calculation["position"] = calculation["position"] + newEvent.Quantity
                        } else {
                            calculation["position"] = calculation["position"] - newEvent.Quantity
                        }

                    } else {
                        if (newEvent.BuySell == 'buy') {
                            calculation["position"] = newEvent.Quantity
                        } else {
                            calculation["position"] = -newEvent.Quantity
                        }
                    }
                }
                console.log(newEvent.EventId)
                console.log(calculation)
                calculationArray.push(JSON.parse(JSON.stringify(calculation)));

                /* Caluclate the position */





                OutputDict = {
                    EventID: newEvent.EventId,
                    EventType: newEvent.EventType,
                    Config: {
                        EventID: FinalConfig.EventId,
                        EventType: FinalConfig.EventType,
                        m: FinalConfig.m,
                        b: FinalConfig.b,
                        DivisorRatio: FinalConfig.DivisorRatio,
                        Spread: FinalConfig.Spread,
                    },
                    fx: existingFx,
                    // calculation: calculationArray,
                };
                break;
            case 'FXMidEvent':
                let FxEvent = event as FXMidEvent;
                existingFx[FxEvent.Ccy] = FxEvent.rate;



                OutputDict = {
                    EventID: event.EventId,
                    EventType: event.EventType,
                    Config: {
                        EventID: FinalConfig.EventId,
                        EventType: FinalConfig.EventType,
                        m: FinalConfig.m,
                        b: FinalConfig.b,
                        DivisorRatio: FinalConfig.DivisorRatio,
                        Spread: FinalConfig.Spread,
                    },
                    fx: existingFx
                };
                console.log(OutputDict)
                break;
            default:
                throw new Error('Unknown event type');

        }
        /* Calculation */
        Output.push(JSON.parse(JSON.stringify(OutputDict)));

    });
    return Output;
}


async function getEventData(): Promise<any> {
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/sample_events.json', 'utf8'); const eventData: any = JSON.parse(fileContents);
    const sample_events = JSON.parse(fileContents);
    return sample_events;
}
export async function POST(request: Request) {
    const eventData: EventData[] = await getEventData();

    // const { input } = request.body;
    const output = processEvents(eventData);

    return NextResponse.json(output)

}