import React from 'react';
import { Tag } from './Type';

interface SearchQuotesProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchTag: string;
  setSearchTag: (tag: string) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
  tags: Tag[];
}

export function SearchQuotes({ searchText, setSearchText, searchTag, setSearchTag, searchResults, setSearchResults, tags }: SearchQuotesProps) {
  const handleSearchQuotes = async () => {
    if (!searchText && !searchTag) {
      return;
    }
    const url = `http://localhost:5136/api/quotes/by-text-or-tag?text=${searchText}&tag=${searchTag}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSearchResults(data.$values || []);
    }
  };

  return (
    <div>
      <h3>Search Quotes</h3>
      <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search text" />
      <select value={searchTag} onChange={e => setSearchTag(e.target.value)}>
        <option value="">-- Select a tag --</option>
        {tags.map(tag => (
          <option key={tag.tagId} value={tag.text}>{tag.text}</option>
        ))}
      </select>
      <button onClick={handleSearchQuotes}>Search</button>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((quote: any, index: number) => <p key={index}>{quote.Text}</p>)
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
}