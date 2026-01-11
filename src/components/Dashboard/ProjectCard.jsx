import React from "react";
import { PROJECT_STATUS } from "../../store/projectStore";
import ProjectIcon from "./ProjectIcon";

function ProjectCard({ project, onClick }) {
  const getStatusColor = () => {
    switch (project.status) {
      case PROJECT_STATUS.NEW:
        return "from-slate-600 to-slate-700";
      case PROJECT_STATUS.IN_PROGRESS:
        return "from-yellow-600 to-orange-600";
      case PROJECT_STATUS.MVP:
        return "from-blue-600 to-cyan-600";
      case PROJECT_STATUS.RUNNING:
        return "from-green-600 to-emerald-600";
      default:
        return "from-slate-600 to-slate-700";
    }
  };

  const getStatusText = () => {
    switch (project.status) {
      case PROJECT_STATUS.NEW:
        return "New";
      case PROJECT_STATUS.IN_PROGRESS:
        return "In Progress";
      case PROJECT_STATUS.MVP:
        return "MVP";
      case PROJECT_STATUS.RUNNING:
        return "Running";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-800 rounded-lg p-6 cursor-pointer hover:bg-slate-750 transition-all hover:scale-105 border border-slate-700 hover:border-slate-600"
    >
      {/* Project Icon */}
      <div className="flex justify-center mb-4">
        <ProjectIcon status={project.status} icon={project.icon} />
      </div>

      {/* Project Name */}
      <h3 className="text-xl font-bold text-white text-center mb-2">
        {project.name}
      </h3>

      {/* Version Badge */}
      {project.status !== PROJECT_STATUS.NEW && (
        <div className="text-center mb-3">
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
            v{project.version}
          </span>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex justify-center">
        <span
          className={`px-4 py-1 bg-gradient-to-r ${getStatusColor()} text-white rounded-full text-sm font-medium`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-slate-400 text-sm text-center mt-3 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Module Count */}
      {project.modules && project.modules.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700 text-center">
          <span className="text-slate-400 text-sm">
            {project.modules.length}{" "}
            {project.modules.length === 1 ? "Module" : "Modules"}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
