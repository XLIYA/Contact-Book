import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body
    );
};