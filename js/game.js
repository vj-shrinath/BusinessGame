// Business - Nava Vyapar (India Edition) Core Game Engine
// Multi-player Tycoon Engine with Customizable Capital, Bank Treasury & House Rules

class Player {
    constructor(cfg, startingCash = 20000) {
        this.id = cfg.id;
        this.name = cfg.name;
        this.color = cfg.color;
        this.tokenClass = cfg.tokenClass;
        this.pawnName = cfg.pawnName;
        this.isAI = !!cfg.isAI;

        this.cash = startingCash;
        this.position = 0;
        this.inJail = false;
        this.jailTurns = 0;
        this.ownedProperties = []; // array of tile IDs
        this.isBankrupt = false;
    }

    calculateNetWorth() {
        let propertyValue = 0;
        this.ownedProperties.forEach(tileId => {
            const tile = BOARD_DATA[tileId];
            if (tile && tile.price) {
                propertyValue += tile.price;
            }
        });
        return this.cash + propertyValue;
    }
}

class BusinessGame {
    constructor() {
        this.players = [];
        this.activePlayerIdx = 0;
        this.dice = [1, 1];
        this.consecutiveDoubles = 0;
        this.turnPhase = 'INIT'; // 'READY_TO_ROLL', 'ROLLING', 'ACTION_REQUIRED', 'END_TURN'
        this.propertyState = {}; // tileId -> { ownerId, houses: 0, hasHotel: false, mortgaged: false }

        // Dynamic Economic Settings & House Rules
        this.settings = Object.assign({}, typeof DEFAULT_GAME_SETTINGS !== 'undefined' ? DEFAULT_GAME_SETTINGS : {
            playerCount: 4,
            startingCash: 20000,
            bankTreasury: 200000,
            passGoSalary: 750,
            doubleGoLanding: true,
            resortJackpot: true,
            jailBailFee: 500,
            rentInJail: true,
            quickDealProps: 0,
            winCondition: 'bankruptcy',
            maxRounds: 30
        });

        this.bankBalance = 200000;
        this.resortJackpotPot = 0;
        this.roundCount = 1;
        this.turnsThisRound = 0;

        // Setup property state lookup
        BOARD_DATA.forEach(tile => {
            if (['property', 'transport', 'utility'].includes(tile.type)) {
                this.propertyState[tile.id] = {
                    ownerId: null,
                    houses: 0,
                    hasHotel: false,
                    mortgaged: false
                };
            }
        });
    }

    init(playerCount = 4) {
        const settings = Object.assign({}, typeof DEFAULT_GAME_SETTINGS !== 'undefined' ? DEFAULT_GAME_SETTINGS : this.settings, { playerCount });
        this.initWithSettings(settings);
    }

    initWithSettings(customSettings) {
        this.settings = Object.assign({}, typeof DEFAULT_GAME_SETTINGS !== 'undefined' ? DEFAULT_GAME_SETTINGS : {}, customSettings);
        this.bankBalance = this.settings.bankTreasury;
        this.resortJackpotPot = 0;
        this.roundCount = 1;
        this.turnsThisRound = 0;

        this.players = [];
        for (let i = 0; i < this.settings.playerCount; i++) {
            const baseCfg = PLAYER_CONFIG[i];
            const customCfg = (this.settings.players && this.settings.players[i]) ? this.settings.players[i] : {};
            const merged = {
                id: baseCfg.id,
                name: customCfg.name || baseCfg.name,
                color: baseCfg.color,
                tokenClass: baseCfg.tokenClass,
                pawnName: baseCfg.pawnName,
                isAI: !!customCfg.isAI
            };
            this.players.push(new Player(merged, this.settings.startingCash));
        }

        this.activePlayerIdx = 0;
        this.turnPhase = 'READY_TO_ROLL';

        // Reset property states
        BOARD_DATA.forEach(tile => {
            if (['property', 'transport', 'utility'].includes(tile.type)) {
                this.propertyState[tile.id] = {
                    ownerId: null,
                    houses: 0,
                    hasHotel: false,
                    mortgaged: false
                };
            }
        });

        ui.renderBoard();

        // If Quick Deal rule enabled, distribute starter properties
        if (this.settings.quickDealProps > 0) {
            this.distributeQuickDealProperties(this.settings.quickDealProps);
        }

        ui.renderPlayers(this.players, this.activePlayerIdx);
        ui.updateBankVault(this.bankBalance);
        ui.updateResortPot(this.resortJackpotPot, this.settings.resortJackpot);

        const botCount = this.players.filter(p => p.isAI).length;
        const playerDesc = botCount > 0 ? `${this.players.length} players (${this.players.length - botCount} Human, ${botCount} Bot)` : `${this.players.length} manual players`;
        const bankDesc = this.bankBalance === Infinity ? 'Unlimited Bank' : `Bank Vault: ₹${this.bankBalance.toLocaleString('en-IN')}`;
        ui.logActivity(`Game started with ${playerDesc}. Starting Cash: ₹${this.settings.startingCash.toLocaleString('en-IN')} | ${bankDesc}.`, "success");

        this.startTurn();
    }

