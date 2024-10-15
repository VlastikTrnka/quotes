import React from 'react';
import { Quote } from './Type';

interface QuoteListProps {
  quotes: Quote[];
  editQuoteId: number | null;
  editQuoteText: string;
  setEditQuoteId: (id: number | null) => void;
  setEditQuoteText: (text: string) => void;
  setQuotes: (quotes: Quote[]) => void;
  token: string | null;
}

export function QuoteList({ quotes, editQuoteId, editQuoteText, setEditQuoteId, setEditQuoteText, setQuotes, token }: QuoteListProps) {
  const handleEditQuote = async (quoteId: number) => {
    const response = await fetch(`http://localhost:5136/api/quotes/${quoteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text: editQuoteText }),
    });
    if (response.ok) {
      setQuotes(quotes.map(q => (q.quoteId === quoteId ? { ...q, text: editQuoteText } : q)));
      setEditQuoteId(null);
      setEditQuoteText('');
    }
  };

  return (
    <ul>
      {quotes.length > 0 ? (
        quotes.map(quote => (
          <li key={quote.quoteId}>
            {editQuoteId === quote.quoteId ? (
              <>
                <input value={editQuoteText} onChange={e => setEditQuoteText(e.target.value)} />
                <button onClick={() => handleEditQuote(quote.quoteId)}>Save</button>
                <button onClick={() => setEditQuoteId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {quote.text}
                <button onClick={() => {
                  setEditQuoteId(quote.quoteId);
                  setEditQuoteText(quote.text);
                }}>Edit</button>
              </>
            )}
          </li>
        ))
      ) : (
        <p>No quotes available</p>
      )}
    </ul>
  );
}
