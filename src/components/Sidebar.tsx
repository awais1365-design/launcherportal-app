interface SidebarProps {
  appsCount?: number;
  versionsCount?: number;
  onLogout?: () => void;
}

export default function Sidebar({
  appsCount = 0,
  versionsCount = 0,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-72 border-r border-[#26384a] bg-[linear-gradient(180deg,#0f151d_0%,#111923_35%,#0b1118_100%)] p-4 md:p-6 flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-md border border-[#2c3d50] bg-[#121b25] px-3 py-2 text-[11px] uppercase tracking-wide text-[#7f98ad]">
          <span>Library</span>
          <span>Online</span>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#d7e7f5] text-center md:text-left">
            Launcher Portal
          </h1>
          <p className="mt-2 text-sm text-[#8aa0b5] text-center md:text-left">
            Release library manager
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-lg border border-[#26384a] bg-[#101822] p-3">
        <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Quick Access</div>
        <div className="rounded-md bg-[#1b2838] px-3 py-2 text-sm font-medium text-[#d7e7f5]">
          All Apps
        </div>
        <div className="px-3 py-2 text-sm text-[#8aa0b5]">Recent Builds</div>
        <div className="px-3 py-2 text-sm text-[#8aa0b5]">Version Queue</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-[#26384a] bg-[#101822] p-3">
          <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Apps</div>
          <div className="mt-2 text-xl font-semibold text-[#d7e7f5]">{appsCount}</div>
        </div>
        <div className="rounded-lg border border-[#26384a] bg-[#101822] p-3">
          <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Versions</div>
          <div className="mt-2 text-xl font-semibold text-[#d7e7f5]">{versionsCount}</div>
        </div>
      </div>

      <div className="rounded-lg border border-[#26384a] bg-[#101822] p-4">
        <div className="text-[11px] uppercase tracking-wide text-[#6f879b]">Session</div>
        <p className="mt-2 text-sm text-[#d7e7f5]">Frontend admin access enabled.</p>
        <p className="mt-1 text-xs text-[#7f98ad]">This view is styled like a game launcher library.</p>
      </div>

      <div>
        <h2 className="mb-3 text-[11px] uppercase tracking-wide text-[#6f879b]">Installed</h2>
        <div className="space-y-2">
          <div className="rounded-md border border-[#2a3b4d] bg-[#16202b] px-3 py-2 text-sm text-[#d7e7f5]">
            Portal Client
          </div>
          <div className="rounded-md bg-transparent px-3 py-2 text-sm text-[#8aa0b5]">
            Build Monitor
          </div>
          <div className="rounded-md bg-transparent px-3 py-2 text-sm text-[#8aa0b5]">
            Download Depot
          </div>
        </div>
      </div>

      {onLogout ? (
        <button
          type="button"
          onClick={onLogout}
          className="mt-auto w-full rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#2a475e_0%,#1b3042_100%)] px-4 py-2.5 text-sm font-medium text-[#d7e7f5] transition hover:brightness-110"
        >
          Sign Out
        </button>
      ) : null}
    </aside>
  );
}