    distributeQuickDealProperties(countPerPlayer) {
        const eligible = BOARD_DATA.filter(t => ['property', 'transport', 'utility'].includes(t.type));
        const shuffled = [...eligible].sort(() => 0.5 - Math.random());
        let idx = 0;
        this.players.forEach(player => {
            for (let k = 0; k < countPerPlayer && idx < shuffled.length; k++) {
                const tile = shuffled[idx++];
                player.ownedProperties.push(tile.id);
                this.propertyState[tile.id].ownerId = player.id;
                ui.renderOwnership(tile.id, player);
            }
        });
        ui.logActivity(`⚡ Quick Start Rule: Dealt ${countPerPlayer} starter properties to each player!`, "info");
    }

    creditBank(amount) {
        if (this.bankBalance !== Infinity && this.bankBalance !== undefined) {
            this.bankBalance += amount;
            ui.updateBankVault(this.bankBalance);
        }
    }

    debitBank(amount) {
        if (this.bankBalance !== Infinity && this.bankBalance !== undefined) {
            this.bankBalance = Math.max(0, this.bankBalance - amount);
            if (this.bankBalance <= 0) {
                this.bankBalance = 50000;
                if (typeof sounds !== 'undefined') sounds.playChime();
                ui.logActivity("⚠️ Central Bank issued ₹50,000 emergency liquidity stimulus to replenish the vault!", "warning");
            }
            ui.updateBankVault(this.bankBalance);
        }
    }

    getCurrentPlayer() {
        return this.players[this.activePlayerIdx];
    }

    startTurn() {
        const player = this.getCurrentPlayer();
        if (player.isBankrupt) {
            this.nextTurn();
            return;
        }

        this.turnPhase = 'READY_TO_ROLL';
        ui.renderPlayers(this.players, this.activePlayerIdx);
        const botTag = player.isAI ? ' (🤖 Bot)' : '';
        ui.setStatus(`<b><span style="color: ${player.color}">${player.name}${botTag}</span></b>: Your turn to roll! Press <b>[Roll Dice]</b> or 🔴 Red key.`);
        this.updateControlButtons();

        // Automated turn for Bot AI
        if (player.isAI) {
            setTimeout(() => {
                if (this.turnPhase === 'READY_TO_ROLL') {
                    this.handleRollButton();
                }
            }, 950);
        }
    }

    handleRollButton() {
        if (this.turnPhase !== 'READY_TO_ROLL') return;
        this.rollDiceAndMove();
    }

