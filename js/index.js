// Lytter efter at DOM'en er fuldt indlæst, før funktionen "hentData" køres
window.addEventListener("DOMContentLoaded", hentData);

//  Funktionen til at hente produktdata fra API'et,
function hentData() {
  const param = new URLSearchParams(document.location.search);
  const category = params.get("category");

  // API-nøgle og URL til at hente produktdata
  fetch("https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW", {
    method: "GET",
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA",
    },
  })
    .then((res) => res.json())
    .then(showData);

  function showData(items) {
    console.log(items);
    // items.forEach(items);
  }
}
