import { useState } from "react";

interface Quote {
  quoteId: string;
  text: string;
}

function Home() {
  const token = localStorage.getItem("token");
  const [quote, setQuote] = useState<Quote | null>(null);

  // Funkce pro načtení náhodného citátu pro nepřihlášené uživatele
  const fetchQuote = async () => {
    console.log("token", token);
    
    const endpoint = token 
      ? "http://localhost:5173/api/Quotes/random" // Endpoint pro přihlášené uživatele
      : "http://localhost:5136/api/Quotes/random-public"; // Endpoint pro nepřihlášené uživatele
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Přidáme autorizaci pouze pokud je token dostupný
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    console.log(response);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setQuote(data); // Nastavení citátu do stavu
  };

  return (
    <>
      <button onClick={fetchQuote}>Give me some quote!</button>
      <div>
        {quote && (
          <div>
            <blockquote>{quote.text}</blockquote>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
