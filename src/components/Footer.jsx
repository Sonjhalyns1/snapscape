import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-4 text-white text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Photo Snapscapes. All rights reserved.</p>
        <p>
          Created by <a href="https://example.com" className="text-blue-400 hover:text-blue-600">Sonjhalyns Augustin</a>
        </p>
      </div>
    </footer>
  );
}