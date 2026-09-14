import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]"
      />
      <div className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Fechar"
          >
            ✕
          </button>
        </header>
        <div className="max-h-[calc(85vh-80px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}