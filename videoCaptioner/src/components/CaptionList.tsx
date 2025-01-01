import React from 'react';

interface CaptionListProps {
  captions: { id: number; start: number; end: number; text: string }[];
  onEditCaption: (caption: { id: number; start: number; end: number; text: string }) => void;
  onDeleteCaption: (id: number) => void;
}

export default function CaptionList({ captions, onEditCaption, onDeleteCaption }: CaptionListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Captions</h2>
      {captions.length === 0 ? (
        <p className="text-gray-500">No captions added yet.</p>
      ) : (
        <ul className="space-y-2">
          {captions.map((caption) => (
            <li key={caption.id} className="bg-gray-100 p-2 rounded-md flex justify-between items-center text-black">
              <span>
                {caption.start.toFixed(1)}s - {caption.end.toFixed(1)}s: {caption.text}
              </span>
              <div>
                <button onClick={() => onEditCaption(caption)} className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </button>
                <button onClick={() => onDeleteCaption(caption.id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

