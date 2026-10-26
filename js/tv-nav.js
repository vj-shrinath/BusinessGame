// webOS TV Remote & Spatial Navigation Controller

class TVNavigator {
    constructor() {
        this.currentFocusIndex = 0;
        this.focusableElements = [];
        this.activeModal = null;

        // webOS Remote Keycodes
        this.KEYS = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            ENTER: 13,
            BACK_WEBOS: 461,
            ESCAPE: 27,
            BACKSPACE: 8,
            RED: 403,
            GREEN: 404,
            YELLOW: 405,
            BLUE: 406
        };

        this.initListeners();
    }

    initListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // When using magic remote pointer, update focus seamlessly
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('.tv-focusable, button:not(:disabled)');
            if (target && !target.classList.contains('tv-focused')) {
                this.setFocus(target, false);
            }
        });
    }

    refreshFocusables() {
        // If modal is open, scope focus within modal
        const scope = this.activeModal || document;
        const selector = '.tv-focusable:not([disabled]):not([style*="display: none"]), button:not([disabled]):not([style*="display: none"])';
        this.focusableElements = Array.from(scope.querySelectorAll(selector))
            .filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
            });

        // Ensure currently focused element is valid
        const current = document.querySelector('.tv-focused');
        if (!current || !this.focusableElements.includes(current)) {
            if (this.focusableElements.length > 0) {
                this.setFocus(this.focusableElements[0], false);
            }
        }
    }

    setFocus(element, playAudio = true) {
        if (!element) return;
        document.querySelectorAll('.tv-focused').forEach(el => el.classList.remove('tv-focused'));
        element.classList.add('tv-focused');
        element.focus();
        if (playAudio && typeof sounds !== 'undefined') {
            sounds.playFocusBlip();
        }
        // Auto scroll into view if on TV
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }

    handleKeyDown(e) {
        const key = e.keyCode;

        // webOS back button or Escape
        if (key === this.KEYS.BACK_WEBOS || key === this.KEYS.ESCAPE) {
            e.preventDefault();
            this.handleBack();
            return;
        }

        // Color keys quick shortcuts & PC Keyboard shortcuts (R: Roll, B: Buy, E: End Turn, F: Fullscreen, Space)
        if (key === this.KEYS.RED || e.key === 'r' || e.key === 'R' || (e.key === ' ' && !this.activeModal)) {
            const btnRoll = document.getElementById('btn-roll');
            if (btnRoll && !btnRoll.disabled && btnRoll.offsetParent !== null && typeof game !== 'undefined' && game.turnPhase === 'READY_TO_ROLL') {
                e.preventDefault();
                btnRoll.click();
                return;
            }
        }
        if (key === this.KEYS.GREEN || e.key === 'b' || e.key === 'B') {
            const btnBuy = document.getElementById('btn-buy');
            if (btnBuy && !btnBuy.disabled && btnBuy.offsetParent !== null) {
                e.preventDefault();
                btnBuy.click();
                return;
            }
        }
        if (key === this.KEYS.YELLOW || e.key === 'e' || e.key === 'E') {
            const btnEnd = document.getElementById('btn-end-turn');
            if (btnEnd && !btnEnd.disabled && btnEnd.offsetParent !== null) {
                e.preventDefault();
                btnEnd.click();
                return;
            }
        }
        if (key === this.KEYS.BLUE || e.key === 'f' || e.key === 'F') {
            const btnFs = document.getElementById('btn-fullscreen');
            if (btnFs) {
                e.preventDefault();
                btnFs.click();
                return;
            }
        }

        // Arrow navigation
        if ([this.KEYS.LEFT, this.KEYS.UP, this.KEYS.RIGHT, this.KEYS.DOWN].includes(key)) {
            e.preventDefault();
            this.navigateSpatial(key);
            return;
        }

        // OK / Enter
        if (key === this.KEYS.ENTER) {
            const focused = document.querySelector('.tv-focused');
            if (focused) {
                e.preventDefault();
                focused.click();
            }
            return;
        }
    }

    navigateSpatial(directionKey) {
        this.refreshFocusables();
        if (this.focusableElements.length === 0) return;

        const current = document.querySelector('.tv-focused') || this.focusableElements[0];
        const currentRect = current.getBoundingClientRect();
        const currentCenter = {
            x: currentRect.left + currentRect.width / 2,
            y: currentRect.top + currentRect.height / 2
        };

        let bestCandidate = null;
        let minDistance = Infinity;

        for (const candidate of this.focusableElements) {
            if (candidate === current) continue;
            const cRect = candidate.getBoundingClientRect();
            const cCenter = {
                x: cRect.left + cRect.width / 2,
                y: cRect.top + cRect.height / 2
            };

            const dx = cCenter.x - currentCenter.x;
            const dy = cCenter.y - currentCenter.y;

            let isDirectionMatch = false;
            let primaryDist = 0;
            let secondaryDist = 0;

            if (directionKey === this.KEYS.RIGHT && dx > 8) {
                isDirectionMatch = true;
                primaryDist = dx;
                secondaryDist = Math.abs(dy);
            } else if (directionKey === this.KEYS.LEFT && dx < -8) {
                isDirectionMatch = true;
                primaryDist = Math.abs(dx);
                secondaryDist = Math.abs(dy);
            } else if (directionKey === this.KEYS.DOWN && dy > 8) {
                isDirectionMatch = true;
                primaryDist = dy;
                secondaryDist = Math.abs(dx);
            } else if (directionKey === this.KEYS.UP && dy < -8) {
                isDirectionMatch = true;
                primaryDist = Math.abs(dy);
                secondaryDist = Math.abs(dx);
            }

            if (isDirectionMatch) {
                // Weight distance in perpendicular axis to favor straight movement
                const dist = primaryDist + secondaryDist * 2.2;
                if (dist < minDistance) {
                    minDistance = dist;
                    bestCandidate = candidate;
                }
            }
        }

        if (bestCandidate) {
            this.setFocus(bestCandidate);
        } else {
            // Fallback cycling if geometric navigation reaches edge
            let idx = this.focusableElements.indexOf(current);
            if (directionKey === this.KEYS.RIGHT || directionKey === this.KEYS.DOWN) {
                idx = (idx + 1) % this.focusableElements.length;
            } else {
                idx = (idx - 1 + this.focusableElements.length) % this.focusableElements.length;
            }
            this.setFocus(this.focusableElements[idx]);
        }
    }

    handleBack() {
        if (this.activeModal) {
            const closeBtn = this.activeModal.querySelector('.btn-close-modal, .btn-cancel');
            if (closeBtn) {
                closeBtn.click();
            } else {
                this.closeModal(this.activeModal);
            }
        }
    }

    openModal(modalElement) {
        this.activeModal = modalElement;
        modalElement.classList.add('active');
        setTimeout(() => {
            this.refreshFocusables();
            const firstAction = modalElement.querySelector('.tv-focusable, button:not([disabled])');
            if (firstAction) this.setFocus(firstAction, false);
        }, 80);
    }

    closeModal(modalElement) {
        if (modalElement) modalElement.classList.remove('active');
        this.activeModal = null;
        setTimeout(() => {
            this.refreshFocusables();
            const btnRoll = document.getElementById('btn-roll');
            if (btnRoll) this.setFocus(btnRoll, false);
        }, 80);
    }
}

const tvNav = new TVNavigator();
