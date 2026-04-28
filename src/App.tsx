import { useState, useEffect } from "react";
import {
  getApps,
  createAppApi,
  addVersionApi,
  deleteAppApi,
  updateVersionApi,
  deleteVersionApi,
} from "./api/apps.api";
import { appSchema, versionSchema, getErrorMessage } from "./utils/validation";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import {
  CreateAppModal,
  AddVersionModal,
  DeleteAppModal,
} from "./components/Modals";

const AUTH_STORAGE_KEY = "launcher-portal-auth";
const HARD_CODED_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [apps, setApps] = useState<any[]>([]);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  // MODALS
  const [showAppModal, setShowAppModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // APP FIELDS
  const [appName, setAppName] = useState("");
  const [appUrl, setAppUrl] = useState("");

  // ERROR STATES
  const [appErrors, setAppErrors] = useState<{ name?: string; url?: string }>({});
  const [versionErrors, setVersionErrors] = useState<{ version?: string; url?: string }>({});
  const [editVersionErrors, setEditVersionErrors] = useState<{ version?: string; url?: string }>({});

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [deleteAppId, setDeleteAppId] = useState<string | null>(null);

  // VERSION FIELDS
  const [versionName, setVersionName] = useState("");
  const [versionUrl, setVersionUrl] = useState("");

  // EDIT VERSION
  const [editVersion, setEditVersion] = useState<{
    appId: string;
    index: number;
  } | null>(null);

  const [editVersionName, setEditVersionName] = useState("");
  const [editVersionUrl, setEditVersionUrl] = useState("");
  const totalVersions = apps.reduce((sum, app) => sum + (app.versions?.length || 0), 0);

  // --------------------
  // FETCH APPS
  // --------------------
  const fetchApps = async () => {
    const data = await getApps();
    setApps(data);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchApps();
  }, [isAuthenticated]);

  // --------------------
  // CLICK OUTSIDE HANDLER
  // --------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".app-card") ||
        target.closest(".version-panel") ||
        target.closest(".modal")
      ) {
        return;
      }
      setExpandedAppId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --------------------
  // HANDLERS
  // --------------------
  const handleToggleApp = (id: string) => {
    setExpandedAppId((prev) => (prev === id ? null : id));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      loginUsername === HARD_CODED_CREDENTIALS.username &&
      loginPassword === HARD_CODED_CREDENTIALS.password
    ) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      setLoginPassword("");
      return;
    }

    setLoginError("Invalid username or password");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
    setExpandedAppId(null);
  };

  const handleCreateApp = async () => {
    const result = appSchema.safeParse({ name: appName, url: appUrl, version: "" });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setAppErrors({ name: fieldErrors.name?.[0], url: fieldErrors.url?.[0] });
      return;
    }
    setAppErrors({});
    try {
      await createAppApi({ name: appName, url: appUrl, version: "1.0.0" });
      await fetchApps();
      setShowAppModal(false);
      setAppName("");
      setAppUrl("");
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to create app");
      setAppErrors({ name: msg, url: "" });
    }
  };

  const handleAddVersion = async () => {
    const result = versionSchema.safeParse({ version: versionName, url: versionUrl });
    if (!result.success || !selectedAppId) {
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setVersionErrors({ version: fieldErrors.version?.[0], url: fieldErrors.url?.[0] });
      }
      return;
    }
    setVersionErrors({});
    try {
      await addVersionApi(selectedAppId, { version: versionName, url: versionUrl, size: 100 });
      await fetchApps();
      setShowVersionModal(false);
      setVersionName("");
      setVersionUrl("");
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to add version");
      setVersionErrors({ version: msg });
    }
  };

  const handleDeleteVersion = async (appId: string, index: number) => {
    const confirmDelete = window.confirm("Delete this version?");
    if (!confirmDelete) return;
    try {
      await deleteVersionApi(appId, index);
      await fetchApps();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete version.");
    }
  };

  const handleDeleteApp = async () => {
    if (!deleteAppId) return;
    try {
      await deleteAppApi(deleteAppId);
      setApps((prev) => prev.filter((app) => app._id !== deleteAppId));
      setShowDeleteModal(false);
      setDeleteAppId(null);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete app.");
    }
  };

  const handleSaveEditVersion = async () => {
    if (!editVersion) return;
    const result = versionSchema.safeParse({ version: editVersionName, url: editVersionUrl });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setEditVersionErrors({ version: fieldErrors.version?.[0], url: fieldErrors.url?.[0] });
      return;
    }
    setEditVersionErrors({});
    try {
      await updateVersionApi(editVersion.appId, editVersion.index, {
        version: editVersionName,
        url: editVersionUrl,
        size: 100,
      });
      await fetchApps();
      setEditVersion(null);
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to update version");
      setEditVersionErrors({ version: msg });
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#21384c_0%,#0b1118_45%,#070b10_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
          <section className="grid w-full overflow-hidden rounded-xl border border-[#26384a] bg-[#10161f] shadow-2xl lg:grid-cols-[1.15fr_0.85fr]">
            <div className="hidden bg-[linear-gradient(135deg,#21384c_0%,#1b2838_55%,#0b1118_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-[#66c0f4]">
                  Launcher Portal
                </p>
                <h1 className="mt-4 text-4xl font-bold text-[#d7e7f5]">
                  Welcome back to your release library.
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#93a8bb]">
                  Sign in to manage builds, maintain download depots, and track every published version from one desktop-style launcher UI.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#2c3d50] bg-[#101822] p-4">
                  <div className="text-[11px] uppercase tracking-wide text-[#7f98ad]">Depot Status</div>
                  <div className="mt-2 text-xl font-semibold text-[#d7e7f5]">Online</div>
                </div>
                <div className="rounded-lg border border-[#2c3d50] bg-[#101822] p-4">
                  <div className="text-[11px] uppercase tracking-wide text-[#7f98ad]">Access Tier</div>
                  <div className="mt-2 text-xl font-semibold text-[#66c0f4]">Admin</div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mx-auto w-full max-w-md">
                <p className="text-sm font-medium uppercase tracking-wide text-[#66c0f4] lg:hidden">
                  Launcher Portal
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#d7e7f5]">Sign In</h2>
                <p className="mt-3 text-sm text-[#93a8bb]">
                  Use the frontend credentials to unlock the launcher admin panel.
                </p>

                <div className="mt-6 rounded-lg border border-[#2c3d50] bg-[#101822] p-4 text-sm text-[#c7d5e0]">
                  <p>Username: admin</p>
                  <p className="mt-1">Password: admin123</p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#c7d5e0]" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={loginUsername}
                      onChange={(e) => {
                        setLoginUsername(e.target.value);
                        if (loginError) setLoginError("");
                      }}
                      className="w-full rounded-md border border-[#31485f] bg-[#0b1118] px-4 py-3 text-white outline-none transition focus:border-[#66c0f4]"
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#c7d5e0]" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (loginError) setLoginError("");
                      }}
                      className="w-full rounded-md border border-[#31485f] bg-[#0b1118] px-4 py-3 text-white outline-none transition focus:border-[#66c0f4]"
                      placeholder="Enter password"
                    />
                  </div>

                  {loginError ? (
                    <p className="text-sm text-red-400">{loginError}</p>
                  ) : null}

                  <button
                    type="submit"
                    className="w-full rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-4 py-3 font-semibold text-[#0f1a24] transition hover:brightness-105"
                  >
                    Sign In To Library
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1118_0%,#101822_55%,#0a0f15_100%)] text-white flex flex-col md:flex-row">
      <Sidebar appsCount={apps.length} versionsCount={totalVersions} onLogout={handleLogout} />

      <Dashboard
        apps={apps}
        expandedAppId={expandedAppId}
        onToggleApp={handleToggleApp}
        onNewApp={() => {
          setAppErrors({});
          setShowAppModal(true);
        }}
        onDeleteApp={(id) => {
          setDeleteAppId(id);
          setShowDeleteModal(true);
        }}
        editVersion={editVersion}
        editVersionName={editVersionName}
        editVersionUrl={editVersionUrl}
        editVersionErrors={editVersionErrors}
        onSaveEdit={handleSaveEditVersion}
        onCancelEdit={() => {
          setEditVersion(null);
          setEditVersionErrors({});
        }}
        onEditChangeName={(val) => {
          setEditVersionName(val);
          if (editVersionErrors.version) setEditVersionErrors({ ...editVersionErrors, version: undefined });
        }}
        onEditChangeUrl={(val) => {
          setEditVersionUrl(val);
          if (editVersionErrors.url) setEditVersionErrors({ ...editVersionErrors, url: undefined });
        }}
        onDeleteVersion={handleDeleteVersion}
        onClickSetEditVersion={(appId, index) => {
          setEditVersion({ appId, index });
          setEditVersionErrors({});
          // Find the version to pre-fill
          const app = apps.find(a => a._id === appId);
          if(app && app.versions[index]) {
             setEditVersionName(app.versions[index].version);
             setEditVersionUrl(app.versions[index].url);
          }
        }}
        onAddVersion={(appId) => {
          setSelectedAppId(appId);
          setVersionErrors({});
          setShowVersionModal(true);
        }}
      />

      {/* MODALS */}
      <CreateAppModal
        isOpen={showAppModal}
        onClose={() => setShowAppModal(false)}
        onSubmit={handleCreateApp}
        appName={appName}
        setAppName={setAppName}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
        appErrors={appErrors}
        setAppErrors={setAppErrors}
      />

      <AddVersionModal
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
        onSubmit={handleAddVersion}
        versionName={versionName}
        setVersionName={setVersionName}
        versionUrl={versionUrl}
        setVersionUrl={setVersionUrl}
        versionErrors={versionErrors}
        setVersionErrors={setVersionErrors}
      />

      <DeleteAppModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteApp}
      />
    </div>
  );
}
