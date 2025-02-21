// Sample apps data
const apps = [
    {
        id: 1,
        name: "NSC",
        developer: "Developer: Nexsuhs",
        category: "Social",
        rating: 4.5,
        downloads: "1M+",
        image: "ho.jpeg",
        description: "This is a sample app description.",
        apkUrl: "NSC.apk"
    },
    {
        id: 2,
        name: "TEN",
        developer: "Developer: Nexsuhs",
        category: "Entertainment",
        rating: 4.7,
        downloads: "1M+",
        image: "gogo.jpg",
        description: "Experience the amazing TEN app.",
        apkUrl: "TEN.apk"
    }
];

// Add games data
const games = [
    {
        id: 1,
        name: "Adventure Quest",
        developer: "Developer: GameStudio",
        category: "Adventure",
        rating: 4.8,
        downloads: "500K+",
        image: "game1.jpg",
        description: "An epic adventure game with stunning graphics.",
        apkUrl: "adventure.apk"
    },
    {
        id: 2,
        name: "Speed Racing",
        developer: "Developer: RacingGames",
        category: "Racing",
        rating: 4.6,
        downloads: "1M+",
        image: "game2.jpg",
        description: "High-speed racing with multiple tracks and cars.",
        apkUrl: "racing.apk"
    }
];

// Initialize the app store
function initializeStore() {
    const isGamesPage = window.location.pathname.includes('games.html');
    const container = isGamesPage ? 'gamesContainer' : 'appsContainer';
    const items = isGamesPage ? games : apps;
    
    displayItems(items, container);
    setupSearchFunctionality(isGamesPage);
    initializeTheme();
}

// Display items in the grid
function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
}

// Create card element
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.developer}</p>
        <div class="rating">
            ${item.rating} ⭐ | ${item.downloads} downloads
        </div>
    `;

    card.addEventListener('click', () => showAppDetails(item));
    return card;
}

// Show app details in modal
function showAppDetails(item) {
    const modal = document.getElementById('appModal');
    const modalContent = modal.querySelector('.app-details');
    
    modalContent.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <p>${item.description}</p>
        <div class="app-stats">
            <span>Rating: ${item.rating}</span>
            <span>Downloads: ${item.downloads}</span>
            <span>Category: ${item.category}</span>
        </div>
        <button onclick="downloadApp('${item.apkUrl}', '${item.name}')" class="download-btn">
            Download APK
        </button>
    `;

    modal.style.display = 'block';
}

// Download functionality
function downloadApp(apkUrl, appName) {
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = appName === 'NSC' ? 'NSC.apk' : 'TEN.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Search functionality
function setupSearchFunctionality(isGamesPage) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = isGamesPage ? games : apps;
        const filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.developer.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems, isGamesPage ? 'gamesContainer' : 'appsContainer');
    });
}

// Theme handling
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check system preference
function getSystemThemePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme based on system preference
function initializeTheme() {
    const systemTheme = getSystemThemePreference();
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    } else {
        html.removeAttribute('data-theme'); // Use system preference
        themeToggle.checked = systemTheme === 'dark';
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        html.removeAttribute('data-theme');
        themeToggle.checked = e.matches;
    }
});

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Initialize theme on page load
initializeTheme();

// Close modal functionality
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('appModal').style.display = 'none';
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStore);
