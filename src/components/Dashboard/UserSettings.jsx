import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { X, User, Key, Mail, Save } from "lucide-react";

function UserSettings({ isOpen, onClose }) {
  const { user, awsCredentials, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateUser(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">User Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Profile Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AWS Credentials Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              AWS Configuration
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">
                    AWS Account Status
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      awsCredentials && !awsCredentials.skipped
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {awsCredentials && !awsCredentials.skipped
                      ? "Linked"
                      : "Not Linked"}
                  </span>
                </div>

                {awsCredentials && !awsCredentials.skipped && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Key size={16} />
                      <span>
                        Access Key:{" "}
                        {awsCredentials.accessKeyId?.substring(0, 8)}...
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>
                        Region: {awsCredentials.region || "us-east-1"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {awsCredentials && !awsCredentials.skipped
                  ? "Update AWS Credentials"
                  : "Link AWS Account"}
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Dark Mode
                  </p>
                  <p className="text-xs text-slate-400">
                    Always enabled for better visibility
                  </p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Auto-save Projects
                  </p>
                  <p className="text-xs text-slate-400">
                    Automatically save changes every 5 minutes
                  </p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    AI Suggestions
                  </p>
                  <p className="text-xs text-slate-400">
                    Show AI optimization recommendations
                  </p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">
              Danger Zone
            </h3>

            <div className="space-y-3">
              <button className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors border border-red-600/30">
                Delete All Projects
              </button>
              <button className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors border border-red-600/30">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
