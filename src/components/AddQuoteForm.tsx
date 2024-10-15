import React from 'react';

interface AddQuoteFormProps {
  newQuote: string;
  setNewQuote: (quote: string) => void;
  setQuotes: (quotes: any) => void;
  token: string | null;
}

export function AddQuoteForm({ newQuote, setNewQuote, setQuotes, token }: AddQuoteFormProps) {
  const handleAddQuote = async () => {
    const response = await fetch('http://localhost:5136/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text: newQuote }),
    });
    if (response.ok) {
      const newQuoteData = await response.json();
      setQuotes((quotes: any) => [...quotes, newQuoteData]);
      setNewQuote('');
    }
  };

  return (
    <div>
      <h3>Add a new quote</h3>
      <input type="text" value={newQuote} onChange={e => setNewQuote(e.target.value)} placeholder="New quote" />
      <button onClick={handleAddQuote}>Add Quote</button>
    </div>
  );
}
