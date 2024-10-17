import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import Pagination from './components/Pagination';

const videos = [
  { id: 1, title: 'Le Robot Sauvage', url: 'https://www.youtube.com/embed/3iHLk8nHX80', likes: 10, dislikes: 2, category: 'Adventure' },
  { id: 2, title: 'Smile 2', url: 'https://www.youtube.com/embed/FU_bAopCcSE', likes: 5, dislikes: 1, category: 'Horror' },
  { id: 3, title: `L'Amour ouf`, url: 'https://www.youtube.com/embed/jMdtgTdr348', likes: 15, dislikes: 3, category: 'Romance' },
  { id: 4, title: 'Joker : Folie à Deux', url: 'https://www.youtube.com/embed/_OKAwz2MsJs', likes: 7, dislikes: 0, category: 'Drama' },
  { id: 5, title: 'Lee Miller', url: 'https://www.youtube.com/embed/DmFYkiUAAA8', likes: 12, dislikes: 4, category: 'Drama' },
  { id: 6, title: 'Croquette', url: 'https://www.youtube.com/embed/Cwtm7Fc6AJY', likes: 9, dislikes: 1, category: 'Adventure' },
  { id: 7, title: 'The Apprentice', url: 'https://www.youtube.com/embed/b_a3O4-Wgp8', likes: 3, dislikes: 5, category: 'Drama' },
  { id: 8, title: `C'est le monde à l'envers !`, url: 'https://www.youtube.com/embed/TUeUiVoOZm4', likes: 20, dislikes: 2, category: 'Drama' },
  { id: 9, title: 'Terrifier 3', url: 'https://www.youtube.com/embed/zaPcin5knJk', likes: 6, dislikes: 0, category: 'Drama' },
  { id: 10, title: 'The Killer', url: 'https://www.youtube.com/embed/5S7FR_HCg9g', likes: 4, dislikes: 1, category: 'Drama' },
  { id: 11, title: 'Une nuit a zoo', url: 'https://www.youtube.com/embed/f17dnTbv_cI', likes: 8, dislikes: 3, category: 'Adventure' },
  { id: 12, title: 'Louise Violet', url: 'https://www.youtube.com/embed/Auz5AWSaO2g', likes: 14, dislikes: 2, category: 'Drama' },
  { id: 13, title: 'Challengers', url: 'https://www.youtube.com/embed/VobTTbg-te0', likes: 5, dislikes: 1, category: 'Comedy' },
];


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [videoData, setVideoData] = useState(videos);
  
  const [userReactions, setUserReactions] = useState<{ [key: number]: { liked: boolean; disliked: boolean } }>({});

  const filteredVideos = videoData.filter(video => {
    return (
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || video.category === selectedCategory)
    );
  });

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleLike = (id: number) => {
    const updatedVideos = videoData.map((video) => {
      if (video.id === id) {
        if (userReactions[id]?.liked) return video;
        if (userReactions[id]?.disliked) {
          return { ...video, dislikes: video.dislikes - 1, likes: video.likes + 1 };
        }
        return { ...video, likes: video.likes + 1 };
      }
      return video;
    });
    
    setVideoData(updatedVideos);
    setUserReactions((prev) => ({
      ...prev,
      [id]: { liked: true, disliked: false } 
    }));
  };

  const handleDislike = (id: number) => {
    const updatedVideos = videoData.map((video) => {
      if (video.id === id) {
        if (userReactions[id]?.disliked) return video;
        if (userReactions[id]?.liked) {
          return { ...video, likes: video.likes - 1, dislikes: video.dislikes + 1 };
        }
        return { ...video, dislikes: video.dislikes + 1 };
      }
      return video;
    });
    
    setVideoData(updatedVideos);
    setUserReactions((prev) => ({
      ...prev,
      [id]: { disliked: true, liked: false }
    }));
  };

  const handleDelete = (id: number) => {
    const updatedVideos = videoData.filter(video => video.id !== id);
    setVideoData(updatedVideos);
    setUserReactions((prev) => {
      const { [id]: _, ...rest } = prev; 
      return rest;
    });
    if (updatedVideos.length <= indexOfFirstVideo) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const uniqueCategories = Array.from(new Set(videoData.map(video => video.category)));

  useEffect(() => {
    if (!uniqueCategories.includes(selectedCategory)) {
      setSelectedCategory('');
    }
  }, [videoData, selectedCategory, uniqueCategories]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#E5E5E5' }}>
      <h1 style={{ textAlign: 'center', color: '#14213D' }}>Movies</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: '1 1 300px', 
            marginRight: '10px',
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
            flex: '1 1 150px',
          }}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={videosPerPage}
          onChange={(e) => {
            setVideosPerPage(Number(e.target.value));
            setCurrentPage(1); 
          }}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
            flex: '1 1 100px', 
          }}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>
      <VideoList videos={currentVideos} onLike={handleLike} onDislike={handleDislike} onDelete={handleDelete} />
      <Pagination
        videosPerPage={videosPerPage}
        totalVideos={filteredVideos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
