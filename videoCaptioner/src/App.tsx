import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoUrlForm from './components/VideoUrlForm';
import CaptionForm from './components/CaptionForm';
import CaptionList from './components/CaptionList';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState<{ id: number; start: number; end: number; text: string }[]>([]);
  const [editingCaption, setEditingCaption] = useState<{ id: number; start: number; end: number; text: string } | null>(null);

  const handleVideoUrlSubmit = (url: string) => {
    setVideoUrl(url);
  };

  const handleCaptionSubmit = (newCaption: { start: number; end: number; text: string }) => {
    if (editingCaption) {
      setCaptions(captions.map(caption => 
        caption.id === editingCaption.id ? { ...newCaption, id: editingCaption.id } : caption
      ));
      setEditingCaption(null);
    } else {
      setCaptions([...captions, { ...newCaption, id: Date.now() }]);
    }
  };

  const handleEditCaption = (caption: { id: number; start: number; end: number; text: string }) => {
    setEditingCaption(caption);
  };

  const handleDeleteCaption = (id: number) => {
    setCaptions(captions.filter(caption => caption.id !== id));
    if (editingCaption && editingCaption.id === id) {
      setEditingCaption(null);
    }
  };

  const generateVTT = () => {
    let vtt = 'WEBVTT\n\n';
    captions.forEach((caption, index) => {
      vtt += `${index + 1}\n`;
      vtt += `${formatTime(caption.start)} --> ${formatTime(caption.end)}\n`;
      vtt += `${caption.text}\n\n`;
    });
    return URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' }));
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours().toString().padStart(2, '0');
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    const ms = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hh}:${mm}:${ss}.${ms}`;
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Video Captioner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <VideoUrlForm onSubmit={handleVideoUrlSubmit} />
          {videoUrl && (
            <>
              <CaptionForm onSubmit={handleCaptionSubmit} editingCaption={editingCaption} />
              <CaptionList captions={captions} onEditCaption={handleEditCaption} onDeleteCaption={handleDeleteCaption} />
            </>
          )}
        </div>
        <div>
          {videoUrl &&
            <VideoPlayer src={videoUrl} captionsSrc={generateVTT()} />
          }
        </div>
      </div>
    </div>
  );
}

