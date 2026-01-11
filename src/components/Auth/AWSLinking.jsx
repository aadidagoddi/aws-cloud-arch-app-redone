import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Cloud, Key, CheckCircle, AlertCircle } from "lucide-react";

function AWSLinking() {
  const navigate = useNavigate();
  const { linkAWS, user } = useAuthStore();
  const [credentials, setCredentials] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const testConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus(null);

    // Simulate AWS credential validation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock success for demo
    setConnectionStatus("success");
    setTestingConnection(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!credentials.accessKeyId || !credentials.secretAccessKey) {
      setError("Please provide AWS credentials");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      linkAWS(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to link AWS account. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const skipForNow = () => {
    // Set a dummy/skipped status so the app knows AWS linking was addressed
    linkAWS({ skipped: true });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-2xl mb-4">
            <Cloud size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Link Your AWS Account
          </h1>
          <p className="text-slate-400">
            Connect your AWS credentials to manage your cloud infrastructure
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-start gap-3 mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <AlertCircle
              size={20}
              className="text-blue-400 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm text-slate-300">
              <p className="font-medium text-blue-400 mb-1">Security Note</p>
              <p>
                Your AWS credentials are stored securely and encrypted. We
                recommend using IAM credentials with limited permissions.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {connectionStatus === "success" && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm flex items-center gap-2">
              <CheckCircle size={18} />
              Connection successful! You can now link your account.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* AWS Access Key ID */}
            <div>
              <label
                htmlFor="accessKeyId"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                AWS Access Key ID
              </label>
              <div className="relative">
                <Key
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  id="accessKeyId"
                  name="accessKeyId"
                  type="text"
                  value={credentials.accessKeyId}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-mono text-sm"
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                  disabled={loading}
                />
              </div>
            </div>

            {/* AWS Secret Access Key */}
            <div>
              <label
                htmlFor="secretAccessKey"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                AWS Secret Access Key
              </label>
              <div className="relative">
                <Key
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  id="secretAccessKey"
                  name="secretAccessKey"
                  type="password"
                  value={credentials.secretAccessKey}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-mono text-sm"
                  placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                  disabled={loading}
                />
              </div>
            </div>

            {/* AWS Region */}
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Default Region
              </label>
              <select
                id="region"
                name="region"
                value={credentials.region}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                disabled={loading}
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-east-2">US East (Ohio)</option>
                <option value="us-west-1">US West (N. California)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">Europe (Ireland)</option>
                <option value="eu-central-1">Europe (Frankfurt)</option>
                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
              </select>
            </div>

            {/* Test Connection Button */}
            <button
              type="button"
              onClick={testConnection}
              disabled={
                testingConnection ||
                !credentials.accessKeyId ||
                !credentials.secretAccessKey
              }
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              {testingConnection ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Testing Connection...
                </>
              ) : (
                "Test Connection"
              )}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || connectionStatus !== "success"}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Link AWS Account"
              )}
            </button>

            {/* Skip Button */}
            <button
              type="button"
              onClick={skipForNow}
              className="w-full py-3 text-slate-400 hover:text-white font-medium transition-colors"
            >
              Skip for now
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">
              <strong className="text-slate-300">
                How to get AWS credentials:
              </strong>
            </p>
            <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
              <li>Go to AWS IAM Console</li>
              <li>Create a new IAM user or use existing one</li>
              <li>Generate access keys in Security Credentials</li>
              <li>Copy the Access Key ID and Secret Access Key</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AWSLinking;
