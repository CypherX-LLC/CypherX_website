import React from "react";
import Recaptcha from "react-google-recaptcha";
import CTA from "../data/contact.yml";

const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY;
if (typeof RECAPTCHA_KEY === "undefined") {
  console.log("Error - RECAPTCHA_KEY not defined");
}

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function ContactForm() {
  const [state, setState] = React.useState({});
  const recaptchaRef = React.createRef();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const recaptchaValue = recaptchaRef.current.getValue();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        "g-recaptcha-response": recaptchaValue,
        ...state,
      }),
    })
      .then(
        () => {
          setButtonDisabled(true);
        }

        /* navigate(form.getAttribute('action')) */
      )
      .catch((error) => alert(error));

    recaptchaRef.current.reset();
    setButtonDisabled(true);
    e.target.reset();
  };

  return (
    <form
      name="contact-recaptcha"
      method="post"
      netlify-honeypot="bot-field"
      data-netlify="true"
      data-netlify-recaptcha="true"
      onSubmit={handleSubmit}
      //action="/thanks/"
    >
      <noscript>
        <p>This form won’t work with Javascript disabled</p>
      </noscript>
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <div className="contact_grid">
        <h1>{CTA.title}</h1>
        <p>{CTA.description}</p>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Full name"
          className="email"
          required="required"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="email"
          required="required"
        />
        <textarea
          name="message"
          onChange={handleChange}
          rows="4"
          cols="30"
          placeholder="Message"
          required="required"
        />
        <Recaptcha
          className="g-recaptcha"
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          onChange={() => setButtonDisabled(false)}
        />
        <input
          type="submit"
          value="Send"
          name="send"
          id="send"
          className="subscribe_button"
          disabled={buttonDisabled}
        />
      </div>
    </form>
  );
}