    rollDiceAndMove() {
        const player = this.getCurrentPlayer();
        this.turnPhase = 'ROLLING';
        this.updateControlButtons();

        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        this.dice = [die1, die2];
        const isDoubles = die1 === die2;

        if (isDoubles) {
            this.consecutiveDoubles++;
        } else {
            this.consecutiveDoubles = 0;
        }

        ui.animateDiceRoll(die1, die2, () => {
            // Check 3 consecutive doubles
            if (this.consecutiveDoubles >= 3) {
                ui.logActivity(`${player.name} rolled 3 consecutive doubles! Sent to Jail!`, "danger");
                sounds.playBuzzer();
                this.sendToJail(player);
                this.turnPhase = 'END_TURN';
                this.updateControlButtons();
                return;
            }

            // If in jail
            if (player.inJail) {
                if (isDoubles) {
                    player.inJail = false;
                    player.jailTurns = 0;
                    ui.logActivity(`${player.name} rolled doubles (${die1}+${die2}) and broke out of Jail!`, "success");
                    sounds.playChime();
                    this.movePlayerSteps(player, die1 + die2);
                } else {
                    player.jailTurns++;
                    if (player.jailTurns >= 3) {
                        const bail = this.settings.jailBailFee;
                        player.cash = Math.max(0, player.cash - bail);
                        if (this.settings.resortJackpot) {
                            this.resortJackpotPot += bail;
                            ui.updateResortPot(this.resortJackpotPot, true);
                        } else {
                            this.creditBank(bail);
                        }
                        player.inJail = false;
                        player.jailTurns = 0;
                        ui.logActivity(`${player.name} paid ₹${bail.toLocaleString('en-IN')} bail after 3 turns and left Jail.`, "warning");
                        this.movePlayerSteps(player, die1 + die2);
                    } else {
                        ui.logActivity(`${player.name} did not roll doubles. Remains in Jail (Turn ${player.jailTurns}/3).`, "info");
                        this.turnPhase = 'END_TURN';
                        this.updateControlButtons();
                    }
                }
                return;
            }

            // Normal movement
            this.movePlayerSteps(player, die1 + die2);
        });
    }

    movePlayerSteps(player, steps) {
        let stepsLeft = steps;
        const stepInterval = setInterval(() => {
            if (stepsLeft <= 0) {
                clearInterval(stepInterval);
                this.handleTileLanding(player);
                return;
            }

            player.position = (player.position + 1) % BOARD_DATA.length;
            sounds.playStep();

            // Passed or Landed on START
            if (player.position === 0) {
                let bonus = this.settings.passGoSalary;
                if (stepsLeft === 1 && this.settings.doubleGoLanding) {
                    bonus *= 2;
                    ui.logActivity(`${player.name} landed DIRECTLY on START and collected DOUBLE salary of ₹${bonus.toLocaleString('en-IN')}!`, "success");
                } else {
                    ui.logActivity(`${player.name} passed START and collected ₹${bonus.toLocaleString('en-IN')}!`, "success");
                }
                player.cash += bonus;
                this.debitBank(bonus);
                sounds.playCash();
            }

            ui.updatePawnsOnBoard(this.players);
            stepsLeft--;
        }, 130);
    }

    handleTileLanding(player) {
        const tile = BOARD_DATA[player.position];
        ui.logActivity(`${player.name} landed on <b>${tile.name}</b>`, "info");

        switch (tile.type) {
            case 'property':
            case 'transport':
            case 'utility':
                this.handleRealEstateLanding(player, tile);
                break;
            case 'tax':
                this.handleTaxLanding(player, tile);
                break;
            case 'luck':
                this.handleLuckLanding(player);
                break;
            case 'fortune':
                this.handleFortuneLanding(player);
                break;
            case 'jail':
                ui.logActivity(`${player.name} is just visiting Jail.`, "info");
                this.finishLandingStep(player);
                break;
            case 'start':
                sounds.playChime();
                this.finishLandingStep(player);
                break;
            case 'corner': // Resort, Club
                if (tile.id === 9 && this.settings.resortJackpot && this.resortJackpotPot > 0) {
                    const pot = this.resortJackpotPot;
                    player.cash += pot;
                    this.resortJackpotPot = 0;
                    ui.updateResortPot(0, true);
                    sounds.playBuyFanfare();
                    ui.logActivity(`🎉 <b>${player.name}</b> landed on RESORT and WON THE JACKPOT OF ₹${pot.toLocaleString('en-IN')}!`, "success");
                } else {
                    sounds.playChime();
                }
                this.finishLandingStep(player);
                break;
        }
    }

