import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { Hello, contactsState } from "../recoil/Atomic";

export default function Contacts() {
  const [contacts, setContacts] = useRecoilState(contactsState);
  const [Glow, setGlow] = useRecoilState(Hello);

  const [Name, setName] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null); // Track the contact being edited

  useEffect(() => {
    setGlow(true);
  }, []);

  if (!Glow) {
    return null;
  }

  const addContact = (e) => {
    e.preventDefault();
    if (Name && Organization && Email) {
      const newContact = {
        id: Date.now(),
        Name,
        Organization,
        Email,
      };
      setContacts((prev) => [...contacts, newContact]);

      // Reset form fields after adding
      setName("");
      setOrganization("");
      setEmail("");
    } else {
      console.log("Fill all the fields");
    }
  };

  const updateContact = (e) => {
    e.preventDefault();
    if (Name && Organization && Email && editingId) {
      const updatedContact = {
        id: editingId,
        Name,
        Organization,
        Email,
      };
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingId ? updatedContact : contact
        )
      );

      // Reset the form and editing state after updating
      setName("");
      setOrganization("");
      setEmail("");
      setEditingId(null);
    }
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const editContact = (contact) => {
    setName(contact.Name);
    setOrganization(contact.Organization);
    setEmail(contact.Email);
    setEditingId(contact.id); // Set the contact ID to editing mode
  };

  return (
    <div className="ml-2 mt-2 p-4 sm:p-6 md:ml-4 md:mt-4 lg:ml-8 lg:mt-6">
      <h1 className="text-2xl font-bold">Contacts</h1>

      {/* Contact Form */}
      <form
        onSubmit={editingId ? updateContact : addContact}
        className="mt-4 flex flex-col space-y-3 md:space-y-4 lg:w-1/2 xl:w-1/3"
      >
        <input
          className="rounded p-2 text-black"
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(info) => setName(info.target.value)}
        />
        <input
          className="rounded p-2 text-black"
          type="text"
          placeholder="Organization"
          value={Organization}
          onChange={(info) => setOrganization(info.target.value)}
        />
        <input
          className="rounded p-2 text-black"
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(info) => setEmail(info.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 rounded mt-2 hover:bg-blue-700"
        >
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 rounded bg-gray-800"
          >
            <div>
              <p className="font-bold">Name: {contact.Name}</p>
              <p className="font-bold">Organization: {contact.Organization}</p>
              <p className="font-bold">Email: {contact.Email}</p>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              {/* Edit Button */}
              <button
                className="text-white bg-yellow-500 rounded px-2 py-1 hover:bg-yellow-700"
                onClick={() => editContact(contact)}
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                className="text-white bg-red-900 rounded px-2 py-1 hover:bg-red-700"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
