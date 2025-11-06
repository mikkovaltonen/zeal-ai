/**
 * Zeal AI Limited Portfolio - Main TypeScript
 * Interactive features for the homepage
 */

interface Product {
    name: string;
    rating?: number;
    reviews?: number;
}

class PortfolioApp {
    private products: Product[] = [];

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
        this.logWelcomeMessage();
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
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3')?.textContent || 'Unknown';
            const ratingText = card.querySelector('.rating-text')?.textContent;

            let rating: number | undefined;
            let reviews: number | undefined;

            if (ratingText) {
                const match = ratingText.match(/(\d+\.?\d*)\/5 \((\d+) reviews\)/);
                if (match) {
                    rating = parseFloat(match[1]);
                    reviews = parseInt(match[2], 10);
                }
            }

            this.products.push({
                name: productName,
                rating,
                reviews
            });

            // Add hover analytics
            card.addEventListener('mouseenter', () => {
                this.trackProductView(productName);
            });
        });

        console.log('Products loaded:', this.products);
    }

    /**
     * Track product view (placeholder for analytics)
     */
    private trackProductView(productName: string): void {
        console.log(`Product viewed: ${productName}`);
        // In production, this would send to analytics service
    }

    /**
     * Log welcome message to console
     */
    private logWelcomeMessage(): void {
        console.log('%c🧠 Zeal AI Limited', 'font-size: 20px; font-weight: bold; color: #FF0000;');
        console.log('%cWe build companies that think', 'font-size: 14px; font-style: italic;');
        console.log('\nVisit our partner: https://www.zealsourcing.fi/');
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

export { PortfolioApp, Product };