    handleRealEstateLanding(player, tile) {
        const state = this.propertyState[tile.id];

        // 1. Unowned Property
        if (state.ownerId === null) {
            if (player.cash >= tile.price) {
                this.turnPhase = 'ACTION_REQUIRED';
                ui.setStatus(`<b><span style="color: ${player.color}">${player.name}</span></b>: Buy <b>${tile.name}</b> for \u20B9${tile.price.toLocaleString('en-IN')}?`);
                this.updateControlButtons(tile);
            } else {
                ui.logActivity(`${player.name} cannot afford ${tile.name} (\u20B9${tile.price.toLocaleString('en-IN')}).`, "warning");
                this.finishLandingStep(player);
            }
            return;
        }

        // 2. Owned by Active Player
        if (state.ownerId === player.id) {
            if (tile.type === 'property' && this.canBuildHouse(player, tile)) {
                this.turnPhase = 'ACTION_REQUIRED';
                ui.setStatus(`<b><span style="color: ${player.color}">${player.name}</span></b>: Upgrade <b>${tile.name}</b> with House for \u20B9${tile.houseCost.toLocaleString('en-IN')}?`);
                this.updateControlButtons(tile, true);
            } else {
                ui.logActivity(`${player.name} visits own property (${tile.name}).`, "info");
                this.finishLandingStep(player);
            }
            return;
        }

        // 3. Owned by an Opponent -> Pay Rent
        const owner = this.players.find(p => p.id === state.ownerId);
        if (owner && !owner.isBankrupt && !state.mortgaged) {
            if (!this.settings.rentInJail && owner.inJail) {
                ui.logActivity(`${owner.name} is in Jail and cannot collect rent on ${tile.name}!`, "warning");
            } else {
                const rent = this.calculateRent(tile, state);
                ui.logActivity(`${player.name} paid \u20B9${rent.toLocaleString('en-IN')} rent to ${owner.name}!`, "danger");
                sounds.playCash();
                this.transferCash(player, owner, rent);
            }
        }

        this.finishLandingStep(player);
    }

    calculateRent(tile, state) {
        if (tile.type === 'property') {
            if (state.hasHotel) {
                return tile.rentWithHotel;
            }
            if (state.houses > 0) {
                return tile.rentWithHouse[state.houses - 1];
            }
            // Unimproved: double rent if full color group owned
            const owner = this.players.find(p => p.id === state.ownerId);
            if (owner && this.ownsFullColorGroup(owner, tile.group)) {
                return tile.baseRent * 2;
            }
            return tile.baseRent;
        }

        if (tile.type === 'transport') {
            const owner = this.players.find(p => p.id === state.ownerId);
            const count = owner ? this.getOwnedTransportsCount(owner) : 1;
            return tile.tierRents[Math.min(count - 1, 3)];
        }

        if (tile.type === 'utility') {
            const owner = this.players.find(p => p.id === state.ownerId);
            const count = owner ? this.getOwnedUtilitiesCount(owner) : 1;
            const diceTotal = this.dice[0] + this.dice[1];
            const multiplier = count >= 2 ? tile.diceMultiplier[1] : tile.diceMultiplier[0];
            return diceTotal * multiplier;
        }

        return 0;
    }

    ownsFullColorGroup(player, group) {
        const groupTiles = BOARD_DATA.filter(t => t.group === group);
        return groupTiles.every(t => player.ownedProperties.includes(t.id));
    }

    canBuildHouse(player, tile) {
        if (!this.ownsFullColorGroup(player, tile.group)) return false;
        const state = this.propertyState[tile.id];
        if (state.hasHotel) return false;
        if (player.cash < tile.houseCost) return false;
        return true;
    }

