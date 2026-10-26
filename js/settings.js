// Business - Nava Vyapar (India Edition)
// Game Settings & Economic Configuration Controller

const DEFAULT_GAME_SETTINGS = {
    playerCount: 4,
    startingCash: 20000,
    bankTreasury: 200000, // In Rupees; Infinity for unlimited
    passGoSalary: 750,
    doubleGoLanding: true,
    resortJackpot: true,
    jailBailFee: 500,
    rentInJail: true,
    quickDealProps: 0, // 0 = standard, 2 = deal 2 starter properties
    winCondition: 'bankruptcy', // 'bankruptcy', 'wealth_50k', 'wealth_100k', 'rounds_30'
    maxRounds: 30,
    players: [
        { name: "Player 1", isAI: false },
        { name: "Player 2", isAI: false },
        { name: "Player 3", isAI: false },
        { name: "Player 4", isAI: false }
    ]
};

// Preset Profiles for instant setup
const SETTINGS_PRESETS = {
    casual: {
        playerCount: 3,
        startingCash: 10000,
        bankTreasury: 100000,
        passGoSalary: 500,
        doubleGoLanding: true,
        resortJackpot: true,
        jailBailFee: 250,
        rentInJail: true,
        quickDealProps: 2,
        winCondition: 'rounds_30',
        maxRounds: 25
    },
    classic: {
        playerCount: 4,
        startingCash: 15000,
        bankTreasury: 200000,
        passGoSalary: 750,
        doubleGoLanding: false,
        resortJackpot: false,
        jailBailFee: 500,
        rentInJail: true,
        quickDealProps: 0,
        winCondition: 'bankruptcy',
        maxRounds: 50
    },
    tycoon: {
        playerCount: 4,
        startingCash: 20000,
        bankTreasury: 500000,
        passGoSalary: 1000,
        doubleGoLanding: true,
        resortJackpot: true,
        jailBailFee: 500,
        rentInJail: true,
        quickDealProps: 0,
        winCondition: 'bankruptcy',
        maxRounds: 50
    },
    highroller: {
        playerCount: 4,
        startingCash: 30000,
        bankTreasury: Infinity,
        passGoSalary: 1500,
        doubleGoLanding: true,
        resortJackpot: true,
        jailBailFee: 1000,
        rentInJail: false,
        quickDealProps: 2,
        winCondition: 'wealth_100k',
        maxRounds: 50
    }
};

class SettingsManager {
    constructor() {
        this.current = JSON.parse(JSON.stringify(DEFAULT_GAME_SETTINGS));
        this.activePreset = 'tycoon';
        this.modalEl = null;
    }

    init() {
        this.modalEl = document.getElementById('modal-settings');
        if (!this.modalEl) return;

        this.bindEvents();
        this.syncUIWithState();
    }

    open() {
        if (!this.modalEl) this.modalEl = document.getElementById('modal-settings');
        if (!this.modalEl) return;
        this.syncUIWithState();
        tvNav.openModal(this.modalEl);
    }

    close() {
        if (this.modalEl) tvNav.closeModal(this.modalEl);
    }

    applyPreset(presetKey) {
        const preset = SETTINGS_PRESETS[presetKey];
        if (!preset) return;

        this.activePreset = presetKey;
        this.current.playerCount = preset.playerCount;
        this.current.startingCash = preset.startingCash;
        this.current.bankTreasury = preset.bankTreasury;
        this.current.passGoSalary = preset.passGoSalary;
        this.current.doubleGoLanding = preset.doubleGoLanding;
        this.current.resortJackpot = preset.resortJackpot;
        this.current.jailBailFee = preset.jailBailFee;
        this.current.rentInJail = preset.rentInJail;
        this.current.quickDealProps = preset.quickDealProps;
        this.current.winCondition = preset.winCondition;
        this.current.maxRounds = preset.maxRounds || 30;

        this.syncUIWithState();
        if (typeof sounds !== 'undefined') sounds.playChime();
    }

    resetDefaults() {
        this.current = JSON.parse(JSON.stringify(DEFAULT_GAME_SETTINGS));
        this.activePreset = 'tycoon';
        this.syncUIWithState();
        if (typeof sounds !== 'undefined') sounds.playBuyFanfare();
    }

