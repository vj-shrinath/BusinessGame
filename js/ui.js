// UI Rendering and Animation Engine for Business (India Edition)

class GameUI {
    constructor() {
        this.boardEl = document.getElementById('game-board');
        this.boardCenterEl = null;
        this.statusText = null;
        this.actionControls = null;
        this.playersPanel = null;
        this.activityTicker = null;
        this.activityFullLog = null;
        this.deedModal = document.getElementById('modal-deed');
        this.historyModal = document.getElementById('modal-history');
        
        // Anchored Tile Popup Elements
        this.tilePopupOverlay = document.getElementById('tile-popup-overlay');
        this.tilePopupCard = document.getElementById('tile-card-popup');
        this.tilePopupArrow = document.getElementById('tile-popup-arrow');
        this.tilePopupBadge = document.getElementById('tile-popup-badge');
        this.tilePopupLocation = document.getElementById('tile-popup-location');
        this.tilePopupRoll = document.getElementById('tile-popup-roll');
        this.tilePopupDesc = document.getElementById('tile-popup-desc');
        this.tilePopupTableWrap = document.getElementById('tile-popup-table-wrap');
        this.tilePopupRulesList = document.getElementById('tile-popup-rules-list');
        this.btnToggleRules = document.getElementById('btn-toggle-all-rules');
        this.btnCloseTilePopup = document.getElementById('btn-close-tile-popup');
        
        this.activeTilePopupDismissCallback = null;
        this.activeHighlightedTileId = null;
        this.fullLogHistory = [];
    }

