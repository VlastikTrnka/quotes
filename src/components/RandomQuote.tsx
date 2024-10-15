import React from 'react';
import { Quote } from './Type';

interface RandomQuoteProps {
  randomQuote: Quote | null;
  setRandomQuote: (quote: Quote | null) => void;
  searchText: string;
  searchTag: string;
}

export function RandomQuote({ randomQuote, setRandomQuote, searchText, searchTag }: RandomQuoteProps) {
  const handleRandomQuote = async () => {
    const response = await fetch(`http://localhost:5136/api/quotes/random?text=${searchText}&tag=${searchTag}`);
    if (response.ok) {
      const data = await response.json();
      setRandomQuote(data);
    }
  };

  return (
    <div>
      <h3>Get Random Quote</h3>
      <button onClick={handleRandomQuote}>Fetch Random Quote</button>
      {randomQuote && <blockquote>{randomQuote.text}</blockquote>}
    </div>
  );
}