    bindEvents() {
        // Preset Buttons
        const presetBtns = {
            'preset-casual': 'casual',
            'preset-classic': 'classic',
            'preset-tycoon': 'tycoon',
            'preset-highroller': 'highroller'
        };
        Object.entries(presetBtns).forEach(([btnId, presetKey]) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.onclick = () => this.applyPreset(presetKey);
            }
        });

        // Player Count Segmented Buttons
        const pCountGroup = document.getElementById('group-player-count');
        if (pCountGroup) {
            pCountGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    const count = parseInt(btn.dataset.count, 10);
                    this.current.playerCount = count;
                    this.renderRosterRows();
                    this.updateChoiceGroup('group-player-count', btn);
                };
            });
        }

        // Stepper for Starting Cash (- / + ₹2,500)
        const btnCashMinus = document.getElementById('btn-cash-minus');
        const btnCashPlus = document.getElementById('btn-cash-plus');
        if (btnCashMinus) {
            btnCashMinus.onclick = () => {
                this.current.startingCash = Math.max(5000, this.current.startingCash - 2500);
                this.updateCashDisplay();
            };
        }
        if (btnCashPlus) {
            btnCashPlus.onclick = () => {
                this.current.startingCash = Math.min(100000, this.current.startingCash + 2500);
                this.updateCashDisplay();
            };
        }

        // Quick Cash Chips
        const cashGroup = document.getElementById('group-starting-cash');
        if (cashGroup) {
            cashGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    this.current.startingCash = parseInt(btn.dataset.val, 10);
                    this.updateCashDisplay();
                };
            });
        }

        // Bank Treasury Choices
        const bankGroup = document.getElementById('group-bank-treasury');
        if (bankGroup) {
            bankGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    const val = btn.dataset.val === 'Infinity' ? Infinity : parseInt(btn.dataset.val, 10);
                    this.current.bankTreasury = val;
                    this.updateChoiceGroup('group-bank-treasury', btn);
                    this.updateBankDisplay();
                };
            });
        }

        // Pass GO Salary Choices
        const goGroup = document.getElementById('group-pass-go');
        if (goGroup) {
            goGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    this.current.passGoSalary = parseInt(btn.dataset.val, 10);
                    this.updateChoiceGroup('group-pass-go', btn);
                    const disp = document.getElementById('disp-pass-go');
                    if (disp) disp.textContent = `₹${this.current.passGoSalary.toLocaleString('en-IN')}`;
                };
            });
        }

        // Checkboxes: Double GO, Resort Jackpot, Rent in Jail, Quick Deal
        const chkDoubleGo = document.getElementById('check-double-go');
        if (chkDoubleGo) {
            chkDoubleGo.onchange = () => { this.current.doubleGoLanding = chkDoubleGo.checked; };
        }
        const chkResort = document.getElementById('check-resort-jackpot');
        if (chkResort) {
            chkResort.onchange = () => { this.current.resortJackpot = chkResort.checked; };
        }
        const chkRentInJail = document.getElementById('check-rent-in-jail');
        if (chkRentInJail) {
            chkRentInJail.onchange = () => { this.current.rentInJail = chkRentInJail.checked; };
        }
        const chkQuickDeal = document.getElementById('check-quick-deal');
        if (chkQuickDeal) {
            chkQuickDeal.onchange = () => { this.current.quickDealProps = chkQuickDeal.checked ? 2 : 0; };
        }

        // Jail Bail Fee
        const bailGroup = document.getElementById('group-jail-bail');
        if (bailGroup) {
            bailGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    this.current.jailBailFee = parseInt(btn.dataset.val, 10);
                    this.updateChoiceGroup('group-jail-bail', btn);
                };
            });
        }

        // Win Condition
        const winGroup = document.getElementById('group-win-condition');
        if (winGroup) {
            winGroup.querySelectorAll('.btn-choice').forEach(btn => {
                btn.onclick = () => {
                    this.current.winCondition = btn.dataset.val;
                    this.updateChoiceGroup('group-win-condition', btn);
                };
            });
        }

        // Reset Defaults
        const btnReset = document.getElementById('btn-reset-settings');
        if (btnReset) {
            btnReset.onclick = () => this.resetDefaults();
        }

        // Launch Game With Custom Settings
        const btnStart = document.getElementById('btn-apply-start-game');
        if (btnStart) {
            btnStart.onclick = () => {
                this.collectRosterNames();
                this.close();
                game.initWithSettings(this.current);
            };
        }
    }

    updateChoiceGroup(groupId, activeBtn) {
        const group = document.getElementById(groupId);
        if (!group) return;
        group.querySelectorAll('.btn-choice').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    updateCashDisplay() {
        const disp = document.getElementById('disp-starting-cash');
        if (disp) {
            disp.textContent = `₹${this.current.startingCash.toLocaleString('en-IN')}`;
        }
        const cashGroup = document.getElementById('group-starting-cash');
        if (cashGroup) {
            cashGroup.querySelectorAll('.btn-choice').forEach(btn => {
                const val = parseInt(btn.dataset.val, 10);
                if (val === this.current.startingCash) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    updateBankDisplay() {
        const disp = document.getElementById('disp-bank-treasury');
        if (disp) {
            if (this.current.bankTreasury === Infinity) {
                disp.textContent = 'Unlimited (∞)';
            } else {
                disp.textContent = `₹${this.current.bankTreasury.toLocaleString('en-IN')}`;
            }
        }
    }

    syncUIWithState() {
        // Highlight active preset pill
        ['preset-casual', 'preset-classic', 'preset-tycoon', 'preset-highroller'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('active');
        });
        const activePresetBtn = document.getElementById(`preset-${this.activePreset}`);
        if (activePresetBtn) activePresetBtn.classList.add('active');

        // Player Count
        const pCountGroup = document.getElementById('group-player-count');
        if (pCountGroup) {
            pCountGroup.querySelectorAll('.btn-choice').forEach(btn => {
                if (parseInt(btn.dataset.count, 10) === this.current.playerCount) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        this.renderRosterRows();
        this.updateCashDisplay();
        this.updateBankDisplay();

        // Bank Group
        const bankGroup = document.getElementById('group-bank-treasury');
        if (bankGroup) {
            bankGroup.querySelectorAll('.btn-choice').forEach(btn => {
                const v = btn.dataset.val === 'Infinity' ? Infinity : parseInt(btn.dataset.val, 10);
                if (v === this.current.bankTreasury) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }

        // Pass GO Salary
        const goGroup = document.getElementById('group-pass-go');
        if (goGroup) {
            goGroup.querySelectorAll('.btn-choice').forEach(btn => {
                if (parseInt(btn.dataset.val, 10) === this.current.passGoSalary) btn.classList.add('active');
                else btn.classList.remove('active');
            });
            const disp = document.getElementById('disp-pass-go');
            if (disp) disp.textContent = `₹${this.current.passGoSalary.toLocaleString('en-IN')}`;
        }

        // Checkboxes
        const chkDoubleGo = document.getElementById('check-double-go');
        if (chkDoubleGo) chkDoubleGo.checked = !!this.current.doubleGoLanding;

        const chkResort = document.getElementById('check-resort-jackpot');
        if (chkResort) chkResort.checked = !!this.current.resortJackpot;

        const chkRentInJail = document.getElementById('check-rent-in-jail');
        if (chkRentInJail) chkRentInJail.checked = !!this.current.rentInJail;

        const chkQuickDeal = document.getElementById('check-quick-deal');
        if (chkQuickDeal) chkQuickDeal.checked = (this.current.quickDealProps > 0);

        // Bail Group
        const bailGroup = document.getElementById('group-jail-bail');
        if (bailGroup) {
            bailGroup.querySelectorAll('.btn-choice').forEach(btn => {
                if (parseInt(btn.dataset.val, 10) === this.current.jailBailFee) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }

        // Win Condition Group
        const winGroup = document.getElementById('group-win-condition');
        if (winGroup) {
            winGroup.querySelectorAll('.btn-choice').forEach(btn => {
                if (btn.dataset.val === this.current.winCondition) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
    }

    renderRosterRows() {
        const container = document.getElementById('settings-roster-list');
        if (!container) return;
        container.innerHTML = '';

        const colors = ['#e53935', '#1e88e5', '#43a047', '#fdd835'];
        const gotiClasses = ['goti-p0', 'goti-p1', 'goti-p2', 'goti-p3'];

        for (let i = 0; i < 4; i++) {
            const isIncluded = i < this.current.playerCount;
            const pConfig = this.current.players[i] || { name: `Player ${i + 1}`, isAI: false };

            const row = document.createElement('div');
            row.className = `roster-player-row ${isIncluded ? 'active' : 'disabled'}`;
            row.id = `roster-row-${i}`;

            row.innerHTML = `
                <div class="roster-avatar-box">
                    <div class="player-hud-goti ${gotiClasses[i]}">
                        <div class="mini-goti-inner"></div>
                    </div>
                    <span class="roster-p-badge" style="background: ${colors[i]};">P${i + 1}</span>
                </div>
                <input type="text" class="roster-name-input tv-focusable" id="input-pname-${i}" 
                       value="${pConfig.name}" maxlength="16" placeholder="Player ${i + 1} Name"
                       ${!isIncluded ? 'disabled' : ''} />
                <button type="button" class="btn-role-toggle tv-focusable ${pConfig.isAI ? 'role-bot' : 'role-human'}" 
                        id="btn-role-p${i}" ${!isIncluded ? 'disabled' : ''}>
                    ${pConfig.isAI ? '<i class="fa-solid fa-robot"></i> Bot AI' : '<i class="fa-solid fa-user"></i> Human'}
                </button>
            `;

            container.appendChild(row);

            // Bind Bot/Human toggle
            const roleBtn = row.querySelector(`#btn-role-p${i}`);
            if (roleBtn) {
                roleBtn.onclick = () => {
                    pConfig.isAI = !pConfig.isAI;
                    roleBtn.className = `btn-role-toggle tv-focusable ${pConfig.isAI ? 'role-bot' : 'role-human'}`;
                    roleBtn.innerHTML = pConfig.isAI ? '<i class="fa-solid fa-robot"></i> Bot AI' : '<i class="fa-solid fa-user"></i> Human';
                    if (typeof sounds !== 'undefined') sounds.playFocusBlip();
                };
            }
        }
    }

    collectRosterNames() {
        for (let i = 0; i < this.current.playerCount; i++) {
            const inp = document.getElementById(`input-pname-${i}`);
            if (inp && inp.value.trim()) {
                this.current.players[i].name = inp.value.trim();
            }
        }
    }
}

const settingsMgr = new SettingsManager();