    renderBoard() {
        this.boardEl.innerHTML = '';

        // 36 tiles mapped to a 10x10 CSS Grid perimeter
        BOARD_DATA.forEach(tile => {
            const tileEl = document.createElement('div');
            tileEl.className = `board-tile tile-${tile.type}`;
            tileEl.id = `tile-${tile.id}`;
            tileEl.dataset.tileId = tile.id;

            // Make interactive tiles TV focusable (Properties, Transports, Utilities, Chance, Chest)
            if (['property', 'transport', 'utility', 'luck', 'fortune'].includes(tile.type)) {
                tileEl.classList.add('tv-focusable');
                tileEl.setAttribute('tabindex', '0');
            }

            // Determine grid coordinates and edge placement
            let row = 1, col = 1;
            let edgeClass = 'edge-bottom';

            if (tile.id >= 0 && tile.id <= 9) {
                // Bottom row: START (col 1, row 10) to RESORT (col 10, row 10)
                row = 10;
                col = tile.id + 1;
                edgeClass = 'edge-bottom';
            } else if (tile.id >= 10 && tile.id <= 17) {
                // Right col: PUNE (col 10, row 9) to JAMSHEDPUR (col 10, row 2)
                row = 10 - (tile.id - 9);
                col = 10;
                edgeClass = 'edge-right';
            } else if (tile.id >= 18 && tile.id <= 27) {
                // Top row: GO TO JAIL (col 10, row 1) to JAIL (col 1, row 1)
                row = 1;
                col = 10 - (tile.id - 18);
                edgeClass = 'edge-top';
            } else if (tile.id >= 28 && tile.id <= 35) {
                // Left col: JAIPUR (col 1, row 2) to SHILLONG (col 1, row 9)
                row = 2 + (tile.id - 28);
                col = 1;
                edgeClass = 'edge-left';
            }

            tileEl.classList.add(edgeClass);
            tileEl.style.gridRow = `${row}`;
            tileEl.style.gridColumn = `${col}`;

            const illustrationSvg = (typeof getMonumentSvgForTile === 'function') ? getMonumentSvgForTile(tile) : '';

            // Handle Special Corner Tiles
            if (tile.id === 0) { // GO / START
                tileEl.innerHTML = `
                    <div class="corner-tile-inner corner-go">
                        <div class="go-top-text">Collect \u20B9750</div>
                        <div class="go-center-wrap">
                            <span class="go-text">GO</span>
                            <div class="go-arrow"><i class="fa-solid fa-arrow-right-long"></i></div>
                        </div>
                        <div class="start-goti-dock">
                            <div class="tile-pawns" id="pawns-${tile.id}"></div>
                        </div>
                    </div>
                `;
            } else if (tile.id === 9) { // RESORT / VACATION
                tileEl.innerHTML = `
                    <div class="corner-tile-inner corner-resort">
                        <div class="corner-title-text">Resort</div>
                        <div class="resort-artwork">
                            <i class="fa-solid fa-umbrella-beach resort-icon"></i>
                        </div>
                        <div class="corner-sub-text">Rest Haven</div>
                        <div class="tile-pawns" id="pawns-${tile.id}"></div>
                    </div>
                `;
            } else if (tile.id === 18) { // GO TO JAIL / POLICE OFFICER
                tileEl.innerHTML = `
                    <div class="corner-tile-inner corner-police">
                        <div class="police-title">Go to Jail</div>
                        <div class="police-artwork">
                            ${MONUMENT_SVGS.police}
                        </div>
                        <div class="tile-pawns" id="pawns-${tile.id}"></div>
                    </div>
                `;
            } else if (tile.id === 27) { // JUST VISITING / JAIL
                tileEl.innerHTML = `
                    <div class="corner-tile-inner corner-visiting-jail">
                        <div class="jail-bars-artwork">
                            ${MONUMENT_SVGS.jail_bars}
                        </div>
                        <div class="visiting-tag">Just Visiting</div>
                        <div class="visiting-sub">(Jail)</div>
                        <div class="tile-pawns" id="pawns-${tile.id}"></div>
                    </div>
                `;
            } else {
                // Standard City, Transport, Utility, Chance, Community Chest, Tax Tiles
                const tileColor = tile.colorHex || '#1e88e5';
                const priceFormatted = tile.price ? `\u20B9${tile.price.toLocaleString('en-IN')}` : (tile.taxAmount ? `Pay \u20B9${tile.taxAmount.toLocaleString('en-IN')}` : '');

                let displayName = tile.name;
                if (tile.type === 'luck') {
                    displayName = 'CHANCE';
                    tileEl.classList.add('tile-chance');
                    tileEl.title = 'CHANCE - Click or press OK to view Dice Rules';
                } else if (tile.type === 'fortune') {
                    displayName = 'COMMUNITY CHEST';
                    tileEl.classList.add('tile-chest');
                    tileEl.title = 'COMMUNITY CHEST - Click or press OK to view Dice Rules';
                }

                let tileInnerHtml = '';

                if (edgeClass === 'edge-left') {
                    tileInnerHtml = `
                        <div class="tile-bar-left" style="background: ${tileColor};"></div>
                        <div class="tile-side-content">
                            <div class="tile-header-area">
                                <div class="tile-city-name">${displayName}</div>
                                ${priceFormatted ? `<div class="tile-price-text">${priceFormatted}</div>` : ''}
                            </div>
                            <div class="tile-artwork-area">
                                ${illustrationSvg}
                            </div>
                        </div>
                    `;
                } else if (edgeClass === 'edge-right') {
                    tileInnerHtml = `
                        <div class="tile-side-content">
                            <div class="tile-header-area">
                                <div class="tile-city-name">${displayName}</div>
                                ${priceFormatted ? `<div class="tile-price-text">${priceFormatted}</div>` : ''}
                            </div>
                            <div class="tile-artwork-area">
                                ${illustrationSvg}
                            </div>
                        </div>
                        <div class="tile-bar-right" style="background: ${tileColor};"></div>
                    `;
                } else {
                    tileInnerHtml = `
                        <div class="tile-bar-top" style="background: ${tileColor};"></div>
                        <div class="tile-header-area">
                            <div class="tile-city-name">${displayName}</div>
                            ${priceFormatted ? `<div class="tile-price-text">${priceFormatted}</div>` : ''}
                        </div>
                        <div class="tile-artwork-area">
                            ${illustrationSvg}
                        </div>
                    `;
                }

                tileEl.innerHTML = `
                    <div class="tile-owner-ribbon" id="owner-ribbon-${tile.id}"></div>
                    ${tileInnerHtml}
                    <div class="tile-buildings" id="buildings-${tile.id}"></div>
                    <div class="tile-pawns" id="pawns-${tile.id}"></div>
                `;
            }

            // Click Handlers for Inspection:
            // 1. Property / Transport / Utility -> Title Deed Modal
            // 2. Chance / Chest -> Anchored Tile Rules Popup
            tileEl.addEventListener('click', () => {
                if (['property', 'transport', 'utility'].includes(tile.type)) {
                    const state = (typeof game !== 'undefined' && game.propertyState) ? game.propertyState[tile.id] : null;
                    const owner = (state && state.ownerId !== null) ? game.players.find(p => p.id === state.ownerId) : null;
                    this.showDeedCard(tile, owner ? owner.name : null);
                } else if (tile.type === 'luck') {
                    this.showTileCardPopup(tile.id, 'CHANCE', null, null, true);
                } else if (tile.type === 'fortune') {
                    this.showTileCardPopup(tile.id, 'COMMUNITY CHEST', null, null, true);
                }
            });

            this.boardEl.appendChild(tileEl);
        });

        // Insert smart in-board HUD, controls, and statistics command center
        this.renderBoardCenter();
    }

