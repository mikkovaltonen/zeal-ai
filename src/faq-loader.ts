/**
 * FAQ Loader - Renders FAQ content from native TypeScript data
 */

import { faqData, FAQCategory } from './faq-data';

class FAQLoader {
  private container: HTMLElement | null = null;

  constructor() {
    console.log('FAQ Loader initialized');
    this.init();
  }

  private async init(): Promise<void> {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadFAQ());
    } else {
      await this.loadFAQ();
    }
  }

  private async loadFAQ(): Promise<void> {
    console.log('Loading FAQ content...');
    this.container = document.getElementById('faq-accordion-content');
    if (!this.container) {
      console.log('FAQ container not found');
      return;
    }

    try {
      // Render from native data
      this.render(faqData);
      console.log('Rendered FAQ content:', faqData.length, 'categories');

      // Setup accordion functionality
      this.setupAccordion();
    } catch (error) {
      console.error('Error loading FAQ:', error);
      this.container.innerHTML = '<p>Error loading FAQ content. Please refresh the page.</p>';
    }
  }

  private render(categories: FAQCategory[]): void {
    if (!this.container) return;

    let html = '';

    for (const category of categories) {
      html += `
        <div class="faq-category">
          <h2 class="faq-category-title">${this.escapeHtml(category.title)}</h2>
      `;

      for (const item of category.items) {
        html += `
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>${this.escapeHtml(item.question)}</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div class="faq-answer">
              ${item.answer}
            </div>
          </div>
        `;
      }

      html += '</div>';
    }

    this.container.innerHTML = html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private setupAccordion(): void {
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
}

// Initialize FAQ loader
const faqLoader = new FAQLoader();

export { FAQLoader };
