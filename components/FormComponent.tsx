"use client";

import emailjs from "@emailjs/browser";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

export default function FormComponent() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("");

  const deleteForm = () => {
    setStatus("");
    setFormData({ name: formData.name, message: "" });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name) {
      setStatus("⚠️ Inserisci il tuo nome.");
      return;
    }
    if (!formData.message) {
      setStatus("⚠️ Inserisci un messaggio.");
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID as string,
        formData,
        process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY as string
      )
      .then(
        () => {
          setStatus("✅ Messaggio inviato con successo!");
          setFormData({ name: "", message: "" });
        },
        () => {
          setStatus("❌ Errore nell'invio del messaggio. Riprova.");
        }
      );
  };

  return (
    <form onSubmit={sendMessage} className="space-y-6 px-6 py-4">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <textarea
          name="message"
          id="message"
          placeholder="Your message..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center justify-center gap-x-4">
        <button
          type="button"
          onClick={deleteForm}
          className="w-12 h-12 bg-red-400 text-white rounded-full hover:bg-red-600 flex items-center justify-center shadow-md"
        >
          <FaTrash />
        </button>
        <button
          type="submit"
          className="w-12 h-12 bg-green-400 text-white rounded-full hover:bg-green-700 flex items-center justify-center shadow-md"
        >
          <FaPaperPlane />
        </button>
      </div>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </form>
  );
}
