import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  setBackgroundColor,
  setTitle,
  setOtherContent,
  setCtaWebsite,
  setBannerStyle
} from '../../store/editorSlice';

interface BannerTemplate {
  id: string;
  name: string;
  backgroundColor: string;
  title: string;
  content: string;
  cta: string;
  style: {
    titleAlign: 'left' | 'center' | 'right';
    contentAlign: 'left' | 'center' | 'right';
    ctaAlign: 'left' | 'center' | 'right';
    titleColor: string;
    contentColor: string;
    ctaColor: string;
  };
}

const templates: BannerTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    backgroundColor: '#1a365d',
    title: 'Professional Title',
    content: 'Add your professional description here. Keep it concise and impactful.',
    cta: 'Learn More',
    style: {
      titleAlign: 'center',
      contentAlign: 'center',
      ctaAlign: 'center',
      titleColor: '#ffffff',
      contentColor: '#e2e8f0',
      ctaColor: '#60a5fa'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    backgroundColor: '#4f46e5',
    title: 'Modern Design',
    content: 'A contemporary approach to your message. Clean and stylish.',
    cta: 'Explore',
    style: {
      titleAlign: 'left',
      contentAlign: 'left',
      ctaAlign: 'right',
      titleColor: '#ffffff',
      contentColor: '#e2e8f0',
      ctaColor: '#fbbf24'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    backgroundColor: '#f3f4f6',
    title: 'Minimal Style',
    content: 'Less is more. Simple and elegant design.',
    cta: 'Discover',
    style: {
      titleAlign: 'center',
      contentAlign: 'center',
      ctaAlign: 'center',
      titleColor: '#1f2937',
      contentColor: '#4b5563',
      ctaColor: '#3b82f6'
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    backgroundColor: '#dc2626',
    title: 'Make a Statement',
    content: 'Bold colors for bold messages. Stand out from the crowd.',
    cta: 'Get Started',
    style: {
      titleAlign: 'center',
      contentAlign: 'center',
      ctaAlign: 'center',
      titleColor: '#ffffff',
      contentColor: '#fecaca',
      ctaColor: '#ffffff'
    }
  }
];

const BannerTemplates: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const applyTemplate = useCallback((template: BannerTemplate) => {
    dispatch(setBackgroundColor(template.backgroundColor));
    dispatch(setTitle(template.title));
    dispatch(setOtherContent(template.content));
    dispatch(setCtaWebsite(template.cta));
    dispatch(setBannerStyle(template.style));
  }, [dispatch]);

  const randomizeTemplate = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    applyTemplate(templates[randomIndex]);
  }, [applyTemplate]);

  return (
    <div className="space-y-4 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Banner Templates</h3>
        <button
          onClick={randomizeTemplate}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Randomize
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className="p-3 border rounded hover:border-blue-500 transition-colors"
            style={{ backgroundColor: template.backgroundColor }}
          >
            <div className="space-y-1">
              <h4 className="text-sm font-medium" style={{ color: template.style.titleColor }}>
                {template.name}
              </h4>
              <p className="text-xs" style={{ color: template.style.contentColor }}>
                {template.content.substring(0, 30)}...
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerTemplates; 