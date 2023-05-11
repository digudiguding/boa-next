

interface Input {
    // Define the input properties
}

interface Output {
    // Define the output properties
}

interface EventData {
    EventId: number;
    EventType: string;
}

interface ConfigEvent extends EventData {
    m: number;
    b: number;
    DivisorRatio: number;
    Spread: number;
}

interface TradeEvent extends EventData {
    Ccy: string;
    BuySell: string;
    Tenor: string;
    Quantity: number;
    TradeId: string;
}

interface FXMidEvent extends EventData {
    Ccy: string;
    rate: number;
}