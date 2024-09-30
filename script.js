// script.js

// Function to fetch anime data from the Jikan API
async function fetchAnime(query = "") {
  try {
    // If there's a query, search for anime based on that query
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Check if any anime was found
    if (data.data.length === 0) {
      document.getElementById("anime-list").innerHTML =
        "<p>No results found.</p>";
    } else {
      displayAnime(data.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("anime-list").innerHTML =
      "<p>Error fetching data.</p>";
  }
}

// Function to display anime cards
function displayAnime(animeArray) {
  const animeList = document.getElementById("anime-list");
  animeList.innerHTML = ""; // Clear previous content

  animeArray.forEach((anime) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-800 p-5 rounded-lg shadow-lg card relative overflow-hidden";
    card.innerHTML = `
            <img src="${anime.images.jpg.large_image_url}" alt="${
      anime.title
    }" class="w-full h-56 object-cover rounded-lg mb-4" />
            <h2 class="font-bold text-xl mt-2">${anime.title}</h2>
            <p class="mt-2 text-sm">${
              anime.synopsis
                ? anime.synopsis.substring(0, 100) + "..."
                : "No description available."
            }</p>
            <p class="text-gray-400">Score: ${anime.score}</p>
            <p class="text-gray-400">Popularity Rank: #${anime.popularity}</p>
            <a href="${
              anime.url
            }" target="_blank" class="absolute bottom-4 left-4 text-blue-400 hover:underline">Read More</a>
        `;
    animeList.appendChild(card);
  });
}

// Event listener for the search bar
document.getElementById("search").addEventListener("input", (event) => {
  const query = event.target.value;
  fetchAnime(query);
});

// Fetch initial anime data on page load
fetchAnime();
