import React, { useState, useEffect } from 'react';

const BasicStockData: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/basic_data`);
        const text = await response.json();
        setData(text);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const parsedData = (() => {
    const trimmed = data.trim();
    const withoutBraces =
      trimmed.startsWith("{") && trimmed.endsWith(")")
        ? trimmed.slice(1, -1)
        : trimmed.startsWith("{") && trimmed.endsWith("}")
        ? trimmed.slice(1, -1)
        : trimmed;
      
    const keyValuePairs = withoutBraces.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); //looks for even number of quotes and only splits quotes outside of content
    
    return keyValuePairs.map(pair => {
      const [rawKey, rawValue] = pair.split(/:(.+)/);
      const key = rawKey.trim().replace(/^"|"$/g, "");
      let value = rawValue.trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      return { key, value };
    });
  })();

  return (
    <table>
      <tbody>
        {parsedData.map(({ key, value }) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
);};

export default BasicStockData;