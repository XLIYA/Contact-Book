// src/components/contact-card/delete-contact-modal.jsx

import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import { Spinner } from "../ui/spinner";
import { deleteContact } from "../../apis/contact-services";

export const DeleteContactModal = ({ id, name, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await deleteContact(id);
      toast.success("Contact deleted successfully");
      onSuccess?.(id);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Delete trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Delete contact"
        className="shrink-0 rounded-full p-2 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      {/* Confirmation modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Delete Contact">
        <p className="text-sm text-stone-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-stone-800">{name}</span>? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Spinner size="sm" className="text-white" />}
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};