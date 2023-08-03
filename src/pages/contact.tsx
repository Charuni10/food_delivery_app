// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export function Contact() {
    return (
      // basic contact information
      <><div >
        <Header />
      <div className="container-about">
        <h1>Contact Us</h1>

        <h2>Contact Information:</h2>
        <p>Customer Support:</p>
        <ul>
          <li><a href="tel:+1234567890">Phone: +1 234-567-890</a></li>
          <li>Email: <a href="mailto:info@example.com">info@example.com</a></li>
        </ul>

        <p>Business Inquiries:</p>
        <ul>
          <li><a href="tel:+1234567890">Phone: +1 234-567-890</a></li>
          <li>Email: <a href="mailto:info@example.com">info@example.com</a></li>
        </ul>

        <h2>Office Address:</h2>
        <p>If you prefer to visit us in person or send us mail, here's our office address:<br/>

          Foodiee<br />
          123,Second street<br />
         Koregoan Park<br />
          Pune, Maharastra<br />
          India

        </p>
        <h2>Working Hours:</h2>
        <p>Our customer support team is available round the clock to assist you. However, our office hours for business inquiries are:</p>
        <ul>
          <li>Monday to Friday: 8 AM - 8 PM </li>
          <li>Saturday and Sunday: Closed</li>
        </ul>
        <p>Please note that our delivery service operates 24/7, so you can place your orders anytime.</p>

        <h2>Feedback and Reviews:</h2>
        <p>Your feedback is essential to us, as it helps us improve our services and provide you with the best possible experience. We encourage you to leave reviews and ratings on our app or website after each order. Your reviews are valuable to both us and other customers who may be considering our service.</p>

        <h2>Privacy and Security:</h2>
        <p>We take your privacy and security seriously. If you have any concerns about how we handle your personal information or payment details, please refer to our <a href="[Link to Privacy Policy]">Privacy Policy</a>.</p>
        </div>
      </div><Footer /></>
      
    );
  }
  