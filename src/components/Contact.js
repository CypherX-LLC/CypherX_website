import React from "react";
import CTA from "../data/contact.yml";

export default function ContactForm() {
  const [status, setStatus] = React.useState({ type: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setStatus({ type: "submitting", message: "Sending your message…" });

    const formData = new FormData(form);
    formData.set("form-name", form.getAttribute("name"));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error(
          `Form submission failed with status ${response.status}`
        );
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Thanks for your message. We’ll get back to you soon.",
      });
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus({
        type: "error",
        message:
          "We could not send your message. Please check the reCAPTCHA and try again.",
      });
    }
  };

  return (
    <form
      name="contact-recaptcha"
      method="post"
      netlify-honeypot="bot-field"
      data-netlify="true"
      data-netlify-recaptcha="true"
      onSubmit={handleSubmit}
      suppressHydrationWarning
    >
      <noscript>
        <p>This form won’t work with Javascript disabled</p>
      </noscript>
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact-recaptcha" />
      <div className="contact_grid">
        <h1>{CTA.title}</h1>
        <p>{CTA.description}</p>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          className="email"
          required="required"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email"
          required="required"
        />
        <textarea
          name="message"
          rows="4"
          cols="30"
          placeholder="Message"
          required="required"
        />
        <div
          data-netlify-recaptcha="true"
          dangerouslySetInnerHTML={{ __html: "" }}
          suppressHydrationWarning
        />
        {status.message && (
          <p className="contact_status" role="status" aria-live="polite">
            {status.message}
          </p>
        )}
        <input
          type="submit"
          value="Send"
          name="send"
          id="send"
          className="subscribe_button"
          disabled={status.type === "submitting"}
        />
      </div>
    </form>
  );
}
