import React from 'react';
import { Target } from '../api/client';

interface TargetCardProps {
  target: Target;
  onDelete: (id: string) => void;
  onHarvest: (id: string) => void;
}

const TargetCard: React.FC<TargetCardProps> = ({ target, onDelete, onHarvest }) => {
  const priorityColors = {
    High: 'text-red-400 bg-red-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Low: 'text-green-400 bg-green-400/10',
  };

  const statusColors = {
    'Active Scanning': 'bg-green-500/10 text-green-400',
    Paused: 'bg-gray-500/10 text-gray-400',
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-neon/50 transition-colors">
      {/* Header with Logo and Name */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-neon to-green-600 rounded-lg flex items-center justify-center text-dark font-bold text-lg">
            {target.company_name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{target.company_name}</h3>
            <p className="text-sm text-gray-400">{target.domain}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(target.id)}
          className="text-gray-400 hover:text-red-400 transition-colors p-1"
          title="Delete target"
        >
          🗑️
        </button>
      </div>

      {/* Industry and Priority */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm px-2 py-1 bg-gray-800 text-gray-300 rounded">
          {target.industry}
        </span>
        <span className={`text-sm px-2 py-1 rounded font-medium ${priorityColors[target.priority]}`}>
          {target.priority} Priority
        </span>
        <span className={`text-sm px-2 py-1 rounded font-medium ${statusColors[target.status]}`}>
          {target.status}
        </span>
      </div>

      {/* Owner and Status Badge */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded border border-gray-700">
        <p className="text-xs text-gray-400 mb-1">Owner</p>
        <p className="text-sm text-white font-medium">{target.owner}</p>
      </div>

      {/* ICP Context Preview */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">ICP Context</p>
        <p className="text-sm text-gray-300 line-clamp-2">{target.icp_context}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
          <p className="text-xs text-gray-400">AI Intent Level</p>
          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-neon">{target.ai_intent_level}</span>
              <span className="text-xs text-gray-500">%</span>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-neon"
                style={{ width: `${target.ai_intent_level}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
          <p className="text-xs text-gray-400">Calculated Risk</p>
          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-orange-400">{target.calculated_risk}</span>
              <span className="text-xs text-gray-500">%</span>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-orange-400"
                style={{ width: `${target.calculated_risk}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <p className="text-gray-400">Last Harvested</p>
          <p className="text-gray-300 font-medium">{formatDate(target.last_harvested)}</p>
        </div>
        <div>
          <p className="text-gray-400">Actions Queue</p>
          <p className="text-neon font-medium">{target.actions_queue} items</p>
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={() => onHarvest(target.id)}
        className="w-full px-4 py-2 bg-neon text-dark font-semibold rounded hover:bg-green-400 transition-colors"
      >
        🌾 Harvest Signals
      </button>
    </div>
  );
};

export default TargetCard;
