// Lytter efter at DOM'en er fuldt indlæst, før funktionen 'hentData' køres
window.addEventListener("DOMContentLoaded", hentData);

// API-nøgle og URL til at hente produktdata
const apiURL =
  "https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW?limit=20";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA";

// Funktion til at hente produktdata fra API'et
function hentData() {
  const params = new URLSearchParams(document.location.search);
  const category = params.get("category");
  4;
  // Hvis en kategori er angivet i URL'en, opdateres API-anmodningens URL
  let productURI = apiURL;
  if (category) {
    productURI = `${apiURL}?category=eq.${category}`;
  }

  // Henter produktdata fra API'et
  fetch(productURI, {
    method: "GET",
    headers: {
      apikey: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json()) // Konverterer svaret til JSON-format
    .then((produkter) => visProdukter(produkter)) // Sender data til funktionen 'visProdukter'
    .catch((error) => console.error("Fejl ved hentning af data:", error)); // Håndtering af fejl
}

// Funktion til at vise de hentede produkter
function visProdukter(produkter) {
  const skabelon = document.querySelector("#pro").content; // Henter produktskabelonen
  const container = document.querySelector(".grid"); // Bruger grid-div'en til at vise produkterne

  // Gennemgår hvert produkt i de hentede data
  produkter.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true); // Kloner skabelonen for hvert produkt

    // Tjekker om 'ID', 'ProductName' og 'Img' findes
    const productId = produkt.ID || "defaultId"; // Bruger det faktiske felt eller falder tilbage til 'defaultId'
    const productName = produkt.ProductName || "Navnløst produkt";
    const productPrice = produkt.price || "N/A"; // Tjek CSV'en for det korrekte feltnavn
    const imageName = produkt.Img || "default-image.webp";
    const productCategory = produkt.Category || "Ukendt kategori";
    const productBrand = produkt.Brand || "Ukendt brand";

    // Sætter billedets kilde og alt-tekst ved hjælp af den lokale 'assets/img' mappe
    kopi.querySelector("img").src = `assets/img/${imageName}`;
    kopi.querySelector("img").alt = productName;

    // Sætter produktets ID
    kopi.querySelector("h3").textContent = productId;

    // Sætter produktkategori og brand
    kopi.querySelector(
      ".subtle"
    ).textContent = `${productCategory} | ${productBrand}`;

    // Sætter produktets pris
    kopi.querySelector(".info span").textContent = productPrice;

    // Hvis produktet er tilgængeligt, opdateres brugsvejledningen
    if (produkt.available) {
      kopi.querySelector(".Brugsvejledning .p1 span").textContent = "Ja";
    } else {
      kopi.querySelector(".Brugsvejledning .p1 span").textContent = "Nej";
    }

    // Hvis produktet har rabat, vises det
    if (produkt.discount) {
      kopi.querySelector(
        ".Brugsvejledning .p2 span"
      ).textContent = `${produkt.discount}%`;
    }

    // Sætter linket til produktets detaljer
    kopi.querySelector("a").href = `singleview.html?id=${productId}`;

    // Tilføjer produktet til containeren (grid'en)
    container.appendChild(kopi);
  });
}
