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
        this.setupFAQAccordion();
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

export { PortfolioApp, Product };
