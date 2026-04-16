import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function CatalogPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <div className="sectionHeader"><h2>Catalog</h2></div>
          <div className="grid4">
            {Array.from({ length: 8 }).map((_, i) => (
              <article className="productCard" key={i}>
                <h3>Sample Part {i + 1}</h3>
                <p>Supplier-backed product placeholder for catalog layout.</p>
                <div className="price">€{(20 + i * 15).toFixed(2)}</div>
                <div className="stock">Stock available</div>
                <div className="actions"><a className="btn" href={`/catalog/sample-product-${i + 1}`}>View product</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
