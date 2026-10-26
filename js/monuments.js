// Architectural Landmark SVG Artwork Library for Indian Business Tycoon
// Crafted with high-fidelity vector graphics matching authentic board game illustrations

const MONUMENT_SVGS = {
    // 1. Mumbai - Gateway of India
    mumbai: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gw-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f3d19c"/>
                    <stop offset="50%" stop-color="#d4a366"/>
                    <stop offset="100%" stop-color="#9a6e38"/>
                </linearGradient>
                <linearGradient id="gw-arch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4a3016"/>
                    <stop offset="100%" stop-color="#1e1208"/>
                </linearGradient>
            </defs>
            <!-- Water reflection at base -->
            <rect x="0" y="58" width="100" height="7" fill="#6ba4c8" opacity="0.6"/>
            <path d="M 5,60 Q 25,58 50,60 T 95,60" stroke="#bfe3f7" stroke-width="1" fill="none" opacity="0.8"/>
            <!-- Gateway Steps Base -->
            <rect x="10" y="54" width="80" height="4" fill="#8c6239" rx="1"/>
            <rect x="12" y="51" width="76" height="3" fill="#a97d4c" rx="1"/>
            <!-- Main Central Gate Block -->
            <rect x="28" y="18" width="44" height="33" fill="url(#gw-stone)"/>
            <!-- Left Wing -->
            <rect x="15" y="24" width="13" height="27" fill="url(#gw-stone)"/>
            <!-- Right Wing -->
            <rect x="72" y="24" width="13" height="27" fill="url(#gw-stone)"/>
            <!-- Corner Turrets Left -->
            <rect x="13" y="14" width="6" height="37" fill="#b9884e"/>
            <path d="M 12,14 Q 16,7 20,14 Z" fill="#7a4f21"/>
            <!-- Corner Turrets Right -->
            <rect x="81" y="14" width="6" height="37" fill="#b9884e"/>
            <path d="M 80,14 Q 84,7 88,14 Z" fill="#7a4f21"/>
            <!-- Inner Turrets -->
            <rect x="27" y="11" width="5" height="40" fill="#a8753d"/>
            <path d="M 26,11 Q 29.5,5 33,11 Z" fill="#6d4217"/>
            <rect x="68" y="11" width="5" height="40" fill="#a8753d"/>
            <path d="M 67,11 Q 70.5,5 74,11 Z" fill="#6d4217"/>
            <!-- Central Arch Piercing -->
            <path d="M 36,51 L 36,32 Q 50,21 64,32 L 64,51 Z" fill="url(#gw-arch)"/>
            <!-- Small Wing Arches -->
            <path d="M 18,51 L 18,36 Q 21.5,31 25,36 L 25,51 Z" fill="url(#gw-arch)"/>
            <path d="M 75,51 L 75,36 Q 78.5,31 82,36 L 82,51 Z" fill="url(#gw-arch)"/>
            <!-- Top Parapet and Cornice -->
            <rect x="25" y="15" width="50" height="3" fill="#ffe0b2"/>
            <path d="M 32,15 L 34,12 L 38,12 L 40,15 L 44,12 L 48,12 L 50,15 L 52,12 L 56,12 L 58,15 L 62,12 L 66,12 L 68,15 Z" fill="#b9884e"/>
            <!-- Central Upper Dome Finial -->
            <path d="M 45,15 Q 50,9 55,15 Z" fill="#8c6239"/>
            <circle cx="50" cy="8" r="1.5" fill="#fbc02d"/>
        </svg>
    `,

    // 2. Delhi - India Gate
    delhi: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ig-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f8a576"/>
                    <stop offset="50%" stop-color="#df784b"/>
                    <stop offset="100%" stop-color="#a4421e"/>
                </linearGradient>
                <linearGradient id="ig-arch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3c180a"/>
                    <stop offset="100%" stop-color="#140602"/>
                </linearGradient>
            </defs>
            <!-- Green Lawns -->
            <rect x="0" y="57" width="100" height="8" fill="#48a04c"/>
            <!-- Base Plinth -->
            <rect x="18" y="52" width="64" height="5" fill="#8d341b" rx="1"/>
            <rect x="22" y="49" width="56" height="3" fill="#b84f2c"/>
            <!-- Main Vertical Pillars -->
            <rect x="25" y="16" width="50" height="33" fill="url(#ig-stone)"/>
            <!-- Outer Pylons Stepping -->
            <rect x="23" y="20" width="7" height="29" fill="#c96035"/>
            <rect x="70" y="20" width="7" height="29" fill="#c96035"/>
            <!-- Central Arch Opening -->
            <path d="M 37,49 L 37,28 Q 50,17 63,28 L 63,49 Z" fill="url(#ig-arch)"/>
            <!-- Inner Arch Highlight Rim -->
            <path d="M 37,28 Q 50,17 63,28" stroke="#ffcc80" stroke-width="1.2" fill="none"/>
            <!-- Entablature / Attic Base -->
            <rect x="20" y="13" width="60" height="4" fill="#e88358"/>
            <rect x="24" y="8" width="52" height="5" fill="#d26537"/>
            <rect x="28" y="4" width="44" height="4" fill="#b34b22"/>
            <!-- Top Urn / Flame bowl -->
            <ellipse cx="50" cy="3.5" rx="6" ry="1.5" fill="#fbc02d"/>
            <!-- India inscription band -->
            <rect x="34" y="9.5" width="32" height="2" fill="#5c1d0b" rx="0.5"/>
        </svg>
    `,

    // 3. Bengaluru - Silicon Tech Tower
    bengaluru: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg-glass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#93c5fd"/>
                    <stop offset="40%" stop-color="#3b82f6"/>
                    <stop offset="100%" stop-color="#1d4ed8"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#334155"/>
            <!-- Back Tower -->
            <rect x="20" y="16" width="22" height="42" fill="#2563eb" opacity="0.6"/>
            <!-- Central Angled Skyscraper -->
            <path d="M 42,6 L 68,14 L 68,58 L 42,58 Z" fill="url(#bg-glass)"/>
            <!-- Glass Windows Lattice Grid -->
            <line x1="42" y1="18" x2="68" y2="24" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
            <line x1="42" y1="28" x2="68" y2="34" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
            <line x1="42" y1="38" x2="68" y2="44" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
            <line x1="42" y1="48" x2="68" y2="54" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
            <line x1="55" y1="10" x2="55" y2="58" stroke="#ffffff" stroke-width="0.8" opacity="0.5"/>
            <!-- Antenna Needle -->
            <line x1="45" y1="6" x2="45" y2="0" stroke="#fbc02d" stroke-width="1.5"/>
            <circle cx="45" cy="0" r="1.5" fill="#ef4444"/>
            <!-- Right Subsidiary Wing -->
            <rect x="68" y="26" width="16" height="32" fill="#1e40af"/>
            <line x1="68" y1="36" x2="84" y2="36" stroke="#93c5fd" stroke-width="0.8"/>
            <line x1="68" y1="46" x2="84" y2="46" stroke="#93c5fd" stroke-width="0.8"/>
        </svg>
    `,

    // 4. Hyderabad - Charminar
    hyderabad: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cm-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fae8c8"/>
                    <stop offset="60%" stop-color="#dfc298"/>
                    <stop offset="100%" stop-color="#a78657"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#64748b"/>
            <!-- Plinth Base -->
            <rect x="22" y="53" width="56" height="5" fill="#8c6d43"/>
            <!-- Main Square Monument Body -->
            <rect x="28" y="24" width="44" height="29" fill="url(#cm-stone)"/>
            <!-- 4 Grand Arches Silhouette -->
            <path d="M 37,53 L 37,36 Q 50,26 63,36 L 63,53 Z" fill="#2d1d0c"/>
            <path d="M 37,36 Q 50,26 63,36" stroke="#ffeb3b" stroke-width="1" fill="none"/>
            <!-- Left Tower Minaret -->
            <rect x="18" y="8" width="8" height="45" fill="#d7b686"/>
            <circle cx="22" cy="7" r="4.5" fill="#fef08a"/>
            <line x1="22" y1="2.5" x2="22" y2="0" stroke="#fbc02d" stroke-width="1.5"/>
            <!-- Right Tower Minaret -->
            <rect x="74" y="8" width="8" height="45" fill="#d7b686"/>
            <circle cx="78" cy="7" r="4.5" fill="#fef08a"/>
            <line x1="78" y1="2.5" x2="78" y2="0" stroke="#fbc02d" stroke-width="1.5"/>
            <!-- Upper Balcony Tier -->
            <rect x="25" y="19" width="50" height="5" fill="#b99360"/>
            <circle cx="36" cy="17" r="2.5" fill="#fef08a"/>
            <circle cx="50" cy="17" r="3" fill="#fef08a"/>
            <circle cx="64" cy="17" r="2.5" fill="#fef08a"/>
        </svg>
    `,

    // 5. Chennai - Dravidian Temple Gopuram
    chennai: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gp-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffd54f"/>
                    <stop offset="40%" stop-color="#ff9800"/>
                    <stop offset="100%" stop-color="#e65100"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#475569"/>
            <!-- Base Mandapa -->
            <rect x="24" y="48" width="52" height="10" fill="#bf360c"/>
            <path d="M 42,58 L 42,50 Q 50,46 58,50 L 58,58 Z" fill="#211003"/>
            <!-- Tier 1 -->
            <polygon points="28,48 72,48 68,39 32,39" fill="url(#gp-stone)"/>
            <!-- Tier 2 -->
            <polygon points="32,39 68,39 65,30 35,30" fill="url(#gp-stone)"/>
            <!-- Tier 3 -->
            <polygon points="35,30 65,30 62,21 38,21" fill="url(#gp-stone)"/>
            <!-- Tier 4 -->
            <polygon points="38,21 62,21 59,13 41,13" fill="url(#gp-stone)"/>
            <!-- Barrel Vaulted Crown (Shala) -->
            <path d="M 40,13 Q 50,7 60,13 Z" fill="#ffd54f"/>
            <!-- Golden Kalasams Finials -->
            <circle cx="43" cy="7" r="1.5" fill="#ffd700"/>
            <circle cx="47" cy="6" r="1.5" fill="#ffd700"/>
            <circle cx="50" cy="5.5" r="1.8" fill="#ffd700"/>
            <circle cx="53" cy="6" r="1.5" fill="#ffd700"/>
            <circle cx="57" cy="7" r="1.5" fill="#ffd700"/>
        </svg>
    `,

    // 6. Kolkata - Victoria Memorial & Howrah Bridge
    kolkata: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="vm-marble" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="60%" stop-color="#e2e8f0"/>
                    <stop offset="100%" stop-color="#94a3b8"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#38bdf8" opacity="0.6"/>
            <!-- Base Plinth -->
            <rect x="15" y="52" width="70" height="6" fill="#cbd5e1" rx="1"/>
            <!-- Main Hall Wings -->
            <rect x="22" y="32" width="56" height="20" fill="url(#vm-marble)"/>
            <!-- Left Wing Pediment -->
            <polygon points="16,35 30,35 23,28" fill="#e2e8f0"/>
            <rect x="16" y="35" width="14" height="17" fill="#cbd5e1"/>
            <!-- Right Wing Pediment -->
            <polygon points="70,35 84,35 77,28" fill="#e2e8f0"/>
            <rect x="70" y="35" width="14" height="17" fill="#cbd5e1"/>
            <!-- Central Portico Columns -->
            <rect x="42" y="36" width="16" height="16" fill="#f8fafc"/>
            <path d="M 45,52 L 45,41 Q 50,38 55,41 L 55,52 Z" fill="#334155"/>
            <!-- Center Grand Drum & Dome -->
            <rect x="40" y="24" width="20" height="8" fill="#e2e8f0"/>
            <path d="M 38,24 Q 50,6 62,24 Z" fill="url(#vm-marble)"/>
            <line x1="50" y1="6" x2="50" y2="1" stroke="#fbc02d" stroke-width="1.2"/>
            <circle cx="50" cy="1" r="1.5" fill="#fbc02d"/>
        </svg>
    `,

    // 7. Pune - Shaniwar Wada Fort Gate
    pune: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#78716c"/>
                    <stop offset="60%" stop-color="#57534e"/>
                    <stop offset="100%" stop-color="#292524"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#44403c"/>
            <!-- Left Bastion (Semi-circular Tower) -->
            <path d="M 16,58 L 16,20 Q 26,14 36,20 L 36,58 Z" fill="url(#sw-stone)"/>
            <!-- Right Bastion (Semi-circular Tower) -->
            <path d="M 64,58 L 64,20 Q 74,14 84,20 L 84,58 Z" fill="url(#sw-stone)"/>
            <!-- Connecting Central Wall -->
            <rect x="36" y="22" width="28" height="36" fill="#44403c"/>
            <!-- Dilli Darwaza Grand Gate Opening -->
            <path d="M 42,58 L 42,35 Q 50,27 58,35 L 58,58 Z" fill="#1c1917"/>
            <!-- Wooden Spiked Doors -->
            <rect x="43" y="37" width="6.5" height="21" fill="#78350f"/>
            <rect x="50.5" y="37" width="6.5" height="21" fill="#78350f"/>
            <!-- Defensive Battlements (Kanguras) -->
            <path d="M 16,20 L 19,16 L 22,20 L 25,16 L 28,20 L 31,16 L 34,20" stroke="#a8a29e" stroke-width="2" fill="none"/>
            <path d="M 66,20 L 69,16 L 72,20 L 75,16 L 78,20 L 81,16 L 84,20" stroke="#a8a29e" stroke-width="2" fill="none"/>
            <!-- Maratha Saffron Flag -->
            <line x1="50" y1="22" x2="50" y2="9" stroke="#d6d3d1" stroke-width="1.5"/>
            <polygon points="50,9 62,13 50,17" fill="#f97316"/>
        </svg>
    `,

    // 8. Ahmedabad - Sabarmati & Sidi Saiyyed Arch
    ahmedabad: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ss-stone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fed7aa"/>
                    <stop offset="50%" stop-color="#f97316"/>
                    <stop offset="100%" stop-color="#9a3412"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#0284c7" opacity="0.7"/>
            <!-- Arch Wall -->
            <rect x="18" y="16" width="64" height="42" fill="url(#ss-stone)" rx="2"/>
            <!-- Semi-circular Jali Screen -->
            <path d="M 28,58 L 28,34 Q 50,14 72,34 L 72,58 Z" fill="#292524"/>
            <!-- Tree of Life Jali Branches -->
            <path d="M 50,58 Q 50,42 46,36 Q 40,30 34,34 M 50,42 Q 54,34 66,32 M 50,36 Q 50,22 56,18 M 50,30 Q 42,24 38,20" stroke="#fbc02d" stroke-width="1.5" fill="none"/>
            <!-- Decorative Arch Outline -->
            <path d="M 28,34 Q 50,14 72,34" stroke="#ffedd5" stroke-width="2" fill="none"/>
        </svg>
    `,

    // 9. Jaipur - Hawa Mahal Palace
    jaipur: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hm-pink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fda4af"/>
                    <stop offset="50%" stop-color="#f43f5e"/>
                    <stop offset="100%" stop-color="#9f1239"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#475569"/>
            <!-- Base Tier -->
            <rect x="15" y="47" width="70" height="11" fill="url(#hm-pink)"/>
            <!-- Honeycomb Tiers Stepping Inwards -->
            <rect x="22" y="37" width="56" height="10" fill="url(#hm-pink)"/>
            <rect x="29" y="27" width="42" height="10" fill="url(#hm-pink)"/>
            <rect x="36" y="17" width="28" height="10" fill="url(#hm-pink)"/>
            <polygon points="43,17 57,17 50,8" fill="url(#hm-pink)"/>
            <circle cx="50" cy="6" r="1.5" fill="#fbc02d"/>
            <!-- Ornate Jharokha Windows -->
            <circle cx="30" cy="42" r="2.5" fill="#fff1f2"/>
            <circle cx="40" cy="42" r="2.5" fill="#fff1f2"/>
            <circle cx="50" cy="42" r="2.5" fill="#fff1f2"/>
            <circle cx="60" cy="42" r="2.5" fill="#fff1f2"/>
            <circle cx="70" cy="42" r="2.5" fill="#fff1f2"/>
            <circle cx="36" cy="32" r="2.5" fill="#fff1f2"/>
            <circle cx="50" cy="32" r="2.5" fill="#fff1f2"/>
            <circle cx="64" cy="32" r="2.5" fill="#fff1f2"/>
            <circle cx="43" cy="22" r="2.5" fill="#fff1f2"/>
            <circle cx="57" cy="22" r="2.5" fill="#fff1f2"/>
            <circle cx="50" cy="13" r="2" fill="#fff1f2"/>
        </svg>
    `,

    // 10. Lucknow - Rumi Darwaza
    lucknow: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rd-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="50%" stop-color="#ca8a04"/>
                    <stop offset="100%" stop-color="#713f12"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#525252"/>
            <!-- Monument Base & Arches -->
            <path d="M 12,58 L 12,30 Q 50,2 88,30 L 88,58 Z" fill="url(#rd-gold)"/>
            <!-- Central Grand Arched Gateway -->
            <path d="M 34,58 L 34,34 Q 50,18 66,34 L 66,58 Z" fill="#1c1917"/>
            <!-- Mughal Petal Arch Ribs -->
            <path d="M 34,34 Q 50,18 66,34" stroke="#fef9c3" stroke-width="2" fill="none"/>
            <path d="M 24,58 L 24,38 Q 30,30 36,38 L 36,58 Z" fill="#292524"/>
            <path d="M 64,58 L 64,38 Q 70,30 76,38 L 76,58 Z" fill="#292524"/>
            <!-- Top Chatri Finial -->
            <circle cx="50" cy="5" r="2" fill="#fef08a"/>
        </svg>
    `,

    // 11. Chandigarh - Rock Garden Sculpture
    chandigarh: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="56" width="100" height="9" fill="#166534"/>
            <!-- Curved Stone Wall -->
            <path d="M 10,56 Q 30,35 60,40 Q 80,45 90,30 L 90,56 Z" fill="#78716c"/>
            <!-- Stylized Ceramic Statues -->
            <circle cx="32" cy="24" r="5" fill="#f97316"/>
            <rect x="29" y="29" width="6" height="15" fill="#0284c7" rx="2"/>
            <circle cx="48" cy="20" r="6" fill="#eab308"/>
            <rect x="44" y="26" width="8" height="18" fill="#16a34a" rx="2"/>
            <circle cx="66" cy="24" r="5" fill="#ec4899"/>
            <rect x="63" y="29" width="6" height="15" fill="#8b5cf6" rx="2"/>
        </svg>
    `,

    // 12. Indore - Rajwada Palace
    indore: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="58" width="100" height="7" fill="#44403c"/>
            <!-- Stone Ground Storeys -->
            <rect x="25" y="44" width="50" height="14" fill="#57534e"/>
            <path d="M 44,58 L 44,48 Q 50,44 56,48 L 56,58 Z" fill="#1c1917"/>
            <!-- 5 Wooden Upper Storeys -->
            <rect x="28" y="36" width="44" height="8" fill="#78350f"/>
            <rect x="30" y="28" width="40" height="8" fill="#92400e"/>
            <rect x="33" y="20" width="34" height="8" fill="#78350f"/>
            <rect x="36" y="12" width="28" height="8" fill="#b45309"/>
            <!-- Top Curved Bengali Eaves Roof -->
            <path d="M 34,12 Q 50,4 66,12 Z" fill="#f59e0b"/>
            <!-- Wooden Carved Windows -->
            <circle cx="38" cy="24" r="1.5" fill="#fef3c7"/>
            <circle cx="50" cy="24" r="1.5" fill="#fef3c7"/>
            <circle cx="62" cy="24" r="1.5" fill="#fef3c7"/>
        </svg>
    `,

    // 13. Nagpur - Deekshabhoomi Stupa
    nagpur: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="57" width="100" height="8" fill="#15803d"/>
            <!-- Circular Plinth -->
            <ellipse cx="50" cy="55" rx="42" ry="5" fill="#cbd5e1"/>
            <ellipse cx="50" cy="52" rx="36" ry="4" fill="#f1f5f9"/>
            <!-- Massive Hemispherical Stupa Dome -->
            <path d="M 20,52 Q 20,12 50,12 Q 80,12 80,52 Z" fill="url(#vm-marble)"/>
            <!-- Arched Portals -->
            <path d="M 44,52 L 44,40 Q 50,36 56,40 L 56,52 Z" fill="#b45309"/>
            <!-- Top Square Harmika & Chhatra (Umbrella) -->
            <rect x="46" y="9" width="8" height="3" fill="#f59e0b"/>
            <line x1="50" y1="9" x2="50" y2="2" stroke="#d97706" stroke-width="1.5"/>
            <ellipse cx="50" cy="3" rx="5" ry="1.2" fill="#f59e0b"/>
        </svg>
    `,

    // 14. Surat - Diamond Trade Hub
    surat: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="dm-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#e0f2fe"/>
                    <stop offset="50%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                </linearGradient>
            </defs>
            <rect x="0" y="58" width="100" height="7" fill="#1e293b"/>
            <!-- Giant Diamond Gem -->
            <polygon points="50,6 78,22 68,54 32,54 22,22" fill="url(#dm-grad)" stroke="#bae6fd" stroke-width="1.2"/>
            <!-- Facet Lines -->
            <polygon points="50,6 62,22 38,22" fill="#bae6fd" opacity="0.6"/>
            <polygon points="38,22 62,22 50,54" fill="#0369a1" opacity="0.4"/>
            <line x1="22" y1="22" x2="32" y2="54" stroke="#ffffff" stroke-width="1"/>
            <line x1="78" y1="22" x2="68" y2="54" stroke="#ffffff" stroke-width="1"/>
            <!-- Sparkles -->
            <circle cx="28" cy="14" r="1.5" fill="#ffffff"/>
            <circle cx="72" cy="12" r="2" fill="#ffffff"/>
        </svg>
    `,

    // 15. Jamshedpur - Steel City Mill
    jamshedpur: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="58" width="100" height="7" fill="#1c1917"/>
            <!-- Factory Shed -->
            <polygon points="12,58 12,38 32,26 52,38 52,58" fill="#44403c"/>
            <polygon points="52,58 52,38 72,26 92,38 92,58" fill="#57534e"/>
            <!-- Industrial Blast Furnace & Chimneys -->
            <rect x="36" y="10" width="8" height="48" fill="#78716c"/>
            <rect x="68" y="6" width="6" height="52" fill="#a8a29e"/>
            <!-- Orange Molten Steel Glow -->
            <circle cx="50" cy="52" r="6" fill="#f97316"/>
            <circle cx="50" cy="52" r="3" fill="#fef08a"/>
        </svg>
    `,

    // 16. Bhubaneswar - Lingaraj Temple
    bhubaneswar: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="58" width="100" height="7" fill="#57534e"/>
            <!-- Main Curvilinear Shikhara Tower -->
            <path d="M 28,58 Q 30,20 48,10 Q 66,20 68,58 Z" fill="#b45309"/>
            <!-- Ribbed Amalaka Crown -->
            <ellipse cx="48" cy="9" rx="8" ry="2.5" fill="#f59e0b"/>
            <circle cx="48" cy="5" r="2" fill="#ffd700"/>
            <!-- Front Jagamohana Pyramid Porch -->
            <polygon points="62,58 88,58 75,34" fill="#d97706"/>
            <!-- Temple Doorway -->
            <rect x="71" y="46" width="8" height="12" fill="#1c1917"/>
        </svg>
    `,

    // 17. Kochi - Houseboat & Coconut Palms
    kochi: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Blue Tropical Water -->
            <rect x="0" y="44" width="100" height="21" fill="#0284c7"/>
            <path d="M 0,48 Q 25,44 50,48 T 100,48 L 100,65 L 0,65 Z" fill="#0369a1"/>
            <!-- Coconut Palm Left -->
            <path d="M 16,52 Q 18,30 24,14" stroke="#78350f" stroke-width="3" fill="none"/>
            <path d="M 24,14 Q 10,12 8,20 M 24,14 Q 20,4 12,6 M 24,14 Q 30,4 38,8 M 24,14 Q 36,18 36,26" stroke="#15803d" stroke-width="2.5" fill="none"/>
            <!-- Kerala Houseboat (Kettuvallam) -->
            <path d="M 38,50 Q 64,54 88,48 L 82,42 Q 62,38 42,42 Z" fill="#92400e"/>
            <!-- Woven Thatched Canopy -->
            <path d="M 44,42 Q 60,30 76,42 Z" fill="#fef08a"/>
            <circle cx="60" cy="40" r="2" fill="#1c1917"/>
        </svg>
    `,

    // 18. Srinagar - Dal Lake Shikara
    srinagar: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Mountain Range -->
            <polygon points="0,38 25,18 45,34 70,12 100,38 100,65 0,65" fill="#64748b"/>
            <polygon points="25,18 35,26 15,26" fill="#f8fafc"/>
            <polygon points="70,12 82,22 58,22" fill="#f8fafc"/>
            <!-- Dal Lake -->
            <rect x="0" y="38" width="100" height="27" fill="#0284c7"/>
            <!-- Kashmiri Shikara Boat -->
            <path d="M 18,52 Q 50,56 86,48 L 80,44 Q 50,44 24,47 Z" fill="#78350f"/>
            <!-- Shikara Floral Canopy -->
            <path d="M 40,44 L 40,36 L 68,36 L 68,44 Z" fill="#e11d48"/>
            <polygon points="38,36 70,36 54,30" fill="#f43f5e"/>
        </svg>
    `,

    // 19. Guwahati - Kamakhya Temple
    guwahati: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="58" width="100" height="7" fill="#15803d"/>
            <!-- Beehive Shaped Shikhara Dome -->
            <path d="M 28,58 Q 30,22 50,14 Q 70,22 72,58 Z" fill="#dc2626"/>
            <!-- Golden Kalash -->
            <circle cx="50" cy="11" r="3" fill="#fbc02d"/>
            <line x1="50" y1="8" x2="50" y2="4" stroke="#fbc02d" stroke-width="1.5"/>
            <!-- Base Mandapa Doorway -->
            <rect x="44" y="46" width="12" height="12" fill="#450a0a"/>
        </svg>
    `,

    // 20. Shillong - Elephant Falls
    shillong: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Forest Cliffs -->
            <rect x="0" y="0" width="100" height="65" fill="#14532d"/>
            <path d="M 0,0 L 35,0 L 30,65 L 0,65 Z" fill="#3f3f46"/>
            <path d="M 65,0 L 100,0 L 100,65 L 70,65 Z" fill="#3f3f46"/>
            <!-- Tiered Cascading Waterfall -->
            <path d="M 36,0 L 64,0 L 60,25 L 38,25 Z" fill="#e0f2fe"/>
            <path d="M 38,25 L 62,25 L 68,65 L 30,65 Z" fill="#bae6fd"/>
            <!-- Foaming Water Rapids -->
            <line x1="42" y1="5" x2="42" y2="60" stroke="#ffffff" stroke-width="2" stroke-dasharray="6,4"/>
            <line x1="52" y1="2" x2="52" y2="62" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="8,5"/>
        </svg>
    `,

    // 21. Bus Transport
    bus: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="56" width="100" height="9" fill="#64748b"/>
            <!-- Modern City Bus Body -->
            <rect x="15" y="18" width="70" height="34" rx="6" fill="#2563eb"/>
            <!-- White Top Stripe -->
            <rect x="15" y="18" width="70" height="7" rx="4" fill="#f8fafc"/>
            <!-- Bus Windows -->
            <rect x="19" y="27" width="12" height="13" fill="#60a5fa" rx="1"/>
            <rect x="34" y="27" width="14" height="13" fill="#60a5fa" rx="1"/>
            <rect x="51" y="27" width="14" height="13" fill="#60a5fa" rx="1"/>
            <rect x="68" y="27" width="13" height="18" fill="#93c5fd" rx="1"/>
            <!-- Wheels -->
            <circle cx="32" cy="52" r="7" fill="#0f172a"/>
            <circle cx="32" cy="52" r="3" fill="#94a3b8"/>
            <circle cx="68" cy="52" r="7" fill="#0f172a"/>
            <circle cx="68" cy="52" r="3" fill="#94a3b8"/>
        </svg>
    `,

    // 22. Airlines (Jet Airplane)
    airlines: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Sky Background with Speed Clouds -->
            <rect x="0" y="0" width="100" height="65" fill="#38bdf8" opacity="0.3"/>
            <!-- Soaring Passenger Jetliner -->
            <g transform="translate(15, 12) rotate(-15)">
                <ellipse cx="38" cy="22" rx="34" ry="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
                <!-- Windows Row -->
                <line x1="16" y1="21" x2="52" y2="21" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2"/>
                <!-- Swept Back Wings -->
                <polygon points="34,22 22,46 32,46 48,22" fill="#0284c7"/>
                <!-- Tail Fin -->
                <polygon points="62,18 72,4 78,4 70,18" fill="#f97316"/>
                <!-- Jet Engine -->
                <rect x="32" y="32" width="10" height="4" rx="2" fill="#64748b"/>
            </g>
        </svg>
    `,

    // 23. Taxi Service
    taxi: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="56" width="100" height="9" fill="#475569"/>
            <!-- Classic Yellow Cab Body -->
            <path d="M 18,52 L 20,40 L 32,30 L 68,30 L 78,40 L 82,52 Z" fill="#facc15"/>
            <!-- Black Checkered Taxi Stripe -->
            <rect x="18" y="44" width="64" height="4" fill="#0f172a"/>
            <!-- Windows -->
            <polygon points="34,32 47,32 47,40 28,40" fill="#bae6fd"/>
            <polygon points="51,32 66,32 72,40 51,40" fill="#bae6fd"/>
            <!-- Taxi Roof Sign -->
            <rect x="44" y="24" width="14" height="5" rx="1.5" fill="#ffffff" stroke="#0f172a" stroke-width="0.8"/>
            <!-- Wheels -->
            <circle cx="32" cy="52" r="6" fill="#0f172a"/>
            <circle cx="68" cy="52" r="6" fill="#0f172a"/>
        </svg>
    `,

    // 24. Railways (Express Train)
    railways: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Rails Tracks -->
            <line x1="0" y1="56" x2="100" y2="56" stroke="#64748b" stroke-width="3"/>
            <!-- Aerodynamic Express Train (Vande Bharat / Rajdhani) -->
            <path d="M 12,54 L 14,32 Q 22,22 42,22 L 86,22 L 88,54 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
            <!-- Front Windshield -->
            <path d="M 16,34 Q 22,26 36,26 L 36,36 L 16,36 Z" fill="#0f172a"/>
            <!-- Saffron / Blue Speed Stripe -->
            <rect x="14" y="38" width="74" height="6" fill="#ea580c"/>
            <rect x="14" y="44" width="74" height="2" fill="#1e3a8a"/>
            <!-- Side Windows -->
            <rect x="42" y="27" width="12" height="8" fill="#1e293b" rx="1"/>
            <rect x="58" y="27" width="12" height="8" fill="#1e293b" rx="1"/>
            <rect x="74" y="27" width="12" height="8" fill="#1e293b" rx="1"/>
        </svg>
    `,

    // 25. Recycling Plant
    recycling: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="32" r="26" fill="#ecfdf5"/>
            <!-- Eco Green Recycling Arrows Loop -->
            <path d="M 50,12 L 62,24 L 54,24 Q 54,38 42,42 L 39,36 Q 48,34 48,24 L 40,24 Z" fill="#16a34a"/>
            <path d="M 68,44 L 52,48 L 56,42 Q 44,34 44,22 L 50,22 Q 50,30 58,36 L 62,32 Z" fill="#059669"/>
            <path d="M 28,38 L 36,52 L 40,46 Q 32,36 38,24 L 32,24 Q 28,32 32,42 Z" fill="#15803d"/>
        </svg>
    `,

    // 26. Renewable Energy
    renewable: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="52" width="100" height="13" fill="#15803d"/>
            <!-- Wind Turbine -->
            <line x1="32" y1="52" x2="32" y2="16" stroke="#ffffff" stroke-width="2"/>
            <circle cx="32" cy="16" r="3" fill="#cbd5e1"/>
            <line x1="32" y1="16" x2="32" y2="2" stroke="#ffffff" stroke-width="2"/>
            <line x1="32" y1="16" x2="20" y2="24" stroke="#ffffff" stroke-width="2"/>
            <line x1="32" y1="16" x2="44" y2="24" stroke="#ffffff" stroke-width="2"/>
            <!-- Solar Panels Array -->
            <polygon points="54,52 88,52 82,34 52,34" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.2"/>
            <line x1="67" y1="34" x2="71" y2="52" stroke="#93c5fd" stroke-width="1"/>
            <line x1="53" y1="43" x2="85" y2="43" stroke="#93c5fd" stroke-width="1"/>
            <!-- Golden Sun -->
            <circle cx="82" cy="14" r="8" fill="#facc15"/>
        </svg>
    `,

    // 27. Chance (Orange Card with '?')
    chance: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="5" width="68" height="55" rx="6" fill="#f97316" stroke="#ffffff" stroke-width="2.5"/>
            <text x="50" y="47" font-family="'Outfit', sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">?</text>
        </svg>
    `,

    // 28. Community Chest / Fortune (Treasure Chest with Gold Coins)
    fortune: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Wooden Treasure Chest Matching Reference Photo -->
            <rect x="24" y="26" width="52" height="30" rx="3" fill="#78350f" stroke="#451a03" stroke-width="2"/>
            <!-- Curved Rounded Lid -->
            <path d="M 22,26 Q 50,10 78,26 Z" fill="#92400e" stroke="#451a03" stroke-width="2"/>
            <!-- Gold Metal Bands -->
            <rect x="34" y="26" width="5" height="30" fill="#facc15"/>
            <rect x="61" y="26" width="5" height="30" fill="#facc15"/>
            <path d="M 34,26 Q 36,15 39,26" stroke="#facc15" stroke-width="4" fill="none"/>
            <path d="M 61,26 Q 63,15 66,26" stroke="#facc15" stroke-width="4" fill="none"/>
            <!-- Keyhole Lock Plate -->
            <rect x="46" y="25" width="8" height="9" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
            <circle cx="50" cy="28.5" r="1.5" fill="#0f172a"/>
            <!-- Overflowing Gold Coins -->
            <circle cx="20" cy="54" r="4.5" fill="#facc15" stroke="#b45309" stroke-width="0.8"/>
            <circle cx="28" cy="56" r="4.5" fill="#ffd700" stroke="#b45309" stroke-width="0.8"/>
            <circle cx="78" cy="54" r="4.5" fill="#facc15" stroke="#b45309" stroke-width="0.8"/>
        </svg>
    `,

    // 29. Tax (Burlap Rupee Money Sack)
    tax: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Burlap Money Sack with Rupee Sign Matching Reference Photo -->
            <path d="M 32,58 Q 20,54 26,38 Q 32,24 44,22 L 56,22 Q 68,24 74,38 Q 80,54 68,58 Z" fill="#d97706" stroke="#78350f" stroke-width="2"/>
            <!-- Tied Cord at Neck -->
            <rect x="42" y="19" width="16" height="4" rx="2" fill="#78350f"/>
            <!-- Bag Top Ruffle -->
            <polygon points="40,19 46,12 50,15 54,12 60,19" fill="#b45309"/>
            <!-- Bold Rupee Symbol '₹' on Sack -->
            <text x="50" y="47" font-family="'Outfit', sans-serif" font-size="24" font-weight="900" fill="#1c1917" text-anchor="middle">₹</text>
        </svg>
    `,

    // 30. Police Officer ("Go to Jail")
    police: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Cartoon Police Officer Matching Reference Photo -->
            <circle cx="50" cy="30" r="14" fill="#fed7aa"/>
            <!-- Blue Police Uniform Shirt -->
            <path d="M 28,58 Q 32,44 50,44 Q 68,44 72,58 Z" fill="#1e3a8a"/>
            <!-- Gold Badge -->
            <polygon points="42,50 44,46 48,48 46,52" fill="#facc15"/>
            <!-- Tie -->
            <polygon points="48,44 52,44 51,54 49,54" fill="#0f172a"/>
            <!-- Face features -->
            <circle cx="45" cy="29" r="1.8" fill="#0f172a"/>
            <circle cx="55" cy="29" r="1.8" fill="#0f172a"/>
            <path d="M 46,36 Q 50,39 54,36" stroke="#0f172a" stroke-width="1.2" fill="none"/>
            <!-- Blue Peaked Cap with Gold Emblem -->
            <path d="M 34,22 Q 50,10 66,22 Z" fill="#1e3a8a"/>
            <ellipse cx="50" cy="22" rx="18" ry="3.5" fill="#0f172a"/>
            <polygon points="50,14 52,18 48,18" fill="#facc15"/>
        </svg>
    `,

    // 31. Jail Bars ("Just Visiting")
    jail_bars: `
        <svg viewBox="0 0 100 65" class="landmark-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="8" width="64" height="48" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
            <!-- Vertical Black Prison Bars Matching Reference Photo -->
            <line x1="28" y1="8" x2="28" y2="56" stroke="#0f172a" stroke-width="4.5"/>
            <line x1="39" y1="8" x2="39" y2="56" stroke="#0f172a" stroke-width="4.5"/>
            <line x1="50" y1="8" x2="50" y2="56" stroke="#0f172a" stroke-width="4.5"/>
            <line x1="61" y1="8" x2="61" y2="56" stroke="#0f172a" stroke-width="4.5"/>
            <line x1="72" y1="8" x2="72" y2="56" stroke="#0f172a" stroke-width="4.5"/>
            <!-- Cross Beam -->
            <line x1="18" y1="32" x2="82" y2="32" stroke="#0f172a" stroke-width="3"/>
        </svg>
    `
};

