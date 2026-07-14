// src/components/contact-list/contact-list.jsx

import { useState, useEffect, useMemo } from "react";
import { Search, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import toast from "react-hot-toast";
import { ContactCard } from "../contact-card";
import { Spinner } from "../ui/spinner";
import { AddContactModal } from "../contact-form/add-contact-modal";
import { getContacts } from "../../apis/contact-services";
import { useDebounce } from "../../hooks/use-debounce";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  const debouncedSearch = useDebounce(searchTerm, 400);

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

  const visibleContacts = useMemo(() => {
    let result = contacts;

    if (debouncedSearch.trim()) {
      const term = debouncedSearch.trim().toLowerCase();
      result = result.filter((c) => c.name?.toLowerCase().includes(term));
    }

    result = [...result].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return result;
  }, [contacts, debouncedSearch, sortOrder]);

  const handleContactAdded = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleContactDeleted = (deletedId) => {
    setContacts((prev) => prev.filter((c) => c.id !== deletedId));
  };

  const handleContactUpdated = (updated) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 p-4">
      {/* Search bar + sort button + total count badge */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-full border border-stone-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={toggleSortOrder}
          aria-label="Toggle sort order"
          title={sortOrder === "asc" ? "Sorted A-Z" : "Sorted Z-A"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-100"
        >
          {sortOrder === "asc" ? (
            <ArrowDownAZ className="h-4 w-4" />
          ) : (
            <ArrowUpAZ className="h-4 w-4" />
          )}
        </button>

        <span className="flex h-9 shrink-0 items-center justify-center rounded-full bg-teal-600 px-4 text-sm font-medium text-white">
          Total: {contacts.length}
        </span>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
          <Spinner size="lg" className="text-teal-600" />
          <p className="text-sm text-stone-500">Loading contacts...</p>
        </div>
      ) : visibleContacts.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-stone-500">No contacts found.</p>
        </div>
      ) : (
        visibleContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDeleteSuccess={handleContactDeleted}
            onUpdateSuccess={handleContactUpdated}
          />
        ))
      )}

      <AddContactModal onSuccess={handleContactAdded} />
    </div>
  );
};