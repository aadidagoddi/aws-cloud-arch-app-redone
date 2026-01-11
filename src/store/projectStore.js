import { create } from "zustand";

export const PROJECT_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in_progress",
  MVP: "mvp",
  RUNNING: "running",
};

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,

  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          id: Date.now().toString(),
          name: project.name,
          description: project.description,
          status: PROJECT_STATUS.NEW,
          icon: null,
          createdAt: new Date().toISOString(),
          version: "0.0.0",
          architecture: null,
          testCases: [],
          modules: [],
          ...project,
        },
      ],
    })),

  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      currentProject:
        state.currentProject?.id === projectId ? null : state.currentProject,
    })),

  setCurrentProject: (project) => set({ currentProject: project }),

  updateProjectStatus: (projectId, status) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, status } : p
      ),
    })),

  updateProjectIcon: (projectId, iconData) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, icon: iconData } : p
      ),
    })),

  addTestCase: (projectId, testCase) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, testCases: [...p.testCases, testCase] } : p
      ),
    })),
}));
