import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Base Modal Wrapper
export const ModalWrapper = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[#2c3d50] bg-[linear-gradient(180deg,#1b2838_0%,#10161f_100%)] p-4 md:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};



// --------------------
// CREATE APP MODAL
// --------------------
export const CreateAppModal = ({
  isOpen,
  onClose,
  onSubmit,
  appName,
  setAppName,
  appUrl,
  setAppUrl,
  appErrors,
  setAppErrors,
}: any) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wide text-[#7f98ad]">New Library Entry</div>
        <h2 className="mt-1 text-xl font-bold text-[#d7e7f5]">Create New App</h2>
      </div>
      
      <div className="mb-3">
        <input
          className="w-full rounded-md border border-[#31485f] bg-[#0b1118] p-3 text-white focus:outline-none focus:border-[#66c0f4]"
          placeholder="App name"
          value={appName}
          onChange={(e) => {
            setAppName(e.target.value);
            if (appErrors.name) setAppErrors({ ...appErrors, name: undefined });
          }}
        />
        {appErrors.name && (
          <p className="text-red-500 text-xs mt-1">{appErrors.name}</p>
        )}
      </div>

      <div className="mb-6">
        <input
          className="w-full rounded-md border border-[#31485f] bg-[#0b1118] p-3 text-white focus:outline-none focus:border-[#66c0f4]"
          placeholder="www.example.com"
          value={appUrl}
          onChange={(e) => {
            setAppUrl(e.target.value);
            if (appErrors.url) setAppErrors({ ...appErrors, url: undefined });
          }}
        />
        {appErrors.url && (
          <p className="text-red-500 text-xs mt-1">{appErrors.url}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            onClose();
            setAppErrors({});
          }}
          className="rounded-md bg-[#1a2633] px-4 py-2 text-sm text-[#c7d5e0]"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-4 py-2 text-sm font-semibold text-[#0f1a24] transition hover:brightness-105"
        >
          Create
        </button>
      </div>
    </ModalWrapper>
  );
};

// --------------------
// ADD VERSION MODAL
// --------------------
export const AddVersionModal = ({
  isOpen,
  onClose,
  onSubmit,
  versionName,
  setVersionName,
  versionUrl,
  setVersionUrl,
  versionErrors,
  setVersionErrors,
}: any) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wide text-[#7f98ad]">Build Depot</div>
        <h2 className="mt-1 text-xl font-bold text-[#d7e7f5]">Add Version</h2>
      </div>

      <div className="mb-3">
        <input
          className="w-full rounded-md border border-[#31485f] bg-[#0b1118] p-3 text-white focus:outline-none focus:border-[#66c0f4]"
          placeholder="1.0.1"
          value={versionName}
          onChange={(e) => {
            setVersionName(e.target.value);
            if (versionErrors.version) setVersionErrors({ ...versionErrors, version: undefined });
          }}
        />
        {versionErrors.version && (
          <p className="text-red-500 text-xs mt-1">{versionErrors.version}</p>
        )}
      </div>

      <div className="mb-6">
        <input
          className="w-full rounded-md border border-[#31485f] bg-[#0b1118] p-3 text-white focus:outline-none focus:border-[#66c0f4]"
          placeholder="www.download.com"
          value={versionUrl}
          onChange={(e) => {
            setVersionUrl(e.target.value);
            if (versionErrors.url) setVersionErrors({ ...versionErrors, url: undefined });
          }}
        />
        {versionErrors.url && (
          <p className="text-red-500 text-xs mt-1">{versionErrors.url}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            onClose();
            setVersionErrors({});
          }}
          className="rounded-md bg-[#1a2633] px-4 py-2 text-sm text-[#c7d5e0]"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="rounded-md border border-[#3e5973] bg-[linear-gradient(180deg,#66c0f4_0%,#417a9b_100%)] px-4 py-2 text-sm font-semibold text-[#0f1a24] transition hover:brightness-105"
        >
          Add
        </button>
      </div>
    </ModalWrapper>
  );
};

// --------------------
// DELETE MODAL
// --------------------
export const DeleteAppModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wide text-[#a88686]">Remove From Library</div>
        <h2 className="mt-1 text-xl font-bold text-[#f1c4c4]">Delete App</h2>
      </div>
      <p className="mb-6 text-sm text-[#c7d5e0]">
        Are you sure you want to delete this app?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-md bg-[#1a2633] px-4 py-2 text-sm text-[#c7d5e0]"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-[#6b2a2a] bg-[linear-gradient(180deg,#a94848_0%,#732f2f_100%)] px-4 py-2 text-sm font-semibold text-white"
        >
          Delete
        </button>
      </div>
    </ModalWrapper>
  );
};
