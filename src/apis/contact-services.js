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