import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  setTitleAlign,
  setContentAlign,
  setCtaAlign
} from '../../store/editorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface PositionControlsProps {
  elementType: 'title' | 'content' | 'cta';
}

const PositionControls: React.FC<PositionControlsProps> = ({ elementType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const align = useSelector((state: RootState) => state.editor.bannerStyle[`${elementType}Align`]);

  const handleAlignChange = useCallback((newAlign: 'left' | 'center' | 'right') => {
    switch (elementType) {
      case 'title':
        dispatch(setTitleAlign(newAlign));
        break;
      case 'content':
        dispatch(setContentAlign(newAlign));
        break;
      case 'cta':
        dispatch(setCtaAlign(newAlign));
        break;
    }
  }, [dispatch, elementType]);

  return (
    <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
      <h3 className="font-medium text-gray-700 capitalize">{elementType} Position</h3>

      <div className="space-y-3">
        {/* Horizontal Alignment */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Align:</span>
          <div className="flex space-x-1">
            <button
              onClick={() => handleAlignChange('left')}
              className={`p-2 rounded ${align === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Left"
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button
              onClick={() => handleAlignChange('center')}
              className={`p-2 rounded ${align === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Center"
            >
              <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button
              onClick={() => handleAlignChange('right')}
              className={`p-2 rounded ${align === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Align Right"
            >
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
          </div>
        </div>

        {/* Vertical Position (Grid Layout) */}
        <div className="grid grid-cols-3 gap-2">
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="p-2 text-center text-gray-400">Center</div>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>

        <p className="text-xs text-gray-400 italic">
          Vertical positioning coming soon
        </p>
      </div>
    </div>
  );
};

export default PositionControls; 