    renderBoardCenter() {
        const center = document.createElement('div');
        center.className = 'board-center-content';
        center.id = 'board-center';
        center.style.gridRow = '2 / 10';
        center.style.gridColumn = '2 / 10';

        center.innerHTML = `
            <div class="center-art-backdrop"></div>
            <div class="center-dark-scrim"></div>
            <div class="board-fold-seam"></div>

            <div class="center-console-layout">
                <!-- Top Strip: Brand, Turn Status, Player Count & Fullscreen -->
                <header class="center-top-bar">
                    <div class="center-brand">
                        <div class="brand-coin-badge"><i class="fa-solid fa-coins"></i></div>
                        <div class="brand-text-wrap">
                            <span class="brand-title">BUSINESS INDIA</span>
                            <span class="brand-sub">NAVA VYAPAR TYCOON</span>
                        </div>
                    </div>
                    <div class="center-turn-banner" id="turn-status">
                        <span class="turn-beacon-dot"></span>
                        <span class="turn-text">Welcome to Business India Edition!</span>
                    </div>
                    <div class="center-controls-strip">
                        <div class="bank-treasury-pill" id="bank-treasury-pill" title="Reserve Bank of India Vault">
                            <i class="fa-solid fa-building-columns"></i> Bank: <b id="bank-vault-val">₹2,00,000</b>
                        </div>
                        <div class="resort-jackpot-pill" id="resort-jackpot-pill" style="display: none;" title="Resort Jackpot Pool">
                            <i class="fa-solid fa-umbrella-beach"></i> Pot: <b id="resort-pot-val">₹0</b>
                        </div>
                        <button class="btn-pill btn-settings-pill tv-focusable" id="btn-open-settings" tabindex="0" title="Game Settings & Rules">
                            <i class="fa-solid fa-sliders"></i> Rules / Setup
                        </button>
                        <button class="btn-pill btn-fullscreen-pill tv-focusable" id="btn-fullscreen" tabindex="0" title="Toggle Fullscreen (F)">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                    </div>
                </header>

                <!-- Players Statistics HUD (Dynamically sized 2 to 4 Players) -->
                <section class="center-players-hud" id="players-panel">
                    <!-- Populated by renderPlayers -->
                </section>

                <!-- Central Action Hub: 3D Dice Stage & Control Buttons -->
                <section class="center-action-hub">
                    <div class="center-dice-box">
                        <div class="dice-roll-stage" id="dice-stage">
                            <div class="die die-1" id="die-1"><span class="pip pip-5"></span></div>
                            <div class="die die-2" id="die-2"><span class="pip pip-5"></span></div>
                        </div>
                        <div class="dice-total-tag" id="dice-sum-display">Total: 10</div>
                    </div>
                    <div class="action-buttons-strip" id="action-controls">
                        <button class="tv-btn btn-primary btn-roll-master tv-focusable" id="btn-roll" tabindex="0">
                            <i class="fa-solid fa-dice"></i> Roll Dice
                        </button>
                        <button class="tv-btn btn-success btn-buy-master tv-focusable" id="btn-buy" tabindex="0" style="display: none;">
                            <i class="fa-solid fa-cart-shopping"></i> Buy Property
                        </button>
                        <button class="tv-btn btn-secondary btn-end-master tv-focusable" id="btn-end-turn" tabindex="0" disabled>
                            <i class="fa-solid fa-forward-step"></i> End Turn
                        </button>
                    </div>
                </section>

                <!-- Bottom Strip: Live Activity Ticker with History Trigger -->
                <footer class="center-ticker-bar">
                    <div class="ticker-label"><span class="live-dot-beacon"></span> LIVE:</div>
                    <div class="ticker-content" id="activity-ticker">Game started. Press Roll Dice to begin!</div>
                    <button class="ticker-history-btn tv-focusable" id="btn-open-history" tabindex="0" title="View Full Activity Log">
                        <i class="fa-solid fa-clock-rotate-left"></i> History
                    </button>
                </footer>
            </div>
        `;

        this.boardEl.appendChild(center);

        // Cache elements
        this.boardCenterEl = center;
        this.statusText = document.getElementById('turn-status');
        this.actionControls = document.getElementById('action-controls');
        this.playersPanel = document.getElementById('players-panel');
        this.activityTicker = document.getElementById('activity-ticker');
        this.activityFullLog = document.getElementById('activity-log-full');

        // Re-bind listeners if helper exists
        if (typeof bindCenterUiHandlers === 'function') {
            bindCenterUiHandlers();
        }
    }

