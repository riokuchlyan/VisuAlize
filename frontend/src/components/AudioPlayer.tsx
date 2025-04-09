import React, { useState, useEffect } from 'react';

function AudioPlayer() {
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/audio_summary')
      .then((response) => response.json())
      .then((data) => {
        setAudioSrc(data.audio_data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching audio summary:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading audio summary...</p>
      ) : (
        <audio controls src={audioSrc}>
          Your browser does not support audio.
        </audio>
      )}
    </div>
  );
}

export default AudioPlayer;