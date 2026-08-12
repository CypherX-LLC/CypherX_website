import React from "react";
import Recaptcha from "react-google-recaptcha";
import CTA from "../data/contact.yml";

const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY;

export default function ContactForm() {
  const recaptchaRef = React.useRef(null);
  const [recaptchaValue, setRecaptchaValue] = React.useState("");
  const [status, setStatus] = React.useState({ type: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const token = recaptchaValue || recaptchaRef.current?.getValue();

    if (!token) {
      setStatus({
        type: "error",
        message: "Please complete the reCAPTCHA before sending your message.",
      });
      return;
    }

    setStatus({ type: "submitting", message: "Sending your message…" });

    const formData = new FormData(form);
    formData.set("form-name", form.name);
    formData.set("g-recaptcha-response", token);

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
      recaptchaRef.current?.reset();
      setRecaptchaValue("");
      setStatus({
        type: "success",
        message: "Thanks for your message. We’ll get back to you soon.",
      });
    } catch (error) {
      console.error("Contact form submission failed", error);
      recaptchaRef.current?.reset();
      setRecaptchaValue("");
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
        <Recaptcha
          className="g-recaptcha"
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          onChange={(value) => {
            setRecaptchaValue(value || "");
            if (value) setStatus({ type: "idle", message: "" });
          }}
          onExpired={() => setRecaptchaValue("")}
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
          disabled={!recaptchaValue || status.type === "submitting"}
        />
      </div>
    </form>
  );
}
