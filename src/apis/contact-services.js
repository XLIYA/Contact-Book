import { Rss } from "lucide-react";
import { BASE_URL } from "../utils/api-client";

export const getContacts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/contact`);

    if (!res.ok) {
      throw new Error(`Failed to fetch contacts (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong while fetching contacts");
  }
};

export const createContact = async (contact) => {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!res.ok) {
      throw new Error(`Failed to create contact (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong while creating the contact");
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete contact (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong while deleting the contact");
  }
}

export const updateContact = async (id, contact) => {
  try {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (!res.ok) {
      throw new Error(`Failed to update contact (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong while updating the contact");
  }
}