    updateBankVault(balance) {
        const val = document.getElementById('bank-vault-val');
        if (!val) return;
        if (balance === Infinity || balance === undefined) {
            val.textContent = 'Unlimited (∞)';
        } else {
            val.textContent = `₹${balance.toLocaleString('en-IN')}`;
        }
    }

    updateResortPot(pot, enabled = true) {
        const pill = document.getElementById('resort-jackpot-pill');
        const val = document.getElementById('resort-pot-val');
        if (!pill || !val) return;
        if (!enabled) {
            pill.style.display = 'none';
            return;
        }
        pill.style.display = 'inline-flex';
        val.textContent = `₹${pot.toLocaleString('en-IN')}`;
        if (pot > 0) {
            pill.classList.add('jackpot-active');
        } else {
            pill.classList.remove('jackpot-active');
        }
    }

    renderPlayers(players, activePlayerIdx) {
        if (!this.playersPanel) {
            this.playersPanel = document.getElementById('players-panel');
        }
        if (!this.playersPanel) return;

        this.playersPanel.innerHTML = '';
        this.playersPanel.style.setProperty('--player-count', players.length);

        players.forEach((p, idx) => {
            const card = document.createElement('div');
            const isActive = idx === activePlayerIdx;
            card.className = `player-card-hud ${isActive ? 'active-turn' : ''} ${p.isBankrupt ? 'bankrupt' : ''}`;
            card.id = `player-card-${p.id}`;

            const netWorth = p.calculateNetWorth();

            // Owned property color chips (AAA Game Polish)
            let propertyChipsHtml = '';
            if (p.ownedProperties && p.ownedProperties.length > 0) {
                propertyChipsHtml = '<div class="player-property-chips">';
                p.ownedProperties.forEach(tId => {
                    const t = BOARD_DATA[tId];
                    if (t && t.colorHex) {
                        propertyChipsHtml += `<span class="prop-chip" style="background: ${t.colorHex};" title="${t.name}"></span>`;
                    }
                });
                propertyChipsHtml += '</div>';
            }

            // Clean, uncluttered, high-impact statistics inside the board
            card.innerHTML = `
                <div class="player-hud-header">
                    <div class="player-hud-goti goti-p${p.id}">
                        <div class="mini-goti-inner"></div>
                    </div>
                    <div class="player-hud-name-wrap">
                        <span class="player-hud-name">${p.name}</span>
                        <span class="player-hud-badge" style="background: ${p.color};">P${idx + 1}</span>
                        ${p.isAI ? '<span class="player-hud-bot-tag" title="Computer Bot"><i class="fa-solid fa-robot"></i> BOT</span>' : ''}
                    </div>
                    ${isActive ? '<span class="active-turn-pulse-tag"><i class="fa-solid fa-play"></i> TURN</span>' : ''}
                </div>
                <div class="player-hud-cash">
                    <span class="currency-symbol">\u20B9</span>${p.cash.toLocaleString('en-IN')}
                </div>
                <div class="player-hud-stats">
                    <span class="hud-stat-item" title="Properties Owned">
                        <i class="fa-solid fa-building"></i> <b>${p.ownedProperties.length}</b>
                    </span>
                    <span class="hud-stat-item" title="Net Worth">
                        <i class="fa-solid fa-vault"></i> <b>\u20B9${netWorth.toLocaleString('en-IN')}</b>
                    </span>
                </div>
                ${propertyChipsHtml}
            `;
            this.playersPanel.appendChild(card);
        });

        this.updatePawnsOnBoard(players);
    }

