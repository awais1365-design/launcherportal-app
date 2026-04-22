import AppCard from "./AppCard";

interface DashboardProps {
  apps: any[];
  expandedAppId: string | null;
  onToggleApp: (id: string) => void;
  onNewApp: () => void;
  onDeleteApp: (id: string) => void;
  editVersion: any;
  editVersionName: string;
  editVersionUrl: string;
  editVersionErrors: any;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditChangeName: (val: string) => void;
  onEditChangeUrl: (val: string) => void;
  onDeleteVersion: (appId: string, index: number) => void;
  onClickSetEditVersion: (appId: string, index: number) => void;
  onAddVersion: (appId: string) => void;
}

export default function Dashboard({
  apps,
  expandedAppId,
  onToggleApp,
  onNewApp,
  onDeleteApp,
  editVersion,
  editVersionName,
  editVersionUrl,
  editVersionErrors,
  onSaveEdit,
  onCancelEdit,
  onEditChangeName,
  onEditChangeUrl,
  onDeleteVersion,
  onClickSetEditVersion,
  onAddVersion,
}: DashboardProps) {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>
        <button onClick={onNewApp} className="bg-green-500 px-4 py-2 rounded-lg w-full sm:w-auto">
          + New App
        </button>
      </div>

      {/* GRID */}
      <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <AppCard
            key={app._id}
            app={app}
            isExpanded={expandedAppId === app._id}
            onToggle={onToggleApp}
            onDelete={onDeleteApp}
            editVersion={editVersion}
            editVersionName={editVersionName}
            editVersionUrl={editVersionUrl}
            editVersionErrors={editVersionErrors}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onEditChangeName={onEditChangeName}
            onEditChangeUrl={onEditChangeUrl}
            onDeleteVersion={onDeleteVersion}
            onClickSetEditVersion={onClickSetEditVersion}
            onAddVersion={onAddVersion}
          />
        ))}
      </div>
    </main>
  );
}