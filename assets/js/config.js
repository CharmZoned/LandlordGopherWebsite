/*
 * Site integration settings. Leave a value empty until the matching service
 * exists; the page hides or disables the related feature instead of faking it.
 */
window.LANDLORD_GOPHER_CONFIG = {
  // POST endpoint for the inquiry form (e.g. a Formspree, Basin or CRM webhook
  // URL). The form is sent as multipart FormData with `Accept: application/json`
  // and any 2xx response is treated as success.
  inquiryEndpoint: "",

  // Public review profile (Google, Facebook, etc.). The "Check Out Our Reviews"
  // button stays hidden until this is set.
  reviewsUrl: "",
};
