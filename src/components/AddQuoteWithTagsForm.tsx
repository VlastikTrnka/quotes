import React, { useState } from 'react';
import { Tag } from './Type';

interface AddQuoteWithTagsFormProps {
  newQuote: string;
  setNewQuote: (quote: string) => void;
  setQuotes: (quotes: any) => void;
  tags: Tag[];
  token: string | null;
}

export function AddQuoteWithTagsForm({ newQuote, setNewQuote, setQuotes, tags, token }: AddQuoteWithTagsFormProps) {
  const [selectedTags, setSelectedTags] = useState<number[]>([]); // Uložíme ID vybraných tagů

  const handleAddQuote = async () => {
    const response = await fetch('http://localhost:5136/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newQuote, tagIds: selectedTags }), // Předáme tagy
    });

    if (response.ok) {
      const newQuoteData = await response.json();
      setQuotes((quotes: any) => [...quotes, newQuoteData]);
      setNewQuote('');
      setSelectedTags([]); // Reset výběru tagů po přidání citátu
    }
  };

  const handleTagChange = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId)); // Odebereme, pokud je již vybrán
    } else {
      setSelectedTags([...selectedTags, tagId]); // Přidáme tag, pokud není vybrán
    }
  };

  return (
    <div>
      <h3>Add a new quote with tags</h3>
      <input
        type="text"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
        placeholder="New quote"
      />
      <div>
        <h4>Select Tags</h4>
        {tags.map(tag => (
          <div key={tag.tagId}>
            <input
              type="checkbox"
              id={`tag-${tag.tagId}`}
              value={tag.tagId}
              checked={selectedTags.includes(tag.tagId)}
              onChange={() => handleTagChange(tag.tagId)}
            />
            <label htmlFor={`tag-${tag.tagId}`}>{tag.text}</label>
          </div>
        ))}
      </div>
      <button onClick={handleAddQuote}>Add Quote with Tags</button>
    </div>
  );
}

export default AddQuoteWithTagsForm;