import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faHighlighter,
  faFont
} from '@fortawesome/free-solid-svg-icons';

interface TextEditorProps {
  id: string;
  label: string;
  valueSelector: (state: RootState) => string;
  actionCreator: (text: string) => { type: string; payload: string };
  rows?: number;
  isSingleLine?: boolean;
  placeholder?: string;
  templateOptions?: string[];
}

const TextEditor: React.FC<TextEditorProps> = ({
  id,
  label,
  valueSelector,
  actionCreator,
  rows = 3,
  isSingleLine = false,
  placeholder,
  templateOptions = []
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector(valueSelector);
  const [showTemplates, setShowTemplates] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [highlightColor, setHighlightColor] = useState<string | null>(null);

  const handleChange = useCallback((newText: string) => {
    dispatch(actionCreator(newText));
  }, [dispatch, actionCreator]);

  const handleTemplateSelect = (template: string) => {
    handleChange(template);
    setShowTemplates(false);
  };

  const toggleTextAlign = (align: 'left' | 'center' | 'right') => {
    setTextAlign(align);
    // Dispatch alignment change to store if needed
  };

  const InputComponent = isSingleLine ? 'input' : 'textarea';
  const inputType = isSingleLine ? 'text' : undefined;

  return (
    <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
      <div className="flex justify-between items-center">
        <label className="block font-medium text-gray-700" htmlFor={id}>{label}</label>
        {templateOptions.length > 0 && (
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showTemplates ? 'Hide Templates' : 'Show Templates'}
          </button>
        )}
      </div>

      {showTemplates && templateOptions.length > 0 && (
        <div className="mb-2 p-2 border rounded bg-white">
          <p className="text-sm text-gray-600 mb-1">Select a template:</p>
          <div className="flex flex-wrap gap-2">
            {templateOptions.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <InputComponent
          id={id}
          rows={!isSingleLine ? rows : undefined}
          type={inputType}
          className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner
            ${isBold ? 'font-bold' : ''}
            ${isItalic ? 'italic' : ''}
            ${isUnderline ? 'underline' : ''}
            ${highlightColor ? `bg-${highlightColor}-100` : ''}
            text-${textAlign}`}
          placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e.target.value)}
        />
      </div>

      {!isSingleLine && (
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-2 rounded ${isBold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            title="Bold"
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-2 rounded ${isItalic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            title="Italic"
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            onClick={() => setIsUnderline(!isUnderline)}
            className={`p-2 rounded ${isUnderline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            title="Underline"
          >
            <FontAwesomeIcon icon={faUnderline} />
          </button>
          <button
            onClick={() => setHighlightColor(highlightColor ? null : 'yellow')}
            className={`p-2 rounded ${highlightColor ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            title="Highlight"
          >
            <FontAwesomeIcon icon={faHighlighter} />
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => toggleTextAlign('left')}
              className={`p-2 rounded ${textAlign === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Left"
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button
              onClick={() => toggleTextAlign('center')}
              className={`p-2 rounded ${textAlign === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Center"
            >
              <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button
              onClick={() => toggleTextAlign('right')}
              className={`p-2 rounded ${textAlign === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Right"
            >
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
          </div>
          <button
            className="p-2 rounded hover:bg-gray-100"
            title="Font Family"
          >
            <FontAwesomeIcon icon={faFont} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextEditor; 