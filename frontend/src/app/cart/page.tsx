import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function CartPage() {
  return (
    <main>
      <Header />
      <section className="section"><div className="container"><div className="card" style={{padding:'20px'}}><h2>Cart</h2><p>Checkout and supplier order placement can be connected here.</p></div></div></section>
      <Footer />
    </main>
  );
}
