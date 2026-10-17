import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function nextWeekday(weekday, hour, minute, weeksAhead = 0) {
  const date = new Date();
  const daysUntil = (weekday - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + daysUntil + weeksAhead * 7);
  date.setHours(hour, minute, 0, 0);
  if (date <= new Date()) date.setDate(date.getDate() + 7);
  return date;
}

const events = [
  {
    slug: "fenyek-ejszakaja",
    title: "A fények éjszakája",
    description:
      "Egy este, amikor a város fénnyel telik meg. Fedezd fel Budapest rejtett udvarait, fényinstallációit és a kortárs művészek különleges alkotásait egy közös, vezetett sétán.",
    date: nextWeekday(4, 18, 30, 1),
    location: "Városliget, Műcsarnok",
    city: "Budapest",
    category: "Kultúra",
    price: 4500,
    capacity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "vasarnapi-brunch-klub",
    title: "Vasárnapi brunch klub",
    description:
      "Hosszú asztal, friss péksütemények, szezonális fogások és jó társaság. Hozz egy könyvet, egy barátot, vagy csak az étvágyadat.",
    date: nextWeekday(0, 10, 0),
    location: "Központ Bisztró",
    city: "Budapest",
    category: "Gasztro",
    price: 6900,
    capacity: 32,
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "keramia-workshop",
    title: "Agyag, kéz, forma",
    description:
      "Lassíts le egy délutánra, és készítsd el az első saját kerámiatárgyadat. A workshopon minden eszközt és alapanyagot biztosítunk, előképzettség nem szükséges.",
    date: nextWeekday(2, 17, 0, 1),
    location: "Műhely 22",
    city: "Budapest",
    category: "Workshop",
    price: 8500,
    capacity: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "akusztius-kertmozi",
    title: "Akusztikus kertmozi",
    description:
      "Kedvenc filmjeink a csillagos ég alatt, élő akusztikus felvezetéssel. Takarót, pokrócot és forró teát adunk, neked csak meg kell érkezned.",
    date: nextWeekday(5, 19, 0, 1),
    location: "Kopaszi-gát",
    city: "Budapest",
    category: "Zene",
    price: 3200,
    capacity: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "reggeli-futoklub",
    title: "Reggeli futóklub",
    description:
      "Kezdd mozgással a szombatot! Egy laza, minden tempóhoz alkalmazkodó közös futás a Duna-parton, utána kávéval és reggelivel.",
    date: nextWeekday(6, 8, 30, 2),
    location: "Margitszigeti szökőkút",
    city: "Budapest",
    category: "Sport",
    price: 0,
    capacity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "kis-kertek-nagy-varos",
    title: "Kis kertek, nagy város",
    description:
      "Gyakorlati városi kertészkedés: balkonládák, fűszernövények és apró zöld oázisok. Együtt ültetünk, tanulunk, és mindenki hazavisz egy saját növényt.",
    date: nextWeekday(3, 16, 0, 2),
    location: "Közösségi Kert",
    city: "Budapest",
    category: "Közösség",
    price: 2500,
    capacity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85",
  },
];

async function main() {
  const organizer = await prisma.user.upsert({
    where: { email: "hello@kozosseg.hu" },
    update: {},
    create: { name: "Közösség szervezői", email: "hello@kozosseg.hu" },
  });

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: { ...event, organizerId: organizer.id },
    });
  }
}

main()
  .catch((error) => {
    console.error("Failed to seed the event database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
