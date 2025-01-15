
import React from 'react';

/**
 * Button component
 * @param {object} props - Component props
 * @param {string} props.text - Button text
 * @param {string} props.type - Button type (e.g., 'primary', 'secondary')
 * @param {function} props.onClick - Click event handler
 * @example
 * <Button text="Click me" type="primary" onClick={() => console.log('Button clicked')} />
 */
const Button = ({ text, type, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${
        type === 'primary'
          ? 'bg-bfs-green-0 text-white hover:bg-bfs-green-2'
          : 'border border-bfs-green-0 text-bfs-green-0 hover:bg-bfs-green-1'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
