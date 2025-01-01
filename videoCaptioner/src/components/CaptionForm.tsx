import React, { useState, useEffect } from 'react';

interface CaptionFormProps {
  onSubmit: (caption: { start: number; end: number; text: string }) => void;
  editingCaption: { id: number; start: number; end: number; text: string } | null;
}

export default function CaptionForm({ onSubmit, editingCaption }: CaptionFormProps) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingCaption) {
      setStart(editingCaption.start.toString());
      setEnd(editingCaption.end.toString());
      setText(editingCaption.text);
    } else {
      setStart('');
      setEnd('');
      setText('');
    }
  }, [editingCaption]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      start: parseFloat(start),
      end: parseFloat(end),
      text,
    });
    if (!editingCaption) {
      setStart('');
      setEnd('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{editingCaption ? 'Edit Caption' : 'Add Caption'}</h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input type="number" value={start} onChange={(e) => setStart(e.target.value)} placeholder="Start Time (seconds)" step="0.1"
            min="0" required className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
        <input type="number" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="End Time (seconds)" step="0.1" 
            min="0" required className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter caption text" required 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-2"/>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {editingCaption ? 'Update Caption' : 'Add Caption'}
      </button>
    </form>
  );
}

