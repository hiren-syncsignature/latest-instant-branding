import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setBackgroundColor } from '../../store/editorSlice';

const BackgroundEditor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const color = useSelector((state: RootState) => state.editor.backgroundColor);

  const handleChange = useCallback((newColor: string) => {
    dispatch(setBackgroundColor(newColor));
  }, [dispatch]);

  const generateRandomColor = useCallback(() => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    handleChange(randomColor);
  }, [handleChange]);

  return (
    <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
      <p className="font-medium text-gray-700 mb-2">Background</p>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className="w-8 h-8 border-none cursor-pointer p-0 rounded shadow-inner"
        />
        <span className="text-sm text-gray-600 font-mono">{color}</span>
      </div>
      <div className="flex space-x-2 mt-2">
        <button 
          className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50" 
          disabled
        >
          Gradient
        </button>
        <button 
          onClick={generateRandomColor}
          className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100"
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default BackgroundEditor; 