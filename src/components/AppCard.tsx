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
  return (
    <div key={app._id} className="app-card bg-gray-900 p-4 rounded-xl relative w-full">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(app._id)}
        className="absolute top-2 right-2 text-xs bg-red-600 px-2 py-1 rounded"
      >
        Delete
      </button>

      {/* Header */}
      <div className="cursor-pointer" onClick={() => onToggle(app._id)}>
        <h4 className="font-bold text-sm md:text-base">{app.name}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-1">
          <p className="text-gray-400 text-xs md:text-sm">v{app.version}</p>
          <a
            href={`https://${app.url}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-green-400 text-xs md:text-sm hover:underline break-all"
            title={app.url}
          >
            {app.url}
          </a>
        </div>
      </div>

      {/* Version Panel */}
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