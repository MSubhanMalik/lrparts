import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const categories = [
  ['Braking', 'Brake discs, pads, sensors and hydraulic parts'],
  ['Suspension', 'Bushings, arms, links, shocks and air suspension'],
  ['Engine', 'Filters, belts, sensors, cooling and service parts'],
  ['Transmission', 'Driveline, gearbox and transfer case parts']
];

const featured = [
  ['Brake Disc Front', 'OEM-ready aftermarket option for popular Discovery and Range Rover models', '€89.00'],
  ['Suspension Arm Kit', 'Heavy-duty option for road and light off-road use', '€164.00'],
  ['Air Filter', 'Service replacement with article and OEM mapping', '€18.00'],
  ['Axle Bush', 'Supplier-backed stock with technical specifications', '€24.00']
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <h1>Land Rover parts, built for Ireland.</h1>
            <p>
              Premium storefront for Discovery, Defender, Range Rover and Freelander parts with search, garage,
              supplier-backed stock and a Trodo-style shopping flow.
            </p>
            <div className="badges">
              <div className="badge">Ireland support</div>
              <div className="badge">OEM references</div>
              <div className="badge">Supplier stock sync</div>
              <div className="badge">VIN-ready architecture</div>
            </div>
          </div>
          <div className="vehicleCard">
            <h3>Find parts for your Land Rover</h3>
            <div className="filterGrid">
              <select><option>Model</option><option>Defender</option><option>Discovery</option><option>Range Rover</option></select>
              <select><option>Year</option><option>2020</option><option>2018</option><option>2016</option></select>
              <select><option>Engine</option><option>2.0</option><option>3.0 TDV6</option><option>5.0 V8</option></select>
              <button>Show parts</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader"><h2>Popular categories</h2><a className="small" href="/catalog">View all</a></div>
          <div className="grid4">
            {categories.map(([title, desc]) => (
              <a className="categoryCard" href="/catalog" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="actions"><span className="btnGhost">Browse</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader"><h2>Featured products</h2><a className="small" href="/catalog">See more</a></div>
          <div className="grid4">
            {featured.map(([title, desc, price]) => (
              <article className="productCard" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="price">{price}</div>
                <div className="stock">In supplier stock</div>
                <div className="actions">
                  <a className="btn" href="/catalog/sample-product">View product</a>
                  <a className="btnGhost" href="/garage">Check fitment</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader"><h2>Why buy from LR Parts</h2></div>
          <div className="trustGrid">
            <div className="trustItem"><h3>Land Rover focused</h3><p>Category and fitment structure designed specifically for LR models.</p></div>
            <div className="trustItem"><h3>Supplier integrated</h3><p>Price and stock can be checked against supplier data before checkout.</p></div>
            <div className="trustItem"><h3>Ireland-ready</h3><p>Support messaging and logistics flow aimed at Ireland and EU customers.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
