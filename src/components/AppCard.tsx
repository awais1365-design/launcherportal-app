import VersionPanel from "./VersionPanel";

interface AppCardProps {
  app: any;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
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

export default function AppCard({
  app,
  isExpanded,
  onToggle,
  onDelete,
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
}: AppCardProps) {
  const versionCount = app.versions?.length || 0;

  return (
    <div
      key={app._id}
      className="app-card relative w-full overflow-hidden rounded-xl border border-[#2b3f54] bg-[linear-gradient(180deg,#1b2838_0%,#10161f_100%)] shadow-xl"
    >
      <div className="h-32 bg-[linear-gradient(135deg,#29435c_0%,#1b2838_55%,#0b1016_100%)]" />

      <button
        onClick={() => onDelete(app._id)}
        className="absolute right-3 top-3 rounded-md border border-[#6b2a2a] bg-[#3b1518]/90 px-2.5 py-1 text-xs text-[#f2c1c1] transition hover:bg-[#512024]"
      >
        Delete
      </button>

      <div className="cursor-pointer p-4" onClick={() => onToggle(app._id)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-[#d7e7f5] md:text-xl">{app.name}</h4>
            <p className="mt-1 text-xs uppercase tracking-wide text-[#7f98ad]">
              Latest build v{app.version}
            </p>
          </div>
          <span className="rounded-full border border-[#3e5973] bg-[#121c27] px-3 py-1 text-[11px] uppercase tracking-wide text-[#66c0f4]">
            {versionCount} versions
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-[#26384a] bg-[#0f151d]/80 p-3">
          <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Launch URL</div>
          <a
            href={`https://${app.url}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 block break-all text-sm text-[#c7d5e0] hover:text-[#66c0f4] hover:underline"
            title={app.url}
          >
            {app.url}
          </a>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[#8aa0b5]">{isExpanded ? "Build details open" : "Click to view builds"}</span>
          <span className="rounded-md bg-[#121c27] px-3 py-1 text-[#66c0f4]">
            {isExpanded ? "Hide" : "Manage"}
          </span>
        </div>
      </div>

      <VersionPanel
        appId={app._id}
        versions={app.versions}
        isExpanded={isExpanded}
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
        onClickAddVersion={onAddVersion}
      />
    </div>
  );
}
