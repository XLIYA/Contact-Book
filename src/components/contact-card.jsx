import { useState } from "react";
import { Phone } from "lucide-react";
import { EditContactModal } from "./contact-card/edit-contact-modal";
import { FavoriteButton } from "./contact-card/favorite-button";
import { ContactDetailsModal } from "./contact-card/contact-details-modal";
import { DeleteContactModal } from "./contact-card/delete-contact-moda";

export const ContactCard = ({ contact, onDeleteSuccess, onUpdateSuccess }) => {
  const { name, phone, job, avatar } = contact;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowDetails(true)}
        className="group relative flex cursor-pointer items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      >
        <FavoriteButton contact={contact} onSuccess={onUpdateSuccess} />

        <div className="shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-stone-100 sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-lg font-semibold text-white ring-2 ring-stone-100 sm:h-16 sm:w-16">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-['Noto_Serif'] text-base font-semibold text-stone-800 sm:text-lg">
            {name}
          </h3>
          <p className="truncate text-sm text-stone-500">{job}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-600" dir="ltr">
            <Phone className="h-3.5 w-3.5 shrink-0 text-teal-600" />
            {phone}
          </p>
        </div>


        <div
          onClick={(e) => e.stopPropagation()}
          className="flex shrink-0 items-center gap-1"
        >
          <EditContactModal contact={contact} onSuccess={onUpdateSuccess} />
          <DeleteContactModal id={contact.id} name={name} onSuccess={onDeleteSuccess} />
        </div>
      </div>

      <ContactDetailsModal
        contact={contact}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};