    buyProperty(player, tile) {
        player.cash -= tile.price;
        this.creditBank(tile.price);
        player.ownedProperties.push(tile.id);
        this.propertyState[tile.id].ownerId = player.id;
        sounds.playBuyFanfare();
        ui.logActivity(`${player.name} bought <b>${tile.name}</b> for \u20B9${tile.price.toLocaleString('en-IN')}!`, "success");
        ui.renderOwnership(tile.id, player);
        ui.renderPlayers(this.players, this.activePlayerIdx);
    }

    buildHouse(player, tile) {
        const state = this.propertyState[tile.id];
        if (state.houses < 3) {
            player.cash -= tile.houseCost;
            this.creditBank(tile.houseCost);
            state.houses++;
            sounds.playBuild();
            ui.logActivity(`${player.name} built a House on <b>${tile.name}</b> (Total: ${state.houses})!`, "success");
        } else if (!state.hasHotel) {
            player.cash -= tile.hotelCost;
            this.creditBank(tile.hotelCost);
            state.hasHotel = true;
            sounds.playBuild();
            ui.logActivity(`${player.name} built a Grand HOTEL on <b>${tile.name}</b>!`, "success");
        }
        ui.renderBuildings(tile.id, state.houses, state.hasHotel);
        ui.renderPlayers(this.players, this.activePlayerIdx);
    }

    getOwnedTransportsCount(player) {
        return BOARD_DATA.filter(t => t.type === 'transport' && player.ownedProperties.includes(t.id)).length;
    }

    getOwnedUtilitiesCount(player) {
        return BOARD_DATA.filter(t => t.type === 'utility' && player.ownedProperties.includes(t.id)).length;
    }

    handleTaxLanding(player, tile) {
        sounds.playBuzzer();
        player.cash = Math.max(0, player.cash - tile.taxAmount);

        if (this.settings.resortJackpot) {
            this.resortJackpotPot += tile.taxAmount;
            ui.updateResortPot(this.resortJackpotPot, true);
            ui.logActivity(`${player.name} paid ${tile.name} penalty of \u20B9${tile.taxAmount.toLocaleString('en-IN')} into Resort Jackpot!`, "danger");
        } else {
            this.creditBank(tile.taxAmount);
            ui.logActivity(`${player.name} paid ${tile.name} penalty of \u20B9${tile.taxAmount.toLocaleString('en-IN')} to the Bank!`, "danger");
        }

        this.checkBankruptcy(player);
        this.finishLandingStep(player);
    }

    handleLuckLanding(player) {
        const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        const rule = LUCK_RULES[roll] || LUCK_RULES[7];
        ui.logActivity(`${player.name} landed on CHANCE (Box #${player.position}) - Rolled ${roll}!`, "warning");

        // Popup rule directly anchored on this particular Chance box
        ui.showTileCardPopup(player.position, "CHANCE", roll, rule, false, () => {
            this.executeCardRule(player, rule, "CHANCE", roll);
        });
    }

    handleFortuneLanding(player) {
        const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        const rule = FORTUNE_RULES[roll] || FORTUNE_RULES[7];
        ui.logActivity(`${player.name} landed on COMMUNITY CHEST (Box #${player.position}) - Rolled ${roll}!`, "warning");

        // Popup rule directly anchored on this particular Chest box
        ui.showTileCardPopup(player.position, "COMMUNITY CHEST", roll, rule, false, () => {
            this.executeCardRule(player, rule, "COMMUNITY CHEST", roll);
        });
    }