    // Authentic Indian Board Game Top-View Goti (Pawn) Rendering Engine
    updatePawnsOnBoard(players) {
        // Clear all pawn containers
        document.querySelectorAll('.tile-pawns').forEach(c => c.innerHTML = '');

        players.forEach((p, idx) => {
            if (p.isBankrupt) return;
            const container = document.getElementById(`pawns-${p.position}`);
            if (container) {
                const gotiEl = document.createElement('div');
                const isActive = (typeof game !== 'undefined' && game.activePlayerIdx === idx);
                gotiEl.className = `board-goti goti-p${p.id} ${isActive ? 'active-turn-goti' : ''}`;
                gotiEl.dataset.playerId = p.id;
                gotiEl.title = `${p.name} (${p.pawnName})`;

                // 100% REALISTIC TOP-VIEW GOTI:
                // 1. Ambient drop shadow offset onto board
                // 2. Outer beveled circular base flange
                // 3. Sculpted waist / collar groove ring
                // 4. Glossy spherical dome head with 3D radial reflection
                // 5. Specular highlight glint & apex turned pip
                gotiEl.innerHTML = `
                    <div class="goti-ambient-shadow"></div>
                    <div class="goti-base-rim">
                        <div class="goti-waist-ring">
                            <div class="goti-head-sphere">
                                <div class="goti-specular-glint"></div>
                                <div class="goti-secondary-sheen"></div>
                                <div class="goti-apex-pip"></div>
                            </div>
                        </div>
                    </div>
                    ${isActive ? '<div class="goti-beacon-ring"></div>' : ''}
                `;
                container.appendChild(gotiEl);
            }
        });
    }

    renderOwnership(tileId, player) {
        const ribbon = document.getElementById(`owner-ribbon-${tileId}`);
        const tileEl = document.getElementById(`tile-${tileId}`);
        if (ribbon && player) {
            ribbon.style.display = 'flex';
            ribbon.style.background = player.color;
            ribbon.innerHTML = `<span class="ribbon-text">P${player.id + 1}</span>`;
            if (tileEl) {
                tileEl.classList.add('tile-owned');
                tileEl.style.borderTopColor = player.color;
            }
        }
    }

    renderBuildings(tileId, houses, hasHotel) {
        const container = document.getElementById(`buildings-${tileId}`);
        if (!container) return;
        container.innerHTML = '';

        if (hasHotel) {
            const hotel = document.createElement('div');
            hotel.className = 'mini-3d-hotel';
            hotel.title = 'Grand Hotel';
            hotel.innerHTML = `
                <div class="hotel-roof"></div>
                <div class="hotel-chimney"></div>
                <div class="hotel-facade"><i class="fa-solid fa-hotel"></i></div>
            `;
            container.appendChild(hotel);
        } else if (houses > 0) {
            for (let i = 0; i < houses; i++) {
                const house = document.createElement('div');
                house.className = 'mini-3d-house';
                house.title = `House ${i + 1}`;
                house.innerHTML = `
                    <div class="house-roof"></div>
                    <div class="house-body"></div>
                `;
                container.appendChild(house);
            }
        }
    }

    animateDiceRoll(die1Val, die2Val, callback) {
        const die1El = document.getElementById('die-1');
        const die2El = document.getElementById('die-2');
        const sumEl = document.getElementById('dice-sum-display');

        let frames = 0;
        const maxFrames = 12;
        sounds.playDiceShake();

        const interval = setInterval(() => {
            frames++;
            const rand1 = Math.floor(Math.random() * 6) + 1;
            const rand2 = Math.floor(Math.random() * 6) + 1;
            this.drawDieFace(die1El, rand1);
            this.drawDieFace(die2El, rand2);
            die1El.style.transform = `rotate(${Math.sin(frames) * 20}deg) scale(1.1)`;
            die2El.style.transform = `rotate(${Math.cos(frames) * -20}deg) scale(1.1)`;

            if (frames >= maxFrames) {
                clearInterval(interval);
                this.drawDieFace(die1El, die1Val);
                this.drawDieFace(die2El, die2Val);
                die1El.style.transform = 'none';
                die2El.style.transform = 'none';
                sumEl.textContent = `Rolled: ${die1Val} + ${die2Val} = ${die1Val + die2Val}`;
                sumEl.classList.add('pop');
                setTimeout(() => sumEl.classList.remove('pop'), 400);
                if (callback) callback();
            }
        }, 60);
    }

