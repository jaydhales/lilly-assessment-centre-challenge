// Medicine Tracker - frontend script.
//
// The backend API runs at BASE_URL (default http://localhost:8000).
//
// TASKS
// -----
// Core task 1: implement fetchMedicines() and renderMedicines(data) so the page
//   fetches /medicines and displays it WITHOUT crashing on missing or invalid
//   data. The data contains records with a null name, an empty-string name, a
//   missing name, a null price, a missing price, and a non-numeric price. Decide
//   how to display each case (e.g. show "Unknown" or flag it) without throwing.
//
// Core task 2: implement fetchUnreliable() so it calls /medicines/unreliable,
//   shows a useful message in the #error area when it fails, and retries
//   sensibly. Do NOT hammer the server: use a small number of retries with a
//   short delay between them, and give up cleanly after a few tries. The
//   endpoint fails about 30% of the time.
//
// Stretch: add an average-price endpoint in backend/main.py and call it here.

const BASE_URL = "http://localhost:8000";

// DOM elements (already present in index.html - no layout work needed).
const resultsEl = document.getElementById("results");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

/**
 * TODO (Core task 1): fetch the list of medicines from /medicines.
 * Return the medicines array. Surface network/HTTP errors so the caller can show them.
 */
async function fetchMedicines() {
    try {
      const response = await fetch(`${BASE_URL}/medicines`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch {
      console.error(error.message);
    }
    // TODO: fetch(`${BASE_URL}/medicines`), check response.ok, return the data.
}

/**
 * TODO (Core task 1): render the medicines into #results without crashing on
 * missing or invalid fields. Handle: null name, empty-string name, missing name,
 * null price, missing price, non-numeric price. Show something sensible for each.
 * TODO: clear the #error area on success.
 */
function renderMedicines(data) {
    // TODO: build a table (the .results styles expect a <table>), iterate the
    // records, and render each row safely. Use the .invalid class to flag bad
    // values if you like.
    const rowdata = data.medicines.map(({ name, price }) => {
      console.log({
        name,
        price,
      });
      const parseName = (name) => {
        switch (name) {
          case "":
            return "No name";
            break;
          case null:
            return "Null Name";
            break;
          case undefined:
            return "Undefined Name";
            break;

          default:
            return name;
            break;
        }
      };
      const validateData = (entry) => (!!entry ? "" : "invalid");

      return `<tr>
        <td class="${validateData(name)}">${parseName(name)}</td>
        <td class="${validateData(price)}">${!!price ? price : 0}</td>
      </tr>`;
    });

    const table = document.createElement("table");
    table.innerHTML = rowdata.join("\n");

    document.getElementById("results").appendChild(table);
}

/**
 * TODO (Core task 2): fetch from /medicines/unreliable with sensible retries.
 * Retry a few times with a short delay between attempts (do not hammer the
 * server). When you give up, show a useful message in #error. On success,
 * render the data and clear #error. Show/hide the #loading area while working.
 */
async function fetchUnreliable() {
    // TODO: implement the retry loop here.
}

// ---- Button wiring (already works - no need to change) ----
document.getElementById("load-medicines").addEventListener("click", async () => {
    try {
      const data = await fetchMedicines();
      if (!data) {
        throw new Error("Data not found");
      }
      renderMedicines(data);
    } catch (error) {
      console.error(error);
    }
    
    
    
    // TODO: call fetchMedicines() then renderMedicines(data),
    // showing #loading and clearing #error appropriately.
});

document.getElementById("load-unreliable").addEventListener("click", async () => {
    // TODO: call fetchUnreliable().
});
