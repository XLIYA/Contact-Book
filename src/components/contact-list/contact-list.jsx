import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ContactCard } from "../contact-card";
import { Spinner } from "../ui/spinner";
import { AddContactModal } from "../contact-form/add-contact-modal";
import { getContacts } from "../../apis/contact-services";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        toast.error(err.message || "Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleContactAdded = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Spinner size="lg" className="text-teal-600" />
        <p className="text-sm text-stone-500">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 p-4">
      {contacts.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-stone-500">No contacts found.</p>
        </div>
      ) : (
        contacts.map((contact) => <ContactCard key={contact.id} {...contact} />)
      )}

      <AddContactModal onSuccess={handleContactAdded} />
    </div>
  );
};