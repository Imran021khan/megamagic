/**
 * MegaCalc Pro - Core Application Engine (Vanilla JS)
 */
import './index.css';
import { translations } from './data/translations.js';
import { calculators, calculatorCategories } from './data/calculators.js';

class MegaCalcApp {
    constructor() {
        this.lang = localStorage.getItem('mc_lang') || 'en';
        this.theme = localStorage.getItem('mc_theme') || 'light';
        this.currentRoute = this.getRoute();
        this.history = JSON.parse(localStorage.getItem('mc_history') || '[]');
        
        console.log('MegaCalc Pro Initialized');
        this.init();
    }

    init() {
        this.applyTheme();
        this.render();
        window.addEventListener('popstate', () => {
            this.currentRoute = this.getRoute();
            this.render();
        });
        
        // Global click listener for routing
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-link]');
            if (link) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('href'));
            }
        });
    }

    getRoute() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return { type: 'home' };
        const slug = path.replace('/', '');
        const calc = calculators.find(c => c.slug === slug);
        if (calc) return { type: 'calculator', data: calc };
        return { type: '404' };
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.currentRoute = this.getRoute();
        this.render();
        window.scrollTo(0, 0);
    }

    toggleLang() {
        this.lang = this.lang === 'en' ? 'hi' : 'en';
        localStorage.setItem('mc_lang', this.lang);
        this.render();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('mc_theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    t(key) {
        const keys = key.split('.');
        let val = translations[this.lang];
        for (const k of keys) {
            val = val[k];
            if (!val) return key;
        }
        return val;
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            ${this.renderNavbar()}
            <main class="min-h-screen pb-20">
                ${this.renderContent()}
            </main>
            ${this.renderFooter()}
            <div id="toast-container" class="fixed bottom-4 right-4 z-50"></div>
        `;
        
        this.attachEvents();
    }

    renderNavbar() {
        return `
            <nav class="glass-nav">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16 items-center">
                        <a href="/" data-link class="flex items-center group">
                            <div class="w-10 h-10 blue-gradient rounded-xl flex items-center justify-center text-white mr-3 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                            </div>
                            <span class="text-xl font-bold tracking-tight">${this.t('siteName')}</span>
                        </a>
                        
                        <div class="flex items-center space-x-2">
                            <button id="lang-toggle" class="btn-ghost text-sm font-medium">
                                ${this.lang === 'en' ? this.t('ui.hindi') : this.t('ui.english')}
                            </button>
                            <button id="theme-toggle" class="btn-ghost">
                                ${this.theme === 'light' ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    renderContent() {
        if (this.currentRoute.type === 'home') return this.renderHome();
        if (this.currentRoute.type === 'calculator') return this.renderCalculatorPage(this.currentRoute.data);
        return `<div class="text-center py-20"><h1 class="text-4xl font-bold">404</h1><p>Page Not Found</p></div>`;
    }

    renderHome() {
        return `
            <header class="blue-gradient py-24 px-4 text-center text-white relative overflow-hidden">
                <div class="max-w-4xl mx-auto relative z-10 animate-fade-in">
                    <h1 class="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">${this.t('heroTitle')}</h1>
                    <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">${this.t('heroSubtitle')}</p>
                    
                    <div class="max-w-xl mx-auto relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <input type="text" id="main-search" placeholder="${this.t('searchPlaceholder')}" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-slate-900 shadow-2xl outline-hidden focus:ring-4 focus:ring-blue-500/20 transition-all">
                    </div>
                </div>
            </header>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                ${calculatorCategories.map(cat => `
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold mb-6 flex items-center">
                            <span class="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center text-white mr-3">
                                ${this.getIcon(cat.icon)}
                            </span>
                            ${this.t('categories.' + cat.id)}
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            ${calculators.filter(c => c.category === cat.id).map(c => `
                                <a href="/${c.slug}" data-link class="card-base hover:-translate-y-1 hover:shadow-xl group">
                                    <h3 class="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">${c.name[this.lang]}</h3>
                                    <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">${c.description[this.lang]}</p>
                                    <div class="flex items-center text-blue-600 text-sm font-bold">
                                        Use Tool <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </section>
        `;
    }

    renderCalculatorPage(calc) {
        return `
            <div class="max-w-5xl mx-auto px-4 pt-12">
                <nav class="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <a href="/" data-link class="hover:text-blue-600">Home</a>
                    <span class="mx-2">/</span>
                    <span class="text-slate-900 dark:text-white">${calc.name[this.lang]}</span>
                </nav>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-8">
                        <div class="card-base">
                            <h1 class="text-3xl font-bold mb-4">${calc.name[this.lang]}</h1>
                            <p class="text-slate-600 dark:text-slate-400 mb-8">${calc.description[this.lang]}</p>
                            
                            <div id="calculator-ui" class="space-y-6">
                                ${this.renderCalculatorInputs(calc)}
                                ${calc.customUI ? '' : `
                                    <div class="flex gap-3">
                                        <button id="calc-btn" class="btn-primary flex-1">${this.t('ui.calculate')}</button>
                                        <button id="clear-btn" class="btn-ghost border border-slate-200 dark:border-slate-700 px-6">${this.t('ui.clear')}</button>
                                    </div>
                                `}
                            </div>

                            <div id="result-container" class="mt-10 hidden animate-fade-in">
                                <!-- Results will be injected here -->
                            </div>
                        </div>

                        <div class="card-base">
                            <h2 class="text-xl font-bold mb-4">${this.t('ui.formula')}</h2>
                            <div class="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                                <p>This calculator uses standard mathematical formulas to provide accurate results. For example, the EMI calculation uses the formula: [P x R x (1+R)^N]/[(1+R)^N-1].</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="card-base">
                            <h3 class="font-bold mb-4">${this.t('ui.history')}</h3>
                            <div id="history-list" class="space-y-3 text-sm">
                                ${this.history.length ? this.history.map(h => `
                                    <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                        <p class="font-bold">${h.name}</p>
                                        <p class="text-xs text-slate-400">${h.time}</p>
                                    </div>
                                `).join('') : '<p class="text-slate-400">No recent calculations</p>'}
                            </div>
                        </div>
                        
                        <div class="card-base">
                            <h3 class="font-bold mb-4">${this.t('ui.related')}</h3>
                            <div class="space-y-3">
                                ${calculators.filter(c => c.category === calc.category && c.id !== calc.id).slice(0, 5).map(c => `
                                    <a href="/${c.slug}" data-link class="block text-sm text-blue-600 hover:underline">${c.name[this.lang]}</a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCalculatorInputs(calc) {
        if (calc.customUI && calc.id === 'scientific-calculator') return this.renderScientificUI();
        if (calc.customUI) return `<div id="custom-calc-ui"></div>`;
        return calc.inputs.map(input => `
            <div>
                <label class="block text-sm font-semibold mb-2">${input.label[this.lang]}</label>
                ${input.type === 'select' ? `
                    <select id="input-${input.id}" class="input-base">
                        ${input.options.map(opt => `<option value="${opt}" ${opt === input.default ? 'selected' : ''}>${opt}%</option>`).join('')}
                    </select>
                ` : input.type === 'radio' ? `
                    <div class="flex gap-4">
                        ${input.options.map(opt => `
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="input-${input.id}" value="${opt.v}" ${opt.v === input.default ? 'checked' : ''} class="mr-2">
                                <span class="text-sm">${opt.l[this.lang]}</span>
                            </label>
                        `).join('')}
                    </div>
                ` : `
                    <input type="${input.type}" id="input-${input.id}" value="${input.default}" class="input-base">
                `}
            </div>
        `).join('');
    }

    renderScientificUI() {
        return `
            <div class="bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-md mx-auto border border-slate-800 font-mono">
                <div class="bg-slate-800 p-4 rounded-xl mb-6 text-right">
                    <div id="sci-history" class="text-slate-500 text-xs h-4 mb-1 overflow-hidden"></div>
                    <div id="sci-display" class="text-white text-3xl font-bold overflow-hidden">0</div>
                </div>
                
                <div class="grid grid-cols-4 gap-2">
                    ${['sin', 'cos', 'tan', 'sqrt'].map(f => `<button class="sci-btn p-3 bg-slate-800 text-blue-400 rounded-lg font-semibold hover:bg-slate-700 transition-colors" data-func="${f}">${f}</button>`).join('')}
                    ${['log', 'ln', '(', ')'].map(f => `<button class="sci-btn p-3 bg-slate-800 text-blue-400 rounded-lg font-semibold hover:bg-slate-700 transition-colors" data-val="${f}">${f}</button>`).join('')}
                    ${['7', '8', '9', '/'].map(f => `<button class="sci-btn p-4 rounded-lg font-bold text-xl transition-colors ${f === '/' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}" data-val="${f}">${f}</button>`).join('')}
                    ${['4', '5', '6', '*'].map(f => `<button class="sci-btn p-4 rounded-lg font-bold text-xl transition-colors ${f === '*' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}" data-val="${f}">${f}</button>`).join('')}
                    ${['1', '2', '3', '-'].map(f => `<button class="sci-btn p-4 rounded-lg font-bold text-xl transition-colors ${f === '-' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}" data-val="${f}">${f}</button>`).join('')}
                    ${['0', '.', '=', '+'].map(f => `<button class="sci-btn p-4 rounded-lg font-bold text-xl transition-colors ${f === '+' || f === '=' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}" data-val="${f}">${f}</button>`).join('')}
                    <button class="col-span-2 p-4 bg-red-500/10 text-red-500 rounded-lg font-bold hover:bg-red-500/20 transition-colors" data-action="clear">CLEAR</button>
                    <button class="col-span-2 p-4 bg-slate-800 text-slate-400 rounded-lg font-bold hover:bg-slate-700 transition-colors" data-action="del">DEL</button>
                </div>
            </div>
        `;
    }

    attachEvents() {
        document.getElementById('lang-toggle')?.addEventListener('click', () => this.toggleLang());
        document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());
        
        if (this.currentRoute.type === 'calculator') {
            if (this.currentRoute.data.id === 'scientific-calculator') {
                this.attachScientificEvents();
            } else {
                document.getElementById('calc-btn')?.addEventListener('click', () => this.handleCalculate());
                document.getElementById('clear-btn')?.addEventListener('click', () => this.handleClear());
            }
        }

        document.getElementById('main-search')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    handleSearch(query) {
        const results = calculators.filter(c => 
            c.name[this.lang].toLowerCase().includes(query.toLowerCase()) ||
            c.description[this.lang].toLowerCase().includes(query.toLowerCase())
        );
        
        const container = document.querySelector('section.max-w-7xl');
        if (!container) return;

        if (query.trim() === '') {
            this.render(); // Reset to category view
            return;
        }

        container.innerHTML = `
            <div class="mb-12">
                <h2 class="text-2xl font-bold mb-6">Search Results for "${query}"</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${results.map(c => `
                        <a href="/${c.slug}" data-link class="card-base hover:-translate-y-1 hover:shadow-xl group">
                            <h3 class="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">${c.name[this.lang]}</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">${c.description[this.lang]}</p>
                            <div class="flex items-center text-blue-600 text-sm font-bold">
                                Use Tool <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </a>
                    `).join('')}
                    ${results.length === 0 ? '<p class="col-span-full text-center py-10 text-slate-400">No calculators found matching your search.</p>' : ''}
                </div>
            </div>
        `;
    }

    handleCalculate() {
        const calc = this.currentRoute.data;
        const vals = {};
        calc.inputs.forEach(input => {
            let val;
            if (input.type === 'radio') {
                val = document.querySelector(`input[name="input-${input.id}"]:checked`)?.value;
            } else {
                const el = document.getElementById(`input-${input.id}`);
                val = el.value;
            }
            
            // Convert to number if it looks like one or is a numeric type
            if (input.type === 'number' || (input.type === 'select' && !isNaN(val))) {
                vals[input.id] = parseFloat(val);
            } else {
                vals[input.id] = val;
            }
        });

        const results = calc.calculate(vals);
        this.renderResults(results);
        this.saveHistory(calc.name[this.lang], results);
    }

    renderResults(results) {
        const container = document.getElementById('result-container');
        container.classList.remove('hidden');
        
        let html = `<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">`;
        html += `<h3 class="text-lg font-bold mb-4 text-blue-900 dark:text-blue-300">Results</h3>`;
        html += `<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">`;
        
        for (const [key, val] of Object.entries(results)) {
            const displayVal = typeof val === 'number' ? val.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : val;
            html += `
                <div>
                    <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">${key.replace(/([A-Z])/g, ' $1')}</p>
                    <p class="text-2xl font-bold text-slate-900 dark:text-white">${displayVal}</p>
                </div>
            `;
        }
        
        html += `</div></div>`;
        container.innerHTML = html;
    }

    saveHistory(name, results) {
        const entry = { name, time: new Date().toLocaleTimeString(), results };
        this.history = [entry, ...this.history.slice(0, 4)];
        localStorage.setItem('mc_history', JSON.stringify(this.history));
        // Update history UI if needed
    }

    handleClear() {
        this.currentRoute.data.inputs.forEach(input => {
            const el = document.getElementById(`input-${input.id}`);
            if (el) el.value = input.default;
        });
        document.getElementById('result-container').classList.add('hidden');
    }

    getIcon(name) {
        // Simple SVG map
        const icons = {
            Wallet: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>',
            Activity: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
            Divide: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="18" r="2"/></svg>',
            Clock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
            Cpu: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>'
        };
        return icons[name] || '';
    }

    renderFooter() {
        return `
            <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="col-span-1 md:col-span-2">
                            <div class="flex items-center mb-4">
                                <div class="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center text-white mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                                </div>
                                <span class="text-lg font-bold">${this.t('siteName')}</span>
                            </div>
                            <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                                ${this.t('heroSubtitle')}
                            </p>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">${this.t('ui.about')}</h4>
                            <ul class="space-y-2 text-sm">
                                <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600">${this.t('ui.about')}</a></li>
                                <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600">${this.t('ui.contact')}</a></li>
                                <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600">${this.t('ui.privacy')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Categories</h4>
                            <ul class="space-y-2 text-sm">
                                ${calculatorCategories.map(cat => `
                                    <li><a href="/" data-link class="text-slate-600 dark:text-slate-400 hover:text-blue-600">${this.t('categories.' + cat.id)}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 text-center text-slate-400 text-xs">
                        &copy; ${new Date().getFullYear()} MegaCalc Pro. All rights reserved. Made for India.
                    </div>
                </div>
            </footer>
        `;
    }
}

// Start the app
new MegaCalcApp();