    executeCardRule(player, rule, type, rollVal) {
        sounds.playChime();

        switch (rule.action) {
            case 'bank_collect':
                player.cash += rule.amount;
                this.debitBank(rule.amount);
                break;
            case 'bank_pay':
                player.cash = Math.max(0, player.cash - rule.amount);
                if (this.settings.resortJackpot) {
                    this.resortJackpotPot += rule.amount;
                    ui.updateResortPot(this.resortJackpotPot, true);
                } else {
                    this.creditBank(rule.amount);
                }
                this.checkBankruptcy(player);
                break;
            case 'players_collect':
                this.players.forEach(p => {
                    if (p.id !== player.id && !p.isBankrupt) {
                        this.transferCash(p, player, rule.amount);
                    }
                });
                break;
            case 'target_collect':
                const target = this.players.find(p => p.id !== player.id && !p.isBankrupt);
                if (target) {
                    this.transferCash(target, player, rule.amount);
                }
                break;
            case 'repairs':
                let totalRepair = 0;
                player.ownedProperties.forEach(tId => {
                    const st = this.propertyState[tId];
                    if (st) {
                        if (st.hasHotel) totalRepair += rule.hotelCost;
                        else totalRepair += st.houses * rule.houseCost;
                    }
                });
                player.cash = Math.max(0, player.cash - totalRepair);
                this.creditBank(totalRepair);
                this.checkBankruptcy(player);
                break;
            case 'go_jail':
                this.sendToJail(player);
                break;
        }

        ui.renderPlayers(this.players, this.activePlayerIdx);
        this.finishLandingStep(player);
    }

    sendToJail(player) {
        player.position = 27; // Jail tile
        player.inJail = true;
        player.jailTurns = 0;
        sounds.playBuzzer();
        ui.updatePawnsOnBoard(this.players);
    }

    transferCash(from, to, amount) {
        const actual = Math.min(from.cash, amount);
        from.cash -= actual;
        to.cash += actual;
        this.checkBankruptcy(from);
        ui.renderPlayers(this.players, this.activePlayerIdx);
    }

    checkBankruptcy(player) {
        if (player.cash <= 0 && player.ownedProperties.length === 0) {
            player.isBankrupt = true;
            ui.logActivity(`\u2620 ${player.name} is BANKRUPT and eliminated from the game!`, "danger");
            sounds.playBuzzer();

            // Check if game won
            const activePlayers = this.players.filter(p => !p.isBankrupt);
            if (activePlayers.length === 1) {
                this.declareWinner(activePlayers[0], "by eliminating all opponents");
            }
        }
    }

    checkVictoryConditions() {
        if (this.settings.winCondition === 'wealth_50k') {
            const winner = this.players.find(p => !p.isBankrupt && p.calculateNetWorth() >= 50000);
            if (winner) {
                this.declareWinner(winner, "reached the ₹50,000 Net Worth milestone");
                return true;
            }
        } else if (this.settings.winCondition === 'wealth_100k') {
            const winner = this.players.find(p => !p.isBankrupt && p.calculateNetWorth() >= 100000);
            if (winner) {
                this.declareWinner(winner, "reached the ₹1,00,000 Net Worth milestone");
                return true;
            }
        } else if (this.settings.winCondition === 'rounds_30') {
            if (this.roundCount > (this.settings.maxRounds || 30)) {
                const active = [...this.players].filter(p => !p.isBankrupt);
                active.sort((a, b) => b.calculateNetWorth() - a.calculateNetWorth());
                if (active.length > 0) {
                    this.declareWinner(active[0], `achieved highest Net Worth (₹${active[0].calculateNetWorth().toLocaleString('en-IN')}) after ${this.settings.maxRounds || 30} rounds`);
                    return true;
                }
            }
        }
        return false;
    }

    declareWinner(winner, reason = "") {
        sounds.playBuyFanfare();
        const reasonText = reason ? ` (${reason})` : '';
        ui.setStatus(`\uD83C\uDFC6 <b>${winner.name} WINS BUSINESS INDIA!</b>${reasonText} \uD83C\uDFC6`);
        ui.logActivity(`\uD83C\uDFC6 <b>${winner.name}</b> has emerged as the ultimate Indian Business Tycoon!${reasonText}`, "success");
        alert(`${winner.name} has won the game!${reasonText} Congratulations!`);
    }

    finishLandingStep(player) {
        ui.renderPlayers(this.players, this.activePlayerIdx);
        if (this.checkVictoryConditions()) return;

        if (this.turnPhase !== 'ACTION_REQUIRED') {
            this.turnPhase = 'END_TURN';
            this.updateControlButtons();
        }
    }

