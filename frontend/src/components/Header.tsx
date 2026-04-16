export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div>Ireland specialist for Land Rover parts</div>
          <div>+353 (0)21 202 1395 • inbox@lrparts.ie</div>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">LR <span>Parts</span></a>
          <div className="searchBar">
            <input placeholder="Search by part name, OEM number, or article number" />
            <button>Search</button>
          </div>
          <div className="headerActions">
            <a className="headerChip" href="/garage">My Garage</a>
            <a className="headerChip" href="/cart">Cart</a>
          </div>
        </div>
      </header>
    </>
  );
}
