window.addEventListener("DOMContentLoaded", init);

// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get("id");

const id = "C00332";
console.log(id);

function init() {
  fetch(
    "https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW?ID=cs.%5B%22id%22%5D",
    {
      method: "GET",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => showProduct(data));
}

function showProduct(items) {
  console.log(items);
  // items.forEach(items);

  document.querySelector("h2").textContent = items.ProductName;
}
