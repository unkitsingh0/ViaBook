import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import Footer from "../components/footer/Footer";

/**
 * ContactForm component provides a form for users to submit their name, email, and message.
 * The submitted data is used to create an email link, and the form submission triggers a mailto action.
 */
const ContactForm = () => {
  // State variables to store form input values and submission status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct email subject and body
    const subject = "Contact Form Submission";
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Construct mailto link
    const mailtoLink = `mailto:viabooking.suport@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Log the mailto link (for testing) and trigger the email client
    console.log(mailtoLink);
    window.location.href = mailtoLink;

    // Set a state to show a confirmation message
    setSubmitted(true);
  };

  return (
    <>
      <div>
        {/* // Container to control the maximum width of the content */}
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
          {/* Heading for the contact form */}
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>

          {/* Display a confirmation message if the form is already submitted */}
          {isSubmitted ? (
            <Typography variant="body1" paragraph>
              Thank you for your message! We'll get back to you soon.
            </Typography>
          ) : (
            // Form for users to input their name, email, and message
            <form onSubmit={handleFormSubmit} style={{ margin: 5 }}>
              {/* Name input field */}
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email input field */}
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Message input field */}
              <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* Submit button triggers form submission */}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
