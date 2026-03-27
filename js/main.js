// Initialize Lucide Icons
lucide.createIcons();

// Sticky Header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navbar = document.getElementById('navbar');

mobileBtn.addEventListener('click', () => {
    // In a real app we would toggle a class and use CSS to show/hide
    if(navbar.style.display === 'flex') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
        navbar.style.flexDirection = 'column';
        navbar.style.position = 'absolute';
        navbar.style.top = '80px';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.background = '#fff';
        navbar.style.padding = '20px';
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    }
});

// Reset mobile menu on resize
window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        navbar.style.display = 'flex';
        navbar.style.flexDirection = 'row';
        navbar.style.position = 'static';
        navbar.style.width = 'auto';
        navbar.style.padding = '0';
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'transparent';
    } else {
        navbar.style.display = 'none';
    }
});

// Mock Data for Map Sidebar (Rosario, Argentina)
const locations = [
    { title: "Parque España", address: "Sarmiento y el Río", materials: ["Plástico", "Vidrio"] },
    { title: "Plaza San Martín", address: "Córdoba y Moreno", materials: ["Papel", "Cartón"] },
    { title: "Distrito Centro", address: "Wheelwright 1486", materials: ["Pilas", "Electrónicos"] },
    { title: "Parque Independencia", address: "Av. Pellegrini y Oroño", materials: ["Plástico", "Vidrio", "Metales"] },
    { title: "Terminal de Ómnibus", address: "Cafferata 702", materials: ["Cartón", "Plástico"] },
    { title: "Puerto Norte", address: "Av. Carballo 150", materials: ["Vidrio", "Papel"] },
    { title: "Paseo del Siglo", address: "Córdoba 1800", materials: ["Plástico", "Pilas"] },
    { title: "Mercado del Patio", address: "Córdoba 3500", materials: ["Orgánicos", "Papel"] }
];

const locationsList = document.getElementById('locations-list');

function renderLocations(filter) {
    if(!locationsList) return;
    locationsList.innerHTML = '';
    
    locations.forEach((loc, index) => {
        // Filter logic mock
        if(filter !== 'Todos' && !loc.materials.includes(filter)) return;

        const el = document.createElement('div');
        el.className = `location-item ${index === 0 ? 'active' : ''}`;
        
        let materialsHTML = loc.materials.map(m => `<span>${m}</span>`).join('');
        
        el.innerHTML = `
            <h4>${loc.title}</h4>
            <p><i data-lucide="map-pin" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ${loc.address}</p>
            <div class="badge-materials">
                ${materialsHTML}
            </div>
        `;
        locationsList.appendChild(el);
    });
    
    lucide.createIcons(); // Re-process icons in dynamic content
}

if(locationsList) {
    renderLocations('Todos');
}

// Filter Badges Mock
const filterBadges = document.querySelectorAll('.filter-badge');
filterBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
        filterBadges.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderLocations(e.target.innerText);
    });
});

// Tabs Logic for IA Lab
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to current
        btn.classList.add('active');
        const targetId = `tab-${btn.getAttribute('data-tab')}`;
        document.getElementById(targetId).classList.add('active');
    });
});
