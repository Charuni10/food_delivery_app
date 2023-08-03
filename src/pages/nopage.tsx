import { Header } from "../components/header";
import { Footer } from "../components/footer";

// this opens when no page exists
export function NoPage() {
  return (
    <div>
      <Header />
      <p>Error: No page exists</p>
      <Footer/>
    </div>
  );
}
