import { Header } from "../components/header";
import { CardHome } from "../components/card";
import '../static/card.css'
import CitySearch from "../components/citysearch";
import { Footer } from "../components/footer";


export function Home() {


  return (
    <div>
      <Header />
     
      <CitySearch/>

      <div className="home-container">
      <CardHome />
      </div>
      <Footer/>
    </div>
  );
}
