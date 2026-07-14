// src/components/contact-card/favorite-button.jsx

import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { updateContact } from "../../apis/contact-services";

export const FavoriteButton = ({ contact, onSuccess }) => {
  const [updating, setUpdating] = useState(false);

  const handleToggle = async () => {
    if (updating) return;

    try {
      setUpdating(true);
      const updated = await updateContact(contact.id, {
        ...contact,
        favorite: !contact.favorite,
      });
      onSuccess?.(updated);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={updating}
      aria-label={contact.favorite ? "Unmark as favorite" : "Mark as favorite"}
      className="absolute right-3 top-3 text-stone-300 transition-colors hover:text-amber-400 disabled:cursor-not-allowed"
    >
      <Star
        className={`h-5 w-5 drop-shadow-sm ${
          contact.favorite ? "fill-amber-400 text-amber-400" : "fill-none"
        }`}
      />
    </button>
  );
};