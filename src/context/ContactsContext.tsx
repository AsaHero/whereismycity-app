// src/context/ContactContext.js
import React, { createContext, useState, useContext } from "react";
import contactsService from "../services/contacts.service";

const ContactsContext = createContext(null);

export const ContactsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (contactData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactsService.sendMessage(contactData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || "Failed to send message");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setError(null);
    setSuccess(false);
  };

  const value = {
    loading,
    error,
    success,
    sendMessage,
    resetStatus,
  };

  return (
    <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === null) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};

export default ContactsContext;