    drawDieFace(dieEl, value) {
        dieEl.innerHTML = '';
        const pipConfigs = {
            1: ['pip-center'],
            2: ['pip-top-left', 'pip-bottom-right'],
            3: ['pip-top-left', 'pip-center', 'pip-bottom-right'],
            4: ['pip-top-left', 'pip-top-right', 'pip-bottom-left', 'pip-bottom-right'],
            5: ['pip-top-left', 'pip-top-right', 'pip-center', 'pip-bottom-left', 'pip-bottom-right'],
            6: ['pip-top-left', 'pip-top-right', 'pip-mid-left', 'pip-mid-right', 'pip-bottom-left', 'pip-bottom-right']
        };

        (pipConfigs[value] || []).forEach(cls => {
            const pip = document.createElement('span');
            pip.className = `pip ${cls}`;
            dieEl.appendChild(pip);
        });
    }

    showDeedCard(tile, ownerName = null) {
        const modal = document.getElementById('modal-deed');
        const container = document.getElementById('deed-card-render');

        let rentBody = '';
        if (tile.type === 'property') {
            rentBody = `
                <div class="deed-rent-row main-rent">
                    <span>RENT</span>
                    <b>\u20B9${tile.baseRent.toLocaleString('en-IN')}</b>
                </div>
                <div class="deed-breakdown">
                    <div class="deed-row"><span>With 1 house</span> <b>\u20B9${tile.rentWithHouse[0].toLocaleString('en-IN')}</b></div>
                    <div class="deed-row"><span>With 2 houses</span> <b>\u20B9${tile.rentWithHouse[1].toLocaleString('en-IN')}</b></div>
                    <div class="deed-row"><span>With 3 houses</span> <b>\u20B9${tile.rentWithHouse[2].toLocaleString('en-IN')}</b></div>
                    <div class="deed-row highlight"><span>With Hotel</span> <b>\u20B9${tile.rentWithHotel.toLocaleString('en-IN')}</b></div>
                </div>
                <div class="deed-divider"></div>
                <div class="deed-row"><span>MORTGAGE VALUE</span> <b>\u20B9${tile.mortgage.toLocaleString('en-IN')}</b></div>
                <div class="deed-row"><span>House Cost</span> <b>\u20B9${tile.houseCost.toLocaleString('en-IN')}</b></div>
                <div class="deed-row"><span>Hotel Cost</span> <b>\u20B9${tile.hotelCost.toLocaleString('en-IN')}</b></div>
                <div class="deed-footer-note">
                    If a player owns all sites of any colour group, the rent is DOUBLED on UNIMPROVED sites in that group.
                </div>
            `;
        } else if (tile.type === 'transport') {
            rentBody = `
                <div class="deed-rent-row main-rent">
                    <span>RENT</span>
                    <b>\u20B9${tile.baseRent.toLocaleString('en-IN')}</b>
                </div>
                <div class="deed-breakdown">
                    <div class="deed-row"><span>If 2 Transports owned</span> <b>\u20B9${tile.tierRents[1].toLocaleString('en-IN')}</b></div>
                    <div class="deed-row"><span>If 3 Transports owned</span> <b>\u20B9${tile.tierRents[2].toLocaleString('en-IN')}</b></div>
                    <div class="deed-row highlight"><span>If all 4 owned</span> <b>\u20B9${tile.tierRents[3].toLocaleString('en-IN')}</b></div>
                </div>
                <div class="deed-divider"></div>
                <div class="deed-row"><span>MORTGAGE VALUE</span> <b>\u20B9${tile.mortgage.toLocaleString('en-IN')}</b></div>
            `;
        } else if (tile.type === 'utility') {
            rentBody = `
                <div class="deed-breakdown">
                    <div class="deed-row"><span>1 Utility owned:</span> <b>4 \u00D7 Dice Total</b></div>
                    <div class="deed-row highlight"><span>Both Utilities owned:</span> <b>10 \u00D7 Dice Total</b></div>
                </div>
                <div class="deed-divider"></div>
                <div class="deed-row"><span>MORTGAGE VALUE</span> <b>\u20B9${tile.mortgage.toLocaleString('en-IN')}</b></div>
            `;
        }

        container.innerHTML = `
            <div class="title-deed-card">
                <div class="deed-header" style="background: ${tile.colorHex || '#1e88e5'}">
                    <div class="deed-small-header">TITLE DEED</div>
                    <div class="deed-title">${tile.name}</div>
                </div>
                <div class="deed-body">
                    ${ownerName ? `<div class="deed-owner-tag">Owner: <b>${ownerName}</b></div>` : '<div class="deed-unowned-tag">Unowned (Bank)</div>'}
                    ${rentBody}
                </div>
            </div>
        `;

        tvNav.openModal(modal);
    }

