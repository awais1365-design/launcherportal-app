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
  const totalVersions = apps.reduce((sum, app) => sum + (app.versions?.length || 0), 0);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="overflow-hidden rounded-xl border border-[#26384a] bg-[#16202d] shadow-2xl">
        <div className="border-b border-[#26384a] bg-[linear-gradient(180deg,#21384c_0%,#17212b_100%)] px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-[#7f98ad]">Library Home</div>
              <h2 className="mt-2 text-3xl font-bold text-[#d7e7f5]">Launcher Dashboard</h2>
              <p className="mt-2 max-w-2xl text-sm text-[#93a8bb]">
                Organize builds, update release links, and maintain version history with a launcher-style control panel.
              </p>
            </div>
            <button
              onClick={onNewApp}
              className="w-full rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-4 py-2.5 text-sm font-semibold text-[#0f1a24] transition hover:brightness-105 sm:w-auto"
            >
              + Add App
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-b border-[#26384a] bg-[#101822] px-5 py-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#26384a] bg-[#0f151d] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Library Size</div>
            <div className="mt-2 text-2xl font-semibold text-[#d7e7f5]">{apps.length} apps</div>
          </div>
          <div className="rounded-lg border border-[#26384a] bg-[#0f151d] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Stored Builds</div>
            <div className="mt-2 text-2xl font-semibold text-[#d7e7f5]">{totalVersions} versions</div>
          </div>
          <div className="rounded-lg border border-[#26384a] bg-[#0f151d] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Session</div>
            <div className="mt-2 text-2xl font-semibold text-[#66c0f4]">Authenticated</div>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7f98ad]">Installed Titles</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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

            {apps.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#35506a] bg-[#101822] p-10 text-center">
                <div className="text-lg font-semibold text-[#d7e7f5]">No apps in your library</div>
                <p className="mt-2 text-sm text-[#8aa0b5]">
                  Add your first app to start tracking versions like a launcher collection.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
