import React, { useEffect, useState } from 'react';

interface Video {
    id: number;
    title: string;
    url: string;
    likes: number;
    dislikes: number;
    category: string;
}

interface SearchInputProps {
    videos: Video[];
    onCategoryChange: (categories: string[]) => void;
    onSearchChange: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ videos, onCategoryChange, onSearchChange }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(videos.map(video => video.category)));
        setCategories(uniqueCategories);
    }, [videos]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category]; 
            }
        });
    };

    useEffect(() => {
        onCategoryChange(selectedCategories);
    }, [selectedCategories, onCategoryChange]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#333' }}>Filter by Category</h2>
          <div>
            {categories.map(category => (
              <label key={category} style={{ marginRight: '10px', color: '#555' }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategorySelect(category)}
                  style={{ marginRight: '5px' }}
                />
                {category}
              </label>
            ))}
          </div>
          <h2 style={{ color: '#333' }}>Search Videos</h2>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{
              marginTop: '10px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
            }}
          />
        </div>
      );
      
};

export default SearchInput;