    // Dedicated Anchored Tile Card Popup for Chance & Community Chest
    showTileCardPopup(tileId, cardType, rollVal = null, rule = null, isInspection = false, onDismiss = null) {
        this.activeTilePopupDismissCallback = onDismiss;
        
        // Remove previous active highlight if any
        if (this.activeHighlightedTileId !== null) {
            const prev = document.getElementById(`tile-${this.activeHighlightedTileId}`);
            if (prev) prev.classList.remove('tile-active-highlight');
        }

        const tileEl = document.getElementById(`tile-${tileId}`);
        if (!tileEl) return;

        this.activeHighlightedTileId = tileId;
        tileEl.classList.add('tile-active-highlight');

        const overlay = document.getElementById('tile-popup-overlay');
        const popup = document.getElementById('tile-card-popup');
        const arrow = document.getElementById('tile-popup-arrow');
        const badge = document.getElementById('tile-popup-badge');
        const locationEl = document.getElementById('tile-popup-location');
        const rollEl = document.getElementById('tile-popup-roll');
        const descEl = document.getElementById('tile-popup-desc');
        const tableWrap = document.getElementById('tile-popup-table-wrap');
        const rulesList = document.getElementById('tile-popup-rules-list');
        const btnToggle = document.getElementById('btn-toggle-all-rules');
        const btnClose = document.getElementById('btn-close-tile-popup');

        const isChance = cardType.toUpperCase().includes('CHANCE') || cardType === 'LUCK';
        const rulesData = isChance ? LUCK_RULES : FORTUNE_RULES;
        const iconCls = isChance ? 'fa-dice' : 'fa-dharmachakra';
        const typeLabel = isChance ? 'CHANCE' : 'COMMUNITY CHEST';

        popup.className = `tile-card-popup ${isChance ? 'theme-chance' : 'theme-chest'}`;
        badge.innerHTML = `<i class="fa-solid ${iconCls}"></i> ${typeLabel}`;
        locationEl.textContent = `BOX #${tileId} • ${BOARD_DATA[tileId] ? BOARD_DATA[tileId].name : typeLabel}`;

        // Populate the 2-12 rules table
        rulesList.innerHTML = '';
        for (let r = 2; r <= 12; r++) {
            const item = rulesData[r];
            if (item) {
                const li = document.createElement('li');
                li.className = (rollVal === r) ? 'rule-item-active' : '';
                li.innerHTML = `<span class="rule-roll-badge">🎲 ${r}</span> <span class="rule-text-span">${item.text}</span>`;
                rulesList.appendChild(li);
            }
        }

        if (isInspection) {
            rollEl.style.display = 'none';
            descEl.innerHTML = `Inspect Box <b>#${tileId}</b> (${typeLabel}). Whenever a player lands on this box, they roll the dice to determine their fate from the table below:`;
            tableWrap.style.display = 'block';
            btnToggle.style.display = 'none';
            btnClose.innerHTML = `<i class="fa-solid fa-xmark"></i> Close (Back)`;
        } else {
            rollEl.style.display = 'inline-flex';
            rollEl.innerHTML = `<i class="fa-solid fa-dice"></i> Dice Roll: <b>${rollVal}</b>`;
            descEl.innerHTML = rule ? rule.text : '';
            tableWrap.style.display = 'none';
            btnToggle.style.display = 'inline-flex';
            btnToggle.innerHTML = `<i class="fa-solid fa-list-ol"></i> View All Rules`;
            btnClose.innerHTML = `<i class="fa-solid fa-check"></i> OK / Continue`;
        }

        // Geometric Anchoring adjacent to tile on the board
        overlay.classList.add('active');
        popup.style.visibility = 'hidden';
        popup.style.display = 'block';

        // Position popup next to the tile
        requestAnimationFrame(() => {
            const tileRect = tileEl.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;

            let top = 0;
            let left = 0;
            let arrowClass = 'arrow-bottom';

            // Determine tile edge
            if (tileEl.classList.contains('edge-bottom')) {
                // Bottom row: popup appears ABOVE the tile
                top = tileRect.top - popupRect.height - 14;
                left = tileRect.left + (tileRect.width / 2) - (popupRect.width / 2);
                arrowClass = 'arrow-bottom';
            } else if (tileEl.classList.contains('edge-top')) {
                // Top row: popup appears BELOW the tile
                top = tileRect.bottom + 14;
                left = tileRect.left + (tileRect.width / 2) - (popupRect.width / 2);
                arrowClass = 'arrow-top';
            } else if (tileEl.classList.contains('edge-right')) {
                // Right col: popup appears to the LEFT of the tile
                top = tileRect.top + (tileRect.height / 2) - (popupRect.height / 2);
                left = tileRect.left - popupRect.width - 14;
                arrowClass = 'arrow-right';
            } else if (tileEl.classList.contains('edge-left')) {
                // Left col: popup appears to the RIGHT of the tile
                top = tileRect.top + (tileRect.height / 2) - (popupRect.height / 2);
                left = tileRect.right + 14;
                arrowClass = 'arrow-left';
            } else {
                // Default fallback center
                top = Math.max(20, (viewportH - popupRect.height) / 2);
                left = Math.max(20, (viewportW - popupRect.width) / 2);
                arrowClass = 'arrow-none';
            }

            // Keep within screen bounds
            left = Math.max(12, Math.min(viewportW - popupRect.width - 12, left));
            top = Math.max(12, Math.min(viewportH - popupRect.height - 12, top));

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
            arrow.className = `tile-card-bubble-arrow ${arrowClass}`;
            popup.style.visibility = 'visible';

            // Focus on action button for TV remote
            tvNav.openModal(overlay);
            setTimeout(() => {
                tvNav.setFocus(btnClose, false);
            }, 80);
        });
    }

