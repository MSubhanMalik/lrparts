import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type SupplierProduct = {
  id: string;
  supplierName: string;
  articleNo: string;
  supplierArticleId?: number | null;
  supplierProductName?: string | null;
  productId?: string | null;
  price?: string | number | null;
  quantity?: number | null;
  unit?: number | null;
  ean?: string | null;
  imageUrl?: string | null;
  lastSyncedAt?: string | null;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  sku?: string | null;
  brand?: string | null;
  category?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  supplierProducts?: SupplierProduct[];
};

const categories = [
  ['Braking', 'Brake discs, pads, sensors and hydraulic parts'],
  ['Suspension', 'Bushings, arms, links, shocks and air suspension'],
  ['Engine', 'Filters, belts, sensors, cooling and service parts'],
  ['Transmission', 'Driveline, gearbox and transfer case parts']
];

async function getFeaturedProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is missing');
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}/api/ridex/stored-products`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch stored products:', response.status);
      return [];
    }

    const products: Product[] = await response.json();
    return products.slice(0, 8);
  } catch (error) {
    console.error('Failed to fetch stored products:', error);
    return [];
  }
}

function formatPrice(value?: string | number | null) {
  if (value === null || value === undefined || value === '') return 'N/A';

  const numeric = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(numeric)) return 'N/A';

  return `€${numeric.toFixed(2)}`;
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      <Header />

      <section className="hero">
        <div className="container heroGrid">
          <div>
            <h1>Land Rover parts, built for Ireland.</h1>
            <p>
              Premium storefront for Discovery, Defender, Range Rover and
              Freelander parts with search, garage, supplier-backed stock and a
              Trodo-style shopping flow.
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
              <select>
                <option>Model</option>
                <option>Defender</option>
                <option>Discovery</option>
                <option>Range Rover</option>
              </select>
              <select>
                <option>Year</option>
                <option>2020</option>
                <option>2018</option>
                <option>2016</option>
              </select>
              <select>
                <option>Engine</option>
                <option>2.0</option>
                <option>3.0 TDV6</option>
                <option>5.0 V8</option>
              </select>
              <button>Show parts</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <h2>Popular categories</h2>
            <a className="small" href="/catalog">
              View all
            </a>
          </div>

          <div className="grid4">
            {categories.map(([title, desc]) => (
              <a className="categoryCard" href="/catalog" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="actions">
                  <span className="btnGhost">Browse</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <h2>Featured products</h2>
            <a className="small" href="/catalog">
              See more
            </a>
          </div>

          <div className="grid4">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                const supplier = product.supplierProducts?.[0];
                const price = supplier?.price;
                const stock = supplier?.quantity ?? 0;

                return (
                  <article className="productCard" key={product.id}>
                    <h3>{product.name}</h3>
                    <p>
                      SKU: {product.sku || supplier?.articleNo || 'N/A'}
                      <br />
                      Brand: {product.brand || 'RIDEX'}
                    </p>
                    <div className="price">{formatPrice(price)}</div>
                    <div className="stock">
                      {stock > 0 ? `In supplier stock (${stock})` : 'Out of stock'}
                    </div>
                    <div className="actions">
                      <a className="btn" href={`/products/${product.slug}`}>
                        View product
                      </a>
                      <a className="btnGhost" href="/garage">
                        Check fitment
                      </a>
                    </div>
                  </article>
                );
              })
            ) : (
              <>
                <article className="productCard">
                  <h3>No synced products yet</h3>
                  <p>
                    Run the RIDEX sync to load real catalog items into the
                    platform.
                  </p>
                  <div className="price">—</div>
                  <div className="stock">Awaiting supplier sync</div>
                  <div className="actions">
                    <a className="btn" href="/catalog">
                      Open catalog
                    </a>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <h2>Why buy from LR Parts</h2>
          </div>

          <div className="trustGrid">
            <div className="trustItem">
              <h3>Land Rover focused</h3>
              <p>
                Category and fitment structure designed specifically for LR
                models.
              </p>
            </div>
            <div className="trustItem">
              <h3>Supplier integrated</h3>
              <p>
                Price and stock are synced from live supplier-backed catalog
                data.
              </p>
            </div>
            <div className="trustItem">
              <h3>Ireland-ready</h3>
              <p>
                Support messaging and logistics flow aimed at Ireland and EU
                customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}