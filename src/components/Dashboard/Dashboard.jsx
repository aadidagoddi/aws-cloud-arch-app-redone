import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useProjectStore, PROJECT_STATUS } from "../../store/projectStore";
import ProjectCard from "./ProjectCard";
import { Plus, Settings, LogOut, User } from "lucide-react";
import UserSettings from "./UserSettings";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { projects, addProject } = useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      addProject({ name: newProjectName });
      setNewProjectName("");
      setShowNewProject(false);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/workspace/${projectId}`);
  };

  // Group projects by status
  const newProjects = projects.filter((p) => p.status === PROJECT_STATUS.NEW);
  const inProgressProjects = projects.filter(
    (p) => p.status === PROJECT_STATUS.IN_PROGRESS
  );
  const mvpProjects = projects.filter((p) => p.status === PROJECT_STATUS.MVP);
  const runningProjects = projects.filter(
    (p) => p.status === PROJECT_STATUS.RUNNING
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">
              AWS Cloud Architect
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <User size={20} />
              <span>{user?.name || user?.email}</span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-slate-300" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut size={20} className="text-slate-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* New Project Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewProject(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        {/* New Project Modal */}
        {showNewProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Create New Project
              </h2>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project Name"
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg mb-4"
                onKeyPress={(e) => e.key === "Enter" && handleCreateProject()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateProject}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewProject(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="space-y-8">
          {/* New Projects */}
          {newProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                New Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* In Progress Projects */}
          {inProgressProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">In Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* MVP Projects */}
          {mvpProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                MVP Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mvpProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Running Projects */}
          {runningProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                Running Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {runningProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">
                No projects yet. Create your first project to get started!
              </p>
            </div>
          )}
        </div>
      </main>
      {/* User Settings Modal */}
      <UserSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default Dashboard;