    nextTurn() {
        // If rolled doubles and not in jail, player rolls again!
        if (this.dice[0] === this.dice[1] && !this.getCurrentPlayer().inJail && !this.getCurrentPlayer().isBankrupt) {
            ui.logActivity(`${this.getCurrentPlayer().name} rolled DOUBLES and gets another turn!`, "success");
            this.startTurn();
            return;
        }

        this.consecutiveDoubles = 0;
        let attempts = 0;
        do {
            this.activePlayerIdx = (this.activePlayerIdx + 1) % this.players.length;
            if (this.activePlayerIdx === 0) {
                this.roundCount++;
            }
            attempts++;
        } while (this.getCurrentPlayer().isBankrupt && attempts < this.players.length);

        if (this.checkVictoryConditions()) return;
        this.startTurn();
    }

    updateControlButtons(activeTile = null, isUpgrade = false) {
        const p = this.getCurrentPlayer();
        const btnRoll = document.getElementById('btn-roll');
        const btnBuy = document.getElementById('btn-buy');
        const btnEnd = document.getElementById('btn-end-turn');

        if (!btnRoll || !btnBuy || !btnEnd) return;

        if (this.turnPhase === 'READY_TO_ROLL') {
            btnRoll.disabled = false;
            btnRoll.innerHTML = `<i class="fa-solid fa-dice"></i> ${p.name}: Roll Dice`;
            btnBuy.style.display = 'none';
            btnEnd.disabled = true;
            btnEnd.innerHTML = `<i class="fa-solid fa-forward-step"></i> End Turn`;
            tvNav.setFocus(btnRoll, false);
        } else if (this.turnPhase === 'ROLLING') {
            btnRoll.disabled = true;
            btnBuy.style.display = 'none';
            btnEnd.disabled = true;
        } else if (this.turnPhase === 'ACTION_REQUIRED' && activeTile) {
            btnRoll.disabled = true;
            btnBuy.style.display = 'inline-flex';
            if (isUpgrade) {
                btnBuy.innerHTML = `<i class="fa-solid fa-house-chimney"></i> Build Upgrade (\u20B9${activeTile.houseCost.toLocaleString('en-IN')})`;
                btnBuy.onclick = () => {
                    this.buildHouse(p, activeTile);
                    this.turnPhase = 'END_TURN';
                    this.updateControlButtons();
                };
            } else {
                btnBuy.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Buy ${activeTile.name} (\u20B9${activeTile.price.toLocaleString('en-IN')})`;
                btnBuy.onclick = () => {
                    this.buyProperty(p, activeTile);
                    this.turnPhase = 'END_TURN';
                    this.updateControlButtons();
                };
            }
            btnEnd.disabled = false;
            btnEnd.innerHTML = `<i class="fa-solid fa-forward-step"></i> Pass / End Turn`;
            btnEnd.onclick = () => {
                this.turnPhase = 'END_TURN';
                this.nextTurn();
            };
            tvNav.setFocus(btnBuy, false);

            // Automated Bot AI choice
            if (p.isAI) {
                setTimeout(() => {
                    if (this.turnPhase !== 'ACTION_REQUIRED') return;
                    if (isUpgrade) {
                        if (p.cash >= activeTile.houseCost + 2000) {
                            btnBuy.click();
                        } else {
                            btnEnd.click();
                        }
                    } else {
                        if (p.cash >= activeTile.price + 1000) {
                            btnBuy.click();
                        } else {
                            btnEnd.click();
                        }
                    }
                }, 1200);
            }
        } else if (this.turnPhase === 'END_TURN') {
            btnRoll.disabled = true;
            btnBuy.style.display = 'none';
            btnEnd.disabled = false;
            btnEnd.innerHTML = `<i class="fa-solid fa-forward-step"></i> End Turn (${p.name})`;
            btnEnd.onclick = () => this.nextTurn();
            tvNav.setFocus(btnEnd, false);

            // Automated Bot AI End Turn
            if (p.isAI) {
                setTimeout(() => {
                    if (this.turnPhase === 'END_TURN') {
                        this.nextTurn();
                    }
                }, 800);
            }
        }
    }
}

const game = new BusinessGame();