// Map each tile ID in BOARD_DATA to its exact landmark illustration
function getMonumentSvgForTile(tile) {
    // Corner & special tiles
    if (tile.type === 'luck') return MONUMENT_SVGS.chance;
    if (tile.type === 'fortune') return MONUMENT_SVGS.fortune;
    if (tile.type === 'tax') return MONUMENT_SVGS.tax;

    const MAPPING = {
        1: MONUMENT_SVGS.mumbai,
        2: MONUMENT_SVGS.bus,
        3: MONUMENT_SVGS.delhi,
        4: MONUMENT_SVGS.recycling,
        5: MONUMENT_SVGS.bengaluru,
        6: MONUMENT_SVGS.hyderabad,
        8: MONUMENT_SVGS.chennai,
        10: MONUMENT_SVGS.pune,
        12: MONUMENT_SVGS.ahmedabad,
        13: MONUMENT_SVGS.kolkata,
        14: MONUMENT_SVGS.airlines,
        15: MONUMENT_SVGS.surat,
        17: MONUMENT_SVGS.jamshedpur,
        19: MONUMENT_SVGS.nagpur,
        21: MONUMENT_SVGS.indore,
        22: MONUMENT_SVGS.lucknow,
        23: MONUMENT_SVGS.taxi,
        24: MONUMENT_SVGS.bhubaneswar,
        25: MONUMENT_SVGS.renewable,
        26: MONUMENT_SVGS.chandigarh,
        28: MONUMENT_SVGS.jaipur,
        29: MONUMENT_SVGS.kochi,
        31: MONUMENT_SVGS.srinagar,
        32: MONUMENT_SVGS.railways,
        33: MONUMENT_SVGS.guwahati,
        35: MONUMENT_SVGS.shillong
    };

    return MAPPING[tile.id] || MONUMENT_SVGS.mumbai;
}
