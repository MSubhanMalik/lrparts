import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function GaragePage() {
  return (
    <main>
      <Header />
      <section className="section"><div className="container"><div className="card" style={{padding:'20px'}}><h2>My Garage</h2><p>Save vehicle, model, year, engine and future VIN lookup here.</p></div></div></section>
      <Footer />
    </main>
  );
}
