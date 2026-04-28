interface VersionPanelProps {
  appId: string;
  versions: any[];
  isExpanded: boolean;
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
  onClickAddVersion: (appId: string) => void;
}

export default function VersionPanel({
  appId,
  versions,
  isExpanded,
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
  onClickAddVersion,
}: VersionPanelProps) {
  if (!isExpanded) return null;

  return (
    <div className="version-panel border-t border-[#26384a] bg-[#0d131b] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#7f98ad]">Version Depot</p>
        <button
          onClick={() => onClickAddVersion(appId)}
          className="rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-3 py-2 text-xs font-semibold text-[#0f1a24] transition hover:brightness-105"
        >
          + Add Version
        </button>
      </div>

      {(versions || []).map((v: any, index: number) => (
        <div
          key={`${appId}-${index}`}
          className="mb-3 rounded-lg border border-[#243648] bg-[#111923] p-3 text-sm break-words last:mb-0"
        >
          {editVersion?.appId === appId && editVersion?.index === index ? (
            <>
              <div className="mb-2">
                <input
                  className="w-full rounded-md border border-[#31485f] bg-[#0b1118] px-3 py-2 text-white focus:outline-none focus:border-[#66c0f4]"
                  value={editVersionName}
                  onChange={(e) => {
                    onEditChangeName(e.target.value);
                    if (editVersionErrors.version) onEditChangeName("");
                  }}
                />
                {editVersionErrors.version && (
                  <p className="text-red-400 text-[10px] mt-1">{editVersionErrors.version}</p>
                )}
              </div>

              <div className="mb-2">
                <input
                  className="w-full rounded-md border border-[#31485f] bg-[#0b1118] px-3 py-2 text-white focus:outline-none focus:border-[#66c0f4]"
                  value={editVersionUrl}
                  onChange={(e) => {
                    onEditChangeUrl(e.target.value);
                    if (editVersionErrors.url) onEditChangeUrl("");
                  }}
                />
                {editVersionErrors.url && (
                  <p className="text-red-400 text-[10px] mt-1">{editVersionErrors.url}</p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-3 py-2 text-xs font-semibold text-[#0f1a24]"
                  onClick={onSaveEdit}
                >
                  Save
                </button>
                <button
                  className="rounded-md bg-[#1a2633] px-3 py-2 text-xs text-[#c7d5e0]"
                  onClick={onCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-[#d7e7f5]">Build {v.version}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-[#6f879b]">Content server</div>
                </div>
                <span className="rounded-full bg-[#16202b] px-3 py-1 text-[11px] uppercase tracking-wide text-[#66c0f4]">
                  Ready
                </span>
              </div>
              <div className="mt-3 break-words text-sm text-[#c7d5e0]">{v.url}</div>

              <div className="mt-4 flex gap-3">
                <button
                  className="text-[#66c0f4] hover:text-[#9bd6f5]"
                  onClick={() => onClickSetEditVersion(appId, index)}
                >
                  Edit
                </button>
                <button
                  className="text-[#f08787] hover:text-[#f6b1b1]"
                  onClick={() => onDeleteVersion(appId, index)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
