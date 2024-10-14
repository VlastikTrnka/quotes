import { useState, useEffect } from 'react';

interface Quote {
  quoteId: number;
  text: string;
}

interface Tag {
  tagId: number;
  text: string;
}

function UserProfile() {
  const [quotes, setQuotes] = useState<Quote[]>([]); // Výchozí hodnota bude prázdné pole
  const [newQuote, setNewQuote] = useState('');
  const [editQuoteId, setEditQuoteId] = useState<number | null>(null);
  const [editQuoteText, setEditQuoteText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState(''); // Pro uložení vybraného tagu
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [searchResults, setSearchResults] = useState<Quote[]>([]); // Pole pro uložení výsledků hledání
  const [tags, setTags] = useState<Tag[]>([]); // Pro uložení dostupných tagů

  const token = localStorage.getItem('token');

  // Načítání citátů uživatele při načtení komponenty
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!token) {
        console.log('No token found, please log in.');
        return;
      }

      const response = await fetch('http://localhost:5136/api/quotes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data.data || []); // Pokud data neexistují, nastavíme prázdné pole
      } else {
        console.log('Failed to fetch quotes');
      }
    };

    fetchQuotes();
  }, [token]);

  // Načítání dostupných tagů při načtení komponenty
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:5136/api/tags'); // API endpoint pro tagy
        if (response.ok) {
          const data = await response.json();
          setTags(data); // Nastavení tagů
        } else {
          console.log('Failed to fetch tags');
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Přidávání nového citátu
  const handleAddQuote = async () => {
    const response = await fetch('http://localhost:5136/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newQuote }),
    });

    if (response.ok) {
      const newQuoteData = await response.json();
      setQuotes([...quotes, newQuoteData]);
      setNewQuote('');
    } else {
      console.log('Failed to add quote');
    }
  };

  // Aktualizace citátu
  const handleEditQuote = async (quoteId: number) => {
    const response = await fetch(`http://localhost:5136/api/quotes/${quoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: editQuoteText }),
    });

    if (response.ok) {
      setQuotes(
        quotes.map((q) => (q.quoteId === quoteId ? { ...q, text: editQuoteText } : q))
      );
      setEditQuoteId(null);
      setEditQuoteText('');
    } else {
      console.log('Failed to edit quote');
    }
  };

  // Vyhledávání citátů podle textu nebo tagů
  const handleSearchQuotes = async () => {
    console.log("Starting search with text:", searchText, "and tag:", searchTag);
    
    const url = `http://localhost:5136/api/quotes/by-text-or-tag?text=${searchText}&tag=${searchTag}`;
    console.log("Sending GET request to:", url);
    
    try {
      const response = await fetch(url);
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Search results:", data);
        setSearchResults(data.$values || []); // Získáme citáty z $values
      } else {
        console.log('Failed to search quotes');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  // Výběr náhodného citátu podle textu nebo tagu
  const handleRandomQuote = async () => {
    const response = await fetch(
      `http://localhost:5136/api/quotes/random?text=${searchText}&tag=${searchTag}`
    );

    if (response.ok) {
      const data = await response.json();
      setRandomQuote(data);
    } else {
      console.log('Failed to fetch random quote');
    }
  };

  return (
    <div className="quotes-container">
      <h2>Your Quotes</h2>
      <ul>
        {Array.isArray(quotes) && quotes.length > 0 ? (
          quotes.map((quote) => (
            <li key={quote.quoteId}>
              {editQuoteId === quote.quoteId ? (
                <>
                  <input
                    value={editQuoteText}
                    onChange={(e) => setEditQuoteText(e.target.value)}
                  />
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

      <h3>Add a new quote</h3>
      <input
        type="text"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
        placeholder="New quote"
      />
      <button onClick={handleAddQuote}>Add Quote</button>

      <h3>Search Quotes</h3>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search text"
      />

      <select
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
      >
        <option value="">-- Select a tag --</option>
        {tags.map((tag) => (
          <option key={tag.tagId} value={tag.text}>{tag.text}</option>
        ))}
      </select>
      <button onClick={handleSearchQuotes}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((quote: any, index: number) => (
            <p key={index}>{quote.Text}</p>
          ))
        ) : (
          <p>No search results found</p>
        )}
      </div>

      <h3>Get Random Quote</h3>
      <button onClick={handleRandomQuote}>Fetch Random Quote</button>
      {randomQuote && <blockquote>{randomQuote.text}</blockquote>}
    </div>
  );
}

export default UserProfile;
