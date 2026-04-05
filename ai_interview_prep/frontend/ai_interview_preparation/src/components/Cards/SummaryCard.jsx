import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdate,
  onSelect,  // ✅ FIXED: camelCase
  onDelete
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer group">
      
      {/* Clickable Card */}
      <div 
        onClick={onSelect} 
        className="pr-12"  // ✅ Space for delete button
      >
        {/* Top Accent Section */}
        <div
          className="h-3 w-full rounded-t-2xl mb-4"
          style={{ background: colors?.bgcolor || '#3B82F6' }}
        />

        {/* Avatar + Role */}
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg flex-shrink-0"
            style={{ background: colors?.bgcolor || '#3B82F6' }}
          >
            <span>{getInitials(role)}</span>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {role}
            </h2>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex-1">
            <span className="font-medium text-gray-800">
              {experience}
            </span>{' '}
            <span className="text-gray-500">
              {experience === 1 ? 'year' : 'years'} experience
            </span>
          </div>

          <div className="text-right">
            <span className="font-medium text-gray-800">
              {questions}
            </span>{' '}
            Q&A
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-400 mb-3">
          Last updated: {lastUpdate || 'Never'}
        </div>

        {/* Description */}
        <p 
          className="text-sm text-gray-600 leading-relaxed line-clamp-3"
          title={description}  // ✅ Tooltip on hover
        >
          {description}
        </p>
      </div>

      {/* Delete Button */}
      <button
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete session"
        aria-label="Delete session"
      >
        <LuTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SummaryCard;
