// src/components/contact-card/edit-contact-modal.jsx

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import { Spinner } from "../ui/spinner";
import { updateContact } from "../../apis/contact-services";

const initialErrors = {
  name: "",
  phone: "",
};

export const EditContactModal = ({ contact, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(contact);
  const [formError, setFormError] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);

  // هر بار که مدال باز می‌شه، فرم رو با آخرین اطلاعات مخاطب پر کن
  useEffect(() => {
    if (isOpen) {
      setForm(contact);
      setFormError(initialErrors);
    }
  }, [isOpen, contact]);

  useEffect(() => {
    if (form.name !== "" && form.name.trim().length < 3) {
      setFormError((prev) => ({ ...prev, name: "Name must be at least 3 characters" }));
    } else {
      setFormError((prev) => ({ ...prev, name: "" }));
    }

    if (form.phone !== "" && form.phone.trim().length < 7) {
      setFormError((prev) => ({ ...prev, phone: "Phone number looks too short" }));
    } else {
      setFormError((prev) => ({ ...prev, phone: "" }));
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const isFormValid =
    form.name.trim().length >= 3 &&
    form.phone.trim().length >= 7 &&
    !formError.name &&
    !formError.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill the form correctly");
      return;
    }

    try {
      setSubmitting(true);
      const updated = await updateContact(contact.id, form);
      toast.success("Contact updated successfully");
      onSuccess?.(updated);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Edit contact"
        className="shrink-0 rounded-full p-2 text-stone-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
      >
        <Pencil className="h-5 w-5" />
      </button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Edit Contact">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            {formError.name && <small className="text-red-500">{formError.name}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              dir="ltr"
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            {formError.phone && <small className="text-red-500">{formError.phone}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Job Title</label>
            <input
              type="text"
              name="job"
              value={form.job}
              onChange={handleChange}
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Avatar URL (optional)</label>
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              dir="ltr"
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !isFormValid}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Spinner size="sm" className="text-white" />}
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};