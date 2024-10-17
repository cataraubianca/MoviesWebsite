import React from 'react';

interface Video {
  id: number;
  title: string;
  url: string;
  likes: number;
  dislikes: number;
}

interface VideoListProps {
  videos: Video[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;  
}

const VideoList: React.FC<VideoListProps> = ({ videos, onLike, onDislike, onDelete }) => {
  const videosPerRow = 4;
  const numberOfPlaceholders = (videosPerRow - (videos.length % videosPerRow)) % videosPerRow;

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'flex-start', 
      gap: '20px' 
    }}>
      {videos.map((video) => (
        <div key={video.id} style={{ 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          backgroundColor: '#FFFFFF',
          width: 'calc(25% - 20px)', 
          boxSizing: 'border-box',
          padding: '10px',
          flexGrow: 0,  
        }}>
          <h2 style={{ color: '#FCA311', textAlign: 'center' }}>{video.title}</h2>
          <iframe
            width="100%"
            height="150"
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '8px', margin: '0 5px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
          ></iframe>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', marginLeft: '5px', marginRight: '5px' }}> 
              <button
                onClick={() => onLike(video.id)} 
                style={{
                  backgroundColor: '#FCA311', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '4px',
                  marginRight: '5px', 
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FCA311'}
              >
                👍 {video.likes}
              </button>
              <button
                onClick={() => onDislike(video.id)} 
                style={{
                  backgroundColor: '#FCA311', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FCA311'}
              >
                👎 {video.dislikes}
              </button>
            </div>
            <button 
              onClick={() => onDelete(video.id)} 
              style={{
                color: 'red', 
                border: 'none', 
                backgroundColor: 'transparent', 
                cursor: 'pointer',
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
      
      {Array.from({ length: numberOfPlaceholders }).map((_, index) => (
        <div 
          key={`placeholder-${index}`} 
          style={{ 
            width: 'calc(25% - 20px)',  
            visibility: 'hidden', 
          }} 
        />
      ))}
    </div>
  );
};

export default VideoList;
