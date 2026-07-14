import { Phone, Briefcase, Star } from "lucide-react";
import { Modal } from "../ui/modal";

export const ContactDetailsModal = ({ contact, isOpen, onClose }) => {
    if (!contact) return null;

    const { name, phone, job, favorite, avatar } = contact;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
            <div className="flex flex-col items-center gap-4">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="h-24 w-24 rounded-full object-cover ring-2 ring-stone-100"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-2xl font-semibold text-white ring-2 ring-stone-100">
                        {name?.charAt(0).toUpperCase()}
                    </div>
                )}

                <h3 className="font-['Noto_Serif'] text-xl font-semibold text-stone-800">{name}</h3>

                <div className="w-full space-y-3 rounded-xl bg-stone-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-stone-700" dir="ltr">
                        <Phone className="h-4 w-4 shrink-0 text-teal-600" />
                        {phone}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-stone-700">
                        <Briefcase className="h-4 w-4 shrink-0 text-teal-600" />
                        {job || "—"}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-stone-700">
                        <Star className={`h-4 w-4 shrink-0 ${favorite ? "fill-amber-400 text-amber-400" : "text-stone-400"}`} />
                        {favorite ? "Marked as favorite" : "Not a favorite"}
                    </div>
                </div>
            </div>
        </Modal>
    );
};