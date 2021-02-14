/** URL used to connect to the back-end of the application, picking between the
 * appropiate both for development and for production
 */
const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://devdiegoest-template.herokuapp.com/api"
    : "http://localhost:5000/api";

export { backendURL };
