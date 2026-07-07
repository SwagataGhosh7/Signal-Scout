import React, { useState, useEffect } from 'react';
import { api, Target, CreateTargetDTO } from '../api/client';
import TargetForm from './TargetForm';
import TargetCard from './TargetCard';

const TargetCompanies: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTargets();
      setTargets(data);
    } catch (err) {
      setError('Failed to fetch targets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTarget = async (targetData: CreateTargetDTO) => {
    try {
      const newTarget = await api.createTarget(targetData);
      setTargets([newTarget, ...targets]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create target');
      console.error(err);
    }
  };

  const handleDeleteTarget = async (id: string) => {
    try {
      await api.deleteTarget(id);
      setTargets(targets.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete target');
      console.error(err);
    }
  };

  const handleHarvestSignals = async (id: string) => {
    try {
      const updated = await api.harvestSignals(id);
      setTargets(targets.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('Failed to harvest signals');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Target Account Management</h1>
            <p className="text-gray-400">Manage and monitor your target accounts for signal harvesting</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-neon text-dark font-semibold rounded-lg hover:bg-green-400 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Target Account'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-neon mb-4">Add New Target Account</h2>
            <TargetForm onSubmit={handleAddTarget} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm">Total Targets</p>
            <p className="text-2xl font-bold text-neon">{targets.length}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm">High Priority</p>
            <p className="text-2xl font-bold text-red-400">
              {targets.filter((t) => t.priority === 'High').length}
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm">Active Scanning</p>
            <p className="text-2xl font-bold text-green-400">
              {targets.filter((t) => t.status === 'Active Scanning').length}
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm">Avg Intent Level</p>
            <p className="text-2xl font-bold text-blue-400">
              {targets.length > 0
                ? Math.round(
                    targets.reduce((sum, t) => sum + t.ai_intent_level, 0) / targets.length
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Targets Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Your Target Accounts</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading targets...</p>
            </div>
          ) : targets.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <p className="text-gray-400 mb-4">No target accounts yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-neon text-dark font-semibold rounded hover:bg-green-400 transition-colors"
              >
                Create your first target
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targets.map((target) => (
                <TargetCard
                  key={target.id}
                  target={target}
                  onDelete={handleDeleteTarget}
                  onHarvest={handleHarvestSignals}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCompanies;
