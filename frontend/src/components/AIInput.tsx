import React, { useState } from 'react';

const AIInput = () => {

    const [input, setinput] = useState<string>(''); 
    const [response, setResponse] = useState<any>(null);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinput(event.target.value);
      };
    
      const submit = async () => {
        if (!input) {
          alert("Please enter a question!");
          return;
        }
      
        try {
          const response = await fetch("http://localhost:8000/input", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          setResponse(data);
          window.location.reload();
        } catch (error) {
          console.error("Error fetching prediction:", error);
          alert("Error fetching prediction. Check console for details.");
        }
      };

    return (
        <div className='input'>
            <input value={input} onChange={inputChange} placeholder='Ask questions'></input>
            <button onClick={submit}>Submit</button>
          </div>
    );
}

export default AIInput;