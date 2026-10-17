export default function DashboardPage() {
  return (
    <section className="dashboard-welcome">
      <p className="eyebrow"><span className="eyebrow-dot" /> A TE KÖZÖS TERED</p>
      <h1>Jó, hogy itt vagy!</h1>
      <p>Helyet foglalnál vagy eseményt indítanál? Innen minden közös élmény egy lépésre van.</p>
      <div className="dashboard-shortcuts">
        <a className="button" href="/dashboard/events/new">Új esemény létrehozása <span>↗</span></a>
        <a className="button button-outline" href="/dashboard/bookings">Foglalásaim <span>↗</span></a>
      </div>
    </section>
  );
}
