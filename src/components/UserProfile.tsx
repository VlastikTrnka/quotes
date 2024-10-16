import React, { useState, useEffect } from 'react';
import { QuoteList } from './QuoteList';
import { AddQuoteWithTagsForm } from './AddQuoteWithTagsForm';
import { SearchQuotes } from './SearchQuotes';
import { RandomQuote } from './RandomQuote';
import { AddTagForm } from './AddTagForm';
import { Quote, Tag } from './Type';

export function UserProfile() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState('');
  const [editQuoteId, setEditQuoteId] = useState<number | null>(null);
  const [editQuoteText, setEditQuoteText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [searchResults, setSearchResults] = useState<Quote[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Získej userId z localStorage nebo odkudkoli je uloženo

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!token) return;
      const response = await fetch('http://localhost:5136/api/quotes', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setQuotes(data.data || []);
      }
    };
    fetchQuotes();
  }, [token]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('http://localhost:5136/api/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="quotes-container">
      <h2>Your Quotes</h2>
      <QuoteList
        quotes={quotes}
        editQuoteId={editQuoteId}
        editQuoteText={editQuoteText}
        setEditQuoteId={setEditQuoteId}
        setEditQuoteText={setEditQuoteText}
        setQuotes={setQuotes}
        token={token}
      />
      <AddQuoteWithTagsForm
        newQuote={newQuote}
        setNewQuote={setNewQuote}
        setQuotes={setQuotes}
        tags={tags}
        token={token}
      />
      <AddTagForm setTags={setTags} token={token} />
      <SearchQuotes
        searchText={searchText}
        setSearchText={setSearchText}
        searchTag={searchTag}
        setSearchTag={setSearchTag}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        tags={tags}
      />
      <RandomQuote
        randomQuote={randomQuote}
        setRandomQuote={setRandomQuote}
        searchText={searchText}
        searchTag={searchTag}
      />
    </div>
  );
}

export default UserProfile;
