import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function ProductDetail() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px'}}>
          <div className="card" style={{padding:'20px', minHeight:'360px'}}>Product gallery placeholder</div>
          <div className="card" style={{padding:'20px'}}>
            <h1 style={{marginTop:0}}>Sample Land Rover Part</h1>
            <p>Product detail page ready for supplier info, specs, OEM references and fitment status.</p>
            <div className="price">€129.00</div>
            <p className="stock">In supplier stock</p>
            <div className="actions"><button className="btn">Add to cart</button><button className="btnGhost">Check fitment</button></div>
            <hr style={{margin:'20px 0', border:'0', borderTop:'1px solid #e3e8eb'}} />
            <h3>Technical specifications</h3>
            <p className="small">Specs and OEM references should be pulled from the RIDEX article info endpoint.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
