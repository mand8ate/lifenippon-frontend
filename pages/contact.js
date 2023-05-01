import Layout from "../components/Layout";
import Link from "next/link";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="col-md-8 offset-md-2">
          <h2>Contact Form</h2>
          <hr />
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
