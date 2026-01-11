import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "../../store/projectStore";
import { ArrowLeft, Play, Pause, Settings, Save } from "lucide-react";

function Workspace() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, setCurrentProject, currentProject } = useProjectStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    } else {
      // Project not found, redirect to dashboard
      navigate("/dashboard");
    }
  }, [projectId, projects, setCurrentProject, navigate]);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading project...</div>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/dashboard");
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {currentProject.name}
            </h1>
            <p className="text-sm text-slate-400">v{currentProject.version}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isSimulating
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isSimulating ? (
              <>
                <Pause size={18} />
                Stop Simulation
              </>
            ) : (
              <>
                <Play size={18} />
                Run Simulation
              </>
            )}
          </button>

          <button
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} className="text-slate-300" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Save size={18} />
            Save
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - AI Chat */}
        <div className="w-80 bg-slate-900/30 border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
            <p className="text-sm text-slate-400">
              Ask about architecture decisions
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome Message */}
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-slate-300 text-sm">
                👋 Hi! I'm your AI architecture assistant. I can help you:
              </p>
              <ul className="mt-2 text-slate-400 text-sm space-y-1">
                <li>• Design AWS infrastructure</li>
                <li>• Optimize your architecture</li>
                <li>• Suggest best practices</li>
                <li>• Answer questions</li>
              </ul>
              <p className="mt-3 text-slate-300 text-sm font-medium">
                Describe your project to get started!
              </p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask the AI..."
                className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel - 3D Architecture View */}
        <div className="flex-1 flex flex-col bg-slate-900/20">
          <div className="flex-1 flex items-center justify-center p-8">
            {/* Placeholder for 3D view */}
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path
                      d="M16 32C16 26.4772 20.4772 22 26 22C26 16.4772 30.4772 12 36 12C41.5228 12 46 16.4772 46 22C51.5228 22 56 26.4772 56 32C56 37.5228 51.5228 42 46 42H26C20.4772 42 16 37.5228 16 32Z"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Architecture Yet
              </h3>
              <p className="text-slate-400 mb-6 max-w-md">
                Start by describing your project to the AI assistant. I'll help
                you design the perfect AWS architecture!
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Start with AI
                </button>
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  Import Template
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-slate-900/50 border-t border-slate-700 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">Modules: 0</span>
                <span className="text-sm text-slate-400">Connections: 0</span>
                <span className="text-sm text-slate-400">
                  Estimated Cost: $0/month
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
                  2D View
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  3D View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Settings/Properties (Collapsible) */}
        {showSettings && (
          <div className="w-80 bg-slate-900/30 border-l border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">
                Project Settings
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={currentProject.name}
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 text-sm"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  value={currentProject.version}
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 text-sm"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 text-sm">
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="mvp">MVP</option>
                  <option value="running">Running</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  AWS Region
                </label>
                <select className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 text-sm">
                  <option>us-east-1</option>
                  <option>us-west-2</option>
                  <option>eu-west-1</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 text-sm"
                  placeholder="Describe your project..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
