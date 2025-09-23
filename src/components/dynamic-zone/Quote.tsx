import React from 'react';

export default function Quote({ text, author }: { text: string; author?: string }) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4">
      <p className="text-lg italic text-gray-700">"{text}"</p>
      {author && <footer className="text-right text-gray-600 mt-2">— {author}</footer>}
    </blockquote>
  );
}