import { useState } from "react";

interface Quote {
  quoteId: string;
  text: string;
}

function Home() {
  const token = localStorage.getItem("token");
  const [quote, setQuote] = useState<Quote | null>(null);
  
  const fetchQuote = async () => {
    console.log("token", token);
    
    const endpoint = token 
      ? "http://localhost:5173/api/Quotes/random"
      : "http://localhost:5136/api/Quotes/random-public";
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    console.log(response);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setQuote(data);
  };

  return (
    <div className="container">
      <button onClick={fetchQuote}>Give me some quote!</button>
      <div>
        {quote && (
          <div>
            <blockquote>{quote.text}</blockquote>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
