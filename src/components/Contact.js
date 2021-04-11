import React from "react";
import { navigate } from "gatsby";
import Recaptcha from "react-google-recaptcha";
import Layout from "../layout";

const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY;
//const RECAPTCHA_KEY = "6LcfwqEaAAAAAAsopYYS3eDqx08Y6kGKbb49O5wu";
if (typeof RECAPTCHA_KEY === "undefined") {
  console.log("Error!");
  /* throw new Error(`
  Env var GATSBY_APP_SITE_RECAPTCHA_KEY is undefined! 
  You probably forget to set it in your Netlify build environment variables. 
  Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings
  Note this demo is specifically for Recaptcha v2
  `) */
}
console.log(RECAPTCHA_KEY);
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const [state, setState] = React.useState({});
  const recaptchaRef = React.createRef();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  console.log(buttonDisabled);
  //const [name, setName] = React.useState("");
  //const [value, setValue] = React.useState("");

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
        //action="/thanks/"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
      >
        <noscript>
          <p>This form won’t work with Javascript disabled</p>
        </noscript>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>
        <Recaptcha
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          onChange={() => setButtonDisabled(false)}
        />
        <p>
          <button type="submit" disabled={buttonDisabled}>
            Send
          </button>
        </p>
      </form>
  );
}
