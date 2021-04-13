import React from "react";
import CookieConsent from "react-cookie-consent";

const Cookie = () => {
  return (
    <CookieConsent
      location="bottom"
      enableDeclineButton="true"
      buttonText="Accept"
      declineButtonText="Reject"
      cookieName="gatsby-gdpr-google-analytics"
      contentClasses="cookies_text"
    >
      This website uses cookies which are necessary for its functioning and to
      personalise content. If you want to know more, please refer to our Cookie
      Policy. By closing this banner, scrolling this page, clicking a link, or
      continuing to browse this website, you agree to the use of cookies.
    </CookieConsent>
  );
};
export default Cookie;
