"use client"
import { useEffect, useState } from 'react';

export default function TEDP() {
  const [jsonData, setJsonData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedEntries, setDisplayedEntries] = useState([]);
  



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/dataproducer');
      const data = await response.json();
      setJsonData(data);
    };
    fetchData();
  }, []);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedEntries(entries => {
        if (entries.length === jsonData.length) {
          clearInterval(interval);
          return entries;
        }
        return entries.concat(jsonData.slice(entries.length, entries.length + 1));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [jsonData]);

  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      setDisplayedEntries(entries => entries.concat(jsonData.slice(0, currentIndex)));
    }
  }, [jsonData, currentIndex]);

  const currentEntry = jsonData && jsonData[currentIndex];

  return (
 <div>
      {displayedEntries.map(entry => (
        <div key={entry.EventId}>
          {entry.EventType === 'TradeEvent' && (
            <div>
              <p>EventId: {entry.EventId}</p>
              <p>EventType: {entry.EventType}</p>
              <p>Ccy: {entry.Ccy}</p>
              <p>BuySell: {entry.BuySell}</p>
              <p>Tenor: {entry.Tenor}</p>
              <p>Quantity: {entry.Quantity}</p>
              <p>TradeId: {entry.TradeId}</p>
              <p>-------------------------</p>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
