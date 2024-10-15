import React, { useState } from 'react';

interface AddTagFormProps {
  setTags: (tags: any) => void;  // Funkce pro aktualizaci seznamu tagů
  token: string | null;         // Token pro autentizaci
}

export function AddTagForm({ setTags, token }: AddTagFormProps) {
  const [newTagText, setNewTagText] = useState('');  // Stav pro nový tag

  const handleAddTag = async () => {
    if (!newTagText) {
      alert("Tag text can't be empty!");
      return;
    }

    const response = await fetch('http://localhost:5136/api/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newTagText }),
    });

    if (response.ok) {
      const newTag = await response.json();
      setTags((prevTags: any) => [...prevTags, newTag]);  // Přidáme nový tag do seznamu tagů
      setNewTagText('');  // Resetujeme pole
    } else {
      console.log('Failed to add tag');
    }
  };

  return (
    <div>
      <h3>Add a new tag</h3>
      <input
        type="text"
        value={newTagText}
        onChange={(e) => setNewTagText(e.target.value)}
        placeholder="New tag text"
      />
      <button onClick={handleAddTag}>Add Tag</button>
    </div>
  );
}

export default AddTagForm;
