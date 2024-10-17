import React, { useState } from 'react';
import { TagType } from './Type';

interface AddTagFormProps {
  setTags: (tags: any) => void;  
  token: string | null;          
}

export function AddTagForm({ setTags, token }: AddTagFormProps) {
  const [newTagText, setNewTagText] = useState('');
  const [tagType, setTagType] = useState<TagType>(TagType.Other);

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
      body: JSON.stringify({ text: newTagText, type: tagType }),
    });

    if (response.ok) {
      const newTag = await response.json();
      setTags((prevTags: any) => [...prevTags, newTag]);
      setNewTagText('');
      setTagType(TagType.Other);
    } else {
      console.log('Failed to add tag');
    }
  };

  return (
    <div>
      <h3>Add a new tag</h3>
      <input
        type="text"
        className='inputAdd'
        value={newTagText}
        onChange={(e) => setNewTagText(e.target.value)}
        placeholder="New tag text"
      />
      <select className='inputAdd' value={tagType} onChange={(e) => setTagType(Number(e.target.value))}>
        <option value={TagType.Other}>Other</option>
        <option value={TagType.Author}>Author</option>
        <option value={TagType.Language}>Language</option>
        <option value={TagType.Category}>Category</option>
      </select>
      <button onClick={handleAddTag}>Add Tag</button>
    </div>
  );
}

export default AddTagForm;
