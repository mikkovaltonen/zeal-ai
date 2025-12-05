/**
 * Zeal AI Limited Portfolio - Main TypeScript
 * Interactive features for the homepage
 */

interface Product {
    name: string;
    rating?: number;
    reviews?: number;
}

/**
 * Card Deck Animation - 3D Flip Shuffle Effect
 * Animates cards: expanded -> stacked -> shuffled -> expanded (new order)
 */
class CardDeckAnimation {
    private deck: HTMLElement | null;
    private cards: HTMLElement[];
    private isAnimating = false;
    private isVisible = false;
    private intervalId: number | null = null;
    private initialTimeoutId: number | null = null;
    private readonly TIMING = {
        INITIAL_DELAY: 20000,    // Wait 20 seconds before first animation
        REPEAT_INTERVAL: 30000,  // Repeat every 30 seconds
        STACK_DURATION: 2000,    // Time to stack cards (slower)
        SHUFFLE_DURATION: 4000,  // Time for 3D flip animation (much slower)
        SHUFFLED_PAUSE: 500,     // Pause after shuffle
        EXPAND_DURATION: 2500,   // Time to expand back (slower)
    };

    constructor() {
        this.deck = document.querySelector('.card-deck');
        this.cards = Array.from(document.querySelectorAll('.deck-card'));

        if (this.deck && this.cards.length > 0) {
            this.init();
        }
    }

    private init(): void {
        // Use Intersection Observer to trigger animation only when section is visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Section is visible - start interval if not already running
                        if (!this.intervalId) {
                            // Start first animation after initial delay
                            this.initialTimeoutId = window.setTimeout(() => {
                                if (this.isVisible) {
                                    this.playAnimation();
                                }
                                // Then repeat every 30 seconds (only plays if visible)
                                this.intervalId = window.setInterval(() => {
                                    if (this.isVisible) {
                                        this.playAnimation();
                                    }
                                }, this.TIMING.REPEAT_INTERVAL);
                            }, this.TIMING.INITIAL_DELAY);
                        }
                        this.isVisible = true;
                    } else {
                        // Section is not visible - pause animations
                        this.isVisible = false;
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        observer.observe(this.deck!);
    }

    /**
     * Main animation sequence
     */
    private async playAnimation(): Promise<void> {
        if (!this.deck || this.isAnimating) return;

        this.isAnimating = true;

        // 2. Stack cards into a deck
        this.deck.dataset.state = 'stacking';
        await this.wait(this.TIMING.STACK_DURATION);

        // 3. Generate new random order
        const newOrder = this.shuffleArray([...this.cards]);

        // Set new indices for CSS animations
        newOrder.forEach((card, index) => {
            card.style.setProperty('--new-index', index.toString());
        });

        // 4. Play 3D flip shuffle animation
        this.deck.dataset.state = 'shuffling';
        await this.wait(this.TIMING.SHUFFLE_DURATION);

        // 5. Brief pause in shuffled state
        this.deck.dataset.state = 'shuffled';

        // Reorder DOM elements
        newOrder.forEach((card) => this.deck!.appendChild(card));

        await this.wait(this.TIMING.SHUFFLED_PAUSE);

        // 6. Expand cards back to vertical layout
        this.deck.dataset.state = 'expanding';
        await this.wait(this.TIMING.EXPAND_DURATION);

        // 7. Set final state
        this.deck.dataset.state = 'final';

        // Update card indices for potential future animations
        this.cards = Array.from(document.querySelectorAll('.deck-card'));
        this.cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index.toString());
        });

        this.isAnimating = false;
    }

    /**
     * Fisher-Yates shuffle algorithm
     */
    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Promise-based wait utility
     */
    private wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Replay the animation (for testing/demo)
     */
    public replay(): void {
        if (!this.deck) return;

        // Reset to initial state
        this.deck.dataset.state = 'expanded';
        this.cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index.toString());
            card.style.removeProperty('--new-index');
        });

        // Replay after brief delay
        setTimeout(() => {
            this.playAnimation();
        }, 500);
    }
}

class PortfolioApp {
    private products: Product[] = [];
    private cardDeck: CardDeckAnimation | null = null;

    constructor() {
        this.init();
    }

    /**
     * Initialize the application
     */
    private init(): void {
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupProductCards();
        this.setupFAQAccordion();
        this.setupCardDeckAnimation();
    }

    /**
     * Set up the card deck shuffle animation
     */
    private setupCardDeckAnimation(): void {
        this.cardDeck = new CardDeckAnimation();
    }

    /**
     * Set up smooth scrolling for navigation links
     */
    private setupSmoothScrolling(): void {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');

                if (target) {
                    const element = document.querySelector(target);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Set up scroll-triggered animations
     */
    private setupScrollAnimations(): void {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateElement(entry.target as HTMLElement);
                }
            });
        }, observerOptions);

        // Observe product cards and vision-mission cards
        const animatedElements = document.querySelectorAll('.product-card, .vm-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Animate element on scroll
     */
    private animateElement(element: HTMLElement): void {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    /**
     * Set up product card interactions
     */
    private setupProductCards(): void {
        // Support both old .product-card and new .product-banner-card
        const productCards = document.querySelectorAll('.product-card, .product-banner-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3')?.textContent
                || card.querySelector('.logo-product')?.textContent
                || 'Unknown';

            this.products.push({
                name: productName
            });

            // Add hover analytics
            card.addEventListener('mouseenter', () => {
                this.trackProductView(productName);
            });
        });
    }

    /**
     * Track product view (placeholder for analytics)
     */
    private trackProductView(_productName: string): void {
        // In production, this would send to analytics service
    }

    /**
     * Set up FAQ accordion functionality
     */
    private setupFAQAccordion(): void {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                const answer = button.nextElementSibling as HTMLElement;

                // Close all other answers
                faqQuestions.forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.setAttribute('aria-expanded', 'false');
                        const otherAnswer = otherButton.nextElementSibling as HTMLElement;
                        if (otherAnswer) {
                            otherAnswer.classList.remove('open');
                        }
                    }
                });

                // Toggle current answer
                button.setAttribute('aria-expanded', (!isExpanded).toString());
                if (answer) {
                    answer.classList.toggle('open', !isExpanded);
                }
            });
        });
    }

    /**
     * Get all products
     */
    public getProducts(): Product[] {
        return this.products;
    }

    /**
     * Get average rating
     */
    public getAverageRating(): number {
        const productsWithRating = this.products.filter(p => p.rating !== undefined);
        if (productsWithRating.length === 0) return 0;

        const sum = productsWithRating.reduce((acc, p) => acc + (p.rating || 0), 0);
        return sum / productsWithRating.length;
    }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new PortfolioApp();

        // Expose app to window for debugging (optional)
        (window as any).zealApp = app;
    });
} else {
    const app = new PortfolioApp();
    (window as any).zealApp = app;
}

export { PortfolioApp, Product, CardDeckAnimation };