    closeTileCardPopup() {
        const overlay = document.getElementById('tile-popup-overlay');
        if (overlay) overlay.classList.remove('active');

        if (this.activeHighlightedTileId !== null) {
            const tileEl = document.getElementById(`tile-${this.activeHighlightedTileId}`);
            if (tileEl) tileEl.classList.remove('tile-active-highlight');
            this.activeHighlightedTileId = null;
        }

        const cb = this.activeTilePopupDismissCallback;
        this.activeTilePopupDismissCallback = null;

        tvNav.closeModal(overlay);

        if (typeof cb === 'function') {
            cb();
        }
    }

    toggleTileRulesTable() {
        const tableWrap = document.getElementById('tile-popup-table-wrap');
        const btnToggle = document.getElementById('btn-toggle-all-rules');
        if (!tableWrap || !btnToggle) return;

        if (tableWrap.style.display === 'none') {
            tableWrap.style.display = 'block';
            btnToggle.innerHTML = `<i class="fa-solid fa-chevron-up"></i> Hide Rules`;
        } else {
            tableWrap.style.display = 'none';
            btnToggle.innerHTML = `<i class="fa-solid fa-list-ol"></i> View All Rules`;
        }
        tvNav.refreshFocusables();
    }

    logActivity(message, type = 'info') {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // 1. Update live ticker in the in-board center console
        const ticker = document.getElementById('activity-ticker');
        if (ticker) {
            ticker.innerHTML = `<span class="ticker-time">[${timeStr}]</span> ${message}`;
            ticker.classList.remove('ticker-flash');
            void ticker.offsetWidth; // trigger reflow
            ticker.classList.add('ticker-flash');
        }

        // 2. Add to full activity log for the History modal
        const fullLog = document.getElementById('activity-log-full');
        if (fullLog) {
            const entry = document.createElement('div');
            entry.className = `log-entry log-${type}`;
            entry.innerHTML = `<span class="log-time">${timeStr}</span> ${message}`;
            fullLog.prepend(entry);
            while (fullLog.children.length > 50) {
                fullLog.removeChild(fullLog.lastChild);
            }
        }
    }

    setStatus(text) {
        const statusEl = document.getElementById('turn-status');
        if (statusEl) {
            statusEl.innerHTML = text;
        }
    }
}

const ui = new GameUI();
