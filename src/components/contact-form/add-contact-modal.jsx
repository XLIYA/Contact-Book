import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import { Spinner } from "../ui/spinner";
import { createContact } from "../../apis/contact-services";

const initialForm = {
    name: "",
    phone: "",
    job: "",
    avatar: "",
};

const initialErrors = {
    name: "",
    phone: "",
};

export const AddContactModal = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [formError, setFormError] = useState(initialErrors);
    const [submitting, setSubmitting] = useState(false);

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

    const resetForm = () => {
        setForm(initialForm);
        setFormError(initialErrors);
    };

    const handleClose = () => {
        resetForm();
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
            const newContact = await createContact({
                ...form,
                favorite: false,
            });

            toast.success("Contact added successfully");
            onSuccess?.(newContact);
            resetForm();
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
                aria-label="Add Contact"
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-200 hover:bg-orange-600 hover:shadow-xl active:scale-95"
            >
                <Plus className="h-7 w-7" strokeWidth={2.5} />
            </button>

            <Modal isOpen={isOpen} onClose={handleClose} title="Add Contact">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-stone-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
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
                            placeholder="(555) 123-4567"
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
                            placeholder="Product Designer"
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
                            placeholder="https://..."
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
                            {submitting ? "Adding..." : "Add Contact"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};