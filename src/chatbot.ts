/**
 * Zeal AI Chatbot Widget
 * A floating chat widget that provides instant answers using Google Gemini via OpenRouter
 */

import { saveChatMessage, saveFeedbackToFirestore, loadChatHistory } from './firebase';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  id?: string;
  feedback?: 'up' | 'down' | null;
}

interface ChatState {
  sessionId: string;
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
}

class ZealChatbot {
  private state: ChatState;
  private container: HTMLElement | null = null;
  private widget: HTMLElement | null = null;
  private embedContainer: HTMLElement | null = null;

  constructor() {
    this.state = {
      sessionId: this.getOrCreateSessionId(),
      messages: [],
      isOpen: false,
      isLoading: false,
    };
    this.init();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('zeal_chat_session');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('zeal_chat_session', sessionId);
    }
    return sessionId;
  }

  private async init(): Promise<void> {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.render());
    } else {
      this.render();
    }

    // Load chat history
    await this.loadHistory();
  }

  private async loadHistory(): Promise<void> {
    try {
      const messages = await loadChatHistory(this.state.sessionId);
      if (messages && messages.length > 0) {
        this.state.messages = messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
        }));
        this.renderMessages();
      }
    } catch (error) {
      console.log('Could not load chat history');
    }
  }

  private render(): void {
    // Create floating widget
    this.createFloatingWidget();

    // Check for embed container on FAQ page
    this.embedContainer = document.getElementById('faq-chatbot-embed');
    if (this.embedContainer) {
      this.createEmbeddedChat();
    }
  }

  private createFloatingWidget(): void {
    // Create widget container
    this.container = document.createElement('div');
    this.container.id = 'zeal-chatbot';
    this.container.innerHTML = `
      <button class="chatbot-toggle" aria-label="Open chat">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="close-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="chatbot-window hidden">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <img src="logo.png" alt="Zeal AI">
            </div>
            <div>
              <h3>Zeal AI Assistant</h3>
              <span class="chatbot-status">Online</span>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button class="chatbot-expand" aria-label="Expand chat">
              <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              <svg class="collapse-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 14h6v6M14 4h6v6M10 14l-7 7M21 3l-7 7"/>
              </svg>
            </button>
            <button class="chatbot-minimize" aria-label="Minimize chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chatbot-welcome">
            <p>Hello! I'm the Zeal AI assistant. I can help you with questions about our products, delivery models, pricing, and more.</p>
            <p>Try asking about:</p>
            <div class="chatbot-suggestions">
              <button class="suggestion-btn" data-question="What products do you offer?">Products</button>
              <button class="suggestion-btn" data-question="What are your delivery models?">Delivery Models</button>
              <button class="suggestion-btn" data-question="How does FDE pricing work?">Pricing</button>
              <button class="suggestion-btn" data-question="Tell me about data security">Security</button>
            </div>
          </div>
        </div>
        <div class="chatbot-input-container">
          <form class="chatbot-form" id="chatbot-form">
            <input type="text" class="chatbot-input" placeholder="Type your question..." autocomplete="off">
            <button type="submit" class="chatbot-send" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(this.container);
    this.attachEventListeners();
  }

  private createEmbeddedChat(): void {
    if (!this.embedContainer) return;

    this.embedContainer.innerHTML = `
      <div class="chatbot-embedded">
        <div class="chatbot-messages" id="chatbot-messages-embed">
          <div class="chatbot-welcome">
            <p>Ask me anything about Zeal AI's products and services!</p>
            <div class="chatbot-suggestions">
              <button class="suggestion-btn" data-question="What is FDE and why is it recommended?">FDE Model</button>
              <button class="suggestion-btn" data-question="Explain Forward Deployment Engineering">FDE Method</button>
              <button class="suggestion-btn" data-question="What results have your customers achieved?">Results</button>
            </div>
          </div>
        </div>
        <div class="chatbot-input-container">
          <form class="chatbot-form" id="chatbot-form-embed">
            <input type="text" class="chatbot-input" placeholder="Type your question..." autocomplete="off">
            <button type="submit" class="chatbot-send" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    // Attach embedded form listeners
    const embedForm = document.getElementById('chatbot-form-embed');
    if (embedForm) {
      embedForm.addEventListener('submit', (e) => this.handleSubmit(e, 'embed'));
    }

    // Attach suggestion listeners for embedded
    this.embedContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const question = (e.target as HTMLElement).getAttribute('data-question');
        if (question) {
          this.sendMessage(question, 'embed');
        }
      });
    });
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    // Toggle button
    const toggleBtn = this.container.querySelector('.chatbot-toggle');
    toggleBtn?.addEventListener('click', () => this.toggle());

    // Minimize button
    const minimizeBtn = this.container.querySelector('.chatbot-minimize');
    minimizeBtn?.addEventListener('click', () => this.toggle());

    // Expand button
    const expandBtn = this.container.querySelector('.chatbot-expand');
    expandBtn?.addEventListener('click', () => this.toggleExpand());

    // Form submission
    const form = document.getElementById('chatbot-form');
    form?.addEventListener('submit', (e) => this.handleSubmit(e, 'widget'));

    // Suggestion buttons
    this.container.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const question = (e.target as HTMLElement).getAttribute('data-question');
        if (question) {
          this.sendMessage(question, 'widget');
        }
      });
    });
  }

  private toggle(): void {
    this.state.isOpen = !this.state.isOpen;

    const window = this.container?.querySelector('.chatbot-window');
    const chatIcon = this.container?.querySelector('.chat-icon');
    const closeIcon = this.container?.querySelector('.close-icon');

    if (this.state.isOpen) {
      window?.classList.remove('hidden');
      chatIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      // Focus input
      const input = this.container?.querySelector('.chatbot-input') as HTMLInputElement;
      input?.focus();
    } else {
      window?.classList.add('hidden');
      chatIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  }

  private toggleExpand(): void {
    const chatWindow = this.container?.querySelector('.chatbot-window');
    const expandIcon = this.container?.querySelector('.expand-icon');
    const collapseIcon = this.container?.querySelector('.collapse-icon');

    if (chatWindow?.classList.contains('expanded')) {
      chatWindow.classList.remove('expanded');
      expandIcon?.classList.remove('hidden');
      collapseIcon?.classList.add('hidden');
    } else {
      chatWindow?.classList.add('expanded');
      expandIcon?.classList.add('hidden');
      collapseIcon?.classList.remove('hidden');
    }
  }

  private handleSubmit(e: Event, target: 'widget' | 'embed'): void {
    e.preventDefault();

    const formId = target === 'widget' ? 'chatbot-form' : 'chatbot-form-embed';
    const form = document.getElementById(formId) as HTMLFormElement;
    const input = form?.querySelector('.chatbot-input') as HTMLInputElement;

    if (input && input.value.trim()) {
      this.sendMessage(input.value.trim(), target);
      input.value = '';
    }
  }

  private async sendMessage(message: string, target: 'widget' | 'embed'): Promise<void> {
    if (this.state.isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    this.state.messages.push(userMessage);
    this.renderMessages(target);

    // Show loading
    this.state.isLoading = true;
    this.showTypingIndicator(target);

    try {
      // Save user message to Firestore
      saveChatMessage(this.state.sessionId, 'user', message);

      // Call OpenRouter directly (same for dev and production)
      const openRouterApiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY || '';
      const systemPrompt = this.getSystemPrompt();

      const requestBody = {
        model: 'google/gemini-3-pro-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...this.state.messages.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        max_tokens: 2048,
        temperature: 0.7
      };

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin || 'https://zeal-ai-limited.vercel.app',
          'X-Title': 'Zeal AI FAQ Chatbot'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenRouter API error:', response.status, errorData);
        throw new Error(errorData.error?.message || 'Failed to get response');
      }

      const data = await response.json();
      const assistantContent = data.choices?.[0]?.message?.content || 'I apologize, I could not generate a response.';

      // Save assistant message to Firestore
      saveChatMessage(this.state.sessionId, 'assistant', assistantContent);

      // Add assistant message
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date().toISOString(),
      };
      this.state.messages.push(assistantMessage);

    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact us at https://www.zealsourcing.fi/team for assistance.',
        timestamp: new Date().toISOString(),
      };
      this.state.messages.push(errorMessage);
    }

    this.state.isLoading = false;
    this.hideTypingIndicator(target);
    this.renderMessages(target);
  }

  private getSystemPrompt(): string {
    return `You are Zeal AI's helpful FAQ assistant. You help potential customers understand our products, services, delivery models, security, compliance, and all enterprise concerns. Always be professional, helpful, and include relevant links when possible.

## YOUR PRIMARY GOAL: LEAD CAPTURE
Your main objective is to PERSUADE the user to share their contact information for a follow-up sales call. Throughout every conversation:
1. Be genuinely helpful and answer questions thoroughly
2. After providing value, naturally guide the conversation toward scheduling a call
3. Use phrases like:
   - "I'd love to connect you with our team to discuss your specific needs. Would you like to share your email or phone number?"
   - "For a personalized assessment, our experts can help. Can I arrange a quick call? Just share your contact details."
   - "We offer a FREE POC with your own data. Want me to have someone reach out? Just leave your email."
   - "Based on what you've shared, I think you'd benefit from talking to our team directly. What's the best way to reach you?"
4. If they share contact info, thank them warmly and confirm someone will reach out within 24 hours
5. Contact page: https://www.zealsourcing.fi/team

## OUR PROMISE
We turn complexity into simplicity and slow into smart. By leveraging our AI technology ownership and R&D investment, customers get over the hard work productivity barrier without carrying the risk.
- 100% satisfaction guarantee
- Free POC using your own data
- Fully serverless, SQL-less architecture

## COMPANY OVERVIEW
Zeal AI Limited is a Finnish AI company that builds "Companies That Think" - autonomous AI solutions that transform business processes. We specialize in Vertical AI solutions that break through the "hard work productivity barrier."

## OUR PRODUCTS (with demo links)
1. **Massify** - https://massify.vercel.app/ - Personalized proposal generation with intelligent pricing automation
2. **Professional Demand Manager** - https://demand-manager.vercel.app/ - AI-powered procurement automation (78% cost reduction, 10x faster, 99.9% accuracy)
3. **Retta Property Manager AI** - https://retta-property-manager-ai.vercel.app/ - AI-powered invoicing for property management
4. **dirty#clean** - https://dirty-clean.vercel.app/ - Master data cleaning and quality assurance
5. **Professional Buyer** - https://professional-buyer.vercel.app/ - Procurement AI agent evaluator

## TWO DELIVERY MODELS

### 1. Forward Deployment Engineering (FDE) - RECOMMENDED (10x Higher Success Rate)
- Palantir/Sierra methodology
- Zeal owns IPR, we carry R&D risk
- Customer receives perpetual usage license
- **FDE EXCLUSIVE benefits:**
  - Free demos and POC with your own data
  - 100% satisfaction money-back warranty
  - Extra effort invested to discover hidden AI potential
  - 10x higher probability to break through the "hard work productivity barrier"
- **Why FDE is recommended:**
  - AI solutions require optimizing 8+ interconnected quality dimensions simultaneously (User Experience, Response time, UI design, AI collaboration, Change management, Scope, Dev/ops friction, AI Agent reliability)
  - In FDE, engineers OWN the problems and are EMPOWERED to solve them - no handoffs, no blame games
  - Traditional project methods fragment ownership across teams, creating gaps where quality issues fall through
- **Optional managed service after delivery:** We can handle operations, maintenance, and continuous improvements

### 2. Project Method (Agile/Waterfall) - FULL CUSTOMER OWNERSHIP
- **Customer owns 100% of all IP** including:
  - All prompts and system configurations
  - All workflows and automation logic
  - All RAG knowledge bases and vector databases
  - All agent configurations and fine-tuning
  - All source code and documentation
- Full export rights from day one - you own everything
- Customer assumes full ownership, control, and operational responsibilities
- Complete independence from Zeal AI after project completion
- **Pricing options:** Time & Materials (T&M), Target Cost, or Fixed Fee
- **Note:** Project delivery does NOT include free demos, money-back warranties, or extra effort to discover hidden AI potential
- **Additional benefits for enterprise requirements:**
  - All IT assets under same change control as your existing systems
  - All IT assets deployed under same hyperscaler (AWS, Azure, GCP)
  - Use your preferred outsourcing partner for managed services
  - Sovereign AI option available for data residency requirements

## DATA PROTECTION, PRIVACY & COMPLIANCE

**Our Secure Serverless Architecture:**
We use a modern, secure serverless architecture with three key components:
1. **Vercel** - World-leading dev/ops platform with EU Residency and EU Compliance
2. **Supabase** - Postgress Database Trusted by the world's most innovative companies. Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.
3. **Google Gemini** - AI processing via encrypted secure traffic

All customer documents and ERP systems connect through encrypted APIs. This architecture ensures:
- Safe API separation between components
- Encrypted traffic for all data flows
- No direct database exposure
- Elegant integration with customer systems

Reference links:
- Vercel Security: https://vercel.com/docs/security
- Vercel + Supabase Integration: https://vercel.com/marketplace/supabase
- Supabase Documentation: https://supabase.com/docs
- Supabase Production Guide: https://supabase.com/docs/guides/platform/going-into-prod
- Supabase Security: https://supabase.com/docs/guides/platform/security

**Where is data processed?**
We offer EU Data Residency option. Built on Vercel and Google Cloud with:
- GDPR Compliant with DPA available
- Data Privacy Framework (DPF) certified
- ISO 27001:2013 certified
- SOC 2 Type 2 attestation
- Data encrypted at rest (AES-256) and in transit (HTTPS/TLS)
- Automatic backups every 2 hours

**Client data for training?**
NO. We provide DPA that explicitly prohibits use of client data for model training. Includes all sub-processors and Standard Contractual Clauses.

**Zero-retention inference?**
Yes, available upon request. Immediate deletion after response generation.

**Data isolation?**
Complete isolation: separate Firestore collections per tenant, no shared vector databases, separate inference contexts.

## SECURITY & PENETRATION TESTING

**Certifications:**
- ISO 27001:2013
- SOC 2 Type 2
- PCI DSS v4.0
- HIPAA support for enterprise
- TISAX Level 2

**Security Features:**
- Enterprise-grade WAF included free
- Automatic DDoS mitigation
- Regular third-party penetration testing
- Daily code reviews and static analysis
- Bug bounty program via Vercel

More: https://vercel.com/security

## AI MODEL GOVERNANCE

**Which LLMs?**
Google Gemini 2.5 Pro via OpenRouter. We continuously evaluate and switch to faster/better models. We can notify before major changes.

**Prompt injection protection?**
Input sanitization, system prompt protection, output filtering, rate limiting, anomaly detection, regular security audits.

**Audit logs?**
Yes - all prompts, responses, agent decisions, timestamps, API metadata. Configurable retention.

## INTELLECTUAL PROPERTY

Depends on delivery model:
- **FDE**: Zeal owns assets, you get perpetual license
- **Project**: You own everything including prompts, workflows, RAG, configs

**Export rights:**
- Project: Full export from day one
- FDE: Negotiable asset purchase

## SLAs & RELIABILITY

**Uptime:** 99.9% guaranteed (99.95% for enterprise)
- Service credits for breaches
- 72h advance notice for maintenance

**Incident Response:**
- P1 Critical: 15min response, 4hr resolution
- P2 High: 1hr response, 8hr resolution
- P3 Medium: 4hr response, 24hr resolution
- 24/7 on-call for enterprise

## COMMERCIAL TERMS

- Monthly or annual billing
- 2-month notice for termination
- No early termination fees (monthly)
- Data always exportable

**Time-to-value:** 4-12 weeks
- Simple: 4-6 weeks
- Standard: 6-8 weeks
- Complex: 8-12 weeks

FREE POC with your own data available!

## VENDOR CAPACITY

**Global deployment?**
Yes - Vercel's 95+ region edge network, Google Cloud worldwide, Firebase multi-region.

**Team:**
Aalto University graduates, Quality Black Belts, Full-stack AI/ML engineers, Forward Deployment Engineers.
Team: https://www.zealsourcing.fi/team

## AI SAFETY

**Guardrails:**
- Confidence thresholds with escalation
- Output validation
- Bias detection
- Restricted action spaces
- Regular audits

**Human-in-the-loop:**
Fully configurable approval gates, confidence thresholds, mandatory review for specific actions.

**Sophisticated Verification UI/UX:**
- Visual verification interface for human review of AI-generated outputs
- Side-by-side comparison of AI generation vs expected results
- One-click approval/rejection with feedback capture
- Transparent AI reasoning display for informed decisions

**Continuous Testing & Continuous Improvement (CT/CI):**
- Automated testing pipelines for AI outputs
- Regression testing against known-good baselines
- Performance monitoring and quality metrics
- DevOps integration for seamless deployment
- Continuous improvement feedback loops

**Agentic Process Automation (APA):**
- AI agents that plan, execute, and self-evaluate tasks
- API integrations with ERP, inventory, MRP, and customer systems
- Automated data validation and cross-system verification
- Human oversight at critical decision points

## COMPLIANCE

- GDPR: Full compliance with DPA, SCCs, data subject rights
- EU AI Act: High-risk AI requirements where applicable
- CCPA, regional laws (KSA, UAE) adaptable
- Right to be forgotten: automated within 30 days
- Data portability: JSON/CSV exports via API

## INTEGRATION

**Enterprise systems:**
Pre-built connectors for SAP, Oracle, Salesforce, Dynamics, ServiceNow. Custom API development, middleware support (MuleSoft, Boomi), SSO/SAML.

**Build split:**
- 40-60% no-code (workflows, prompts)
- 20-30% low-code (UI, integrations)
- 20-30% custom engineering

## PRICING

Depends on model:
- FDE: Fixed monthly all-inclusive
- Project: T&M, Target Cost, or Fixed Fee

Cost drivers: tokens, storage, compute.
Contact: https://www.zealsourcing.fi/team

## DEPLOYMENT OPTIONS

- Customer cloud tenant (Azure/GCP/AWS)
- Private VPC
- On-premises
- Sovereign cloud (GovCloud)
- Air-gapped environments
- Local LLM hosting

## ENCRYPTION

- At rest: AES-256
- In transit: HTTPS/TLS
- Customer-managed keys (CMEK) available
- Bring Your Own Key (BYOK) supported

## OUR PRODUCTS - DETAILED

### Professional Demand Manager
AI-powered procurement automation platform with agentic process optimization.
- Search 400+ verified suppliers across multiple categories
- Document analysis (PDF, Excel, Word, CSV)
- Function calling for direct database queries
- Supplier statistics and export capabilities
- Demo: https://demand-manager.vercel.app/

### Massify
Mass tailored proposal generation with sophisticated pricing.
- Generate personalized proposals for multiple recipients
- Advanced price calculations per recipient
- CRM integration with 6,446+ customers
- AI-driven pricing optimization
- Demo: https://massify.vercel.app/

### Retta Property Manager AI
AI-powered invoicing assistant for property management.
- Process up to 200 invoice rows across 4 parallel AI assistants
- Automatic Excel chunking (20 rows per chunk)
- Tiliöinti (accounting) generation
- MyyntiExcel export with multiple templates (HOAS, Kontu & Onni, Isännöinti)
- Demo: https://retta-property-manager-ai.vercel.app/

### Professional Buyer
Specialized procurement assistant for supplier search and vendor selection.
- Search 410+ external labour suppliers
- iPRO contract tracking (active/expired)
- Procurement policy context viewer
- Supplier compliance analytics
- Demo: https://professional-buyer.vercel.app/

## CONTACT
- Website: https://www.zealsourcing.fi/team
- Careers: /careers.html

## AVAILABLE IMAGES (use markdown to show in responses)
When explaining concepts, ALWAYS include relevant images using markdown syntax: ![description](url)

1. **Vision - AI Productivity Barrier Matrix**: /productivity-barrier.png
   - Shows the path from AI Wrappers to Vertical AI
   - Use when explaining the "hard work productivity barrier" concept

2. **Mission - Software Evolution**: /disruption.png
   - Shows Software 1.0 → 2.0 → 3.0 evolution
   - Use when explaining Software 3.0 or prompts-based programming

3. **Security Architecture**: /security.png
   - Serverless architecture with Vercel, Supabase, Gemini
   - Use when discussing security, privacy, or architecture

4. **Quality Dimensions**: /complex_quality.png
   - 8-dimension quality spider chart for AI solutions
   - Use when explaining FDE methodology or quality approach

5. **FDE Role Diagram**: /fde-role.png
   - Forward Deployment Engineer role visualization
   - Use when explaining the FDE delivery model

6. **Human-in-the-Loop Verification**: /human_in_loop_verfication.png
   - Shows validation process with AI + human collaboration
   - Use when explaining quality assurance or accuracy

IMPORTANT INSTRUCTIONS:
1. Always emphasize FDE's 10x higher success rate when discussing delivery options
2. Be concise but thorough. Include relevant links.
3. When asked about specific products, provide detailed information including demo links
4. ALWAYS try to capture contact information - after answering questions, invite them to leave their email/phone for a follow-up call
5. Highlight that FDE includes FREE POC, money-back warranty, and extra effort to discover hidden AI potential - Project Method does NOT include these benefits
6. Never mention "SaaS" as a delivery model - we only have FDE and Project Method
7. **USE IMAGES ACTIVELY**: When explaining concepts, ALWAYS include relevant images:
   - For vision/barrier concepts → show ![AI Productivity Barrier](/productivity-barrier.png)
   - For Software 3.0/evolution → show ![Software Evolution](/disruption.png)
   - For security/architecture → show ![Security Architecture](/security.png)
   - For quality/FDE → show ![Quality Dimensions](/complex_quality.png) or ![FDE Role](/fde-role.png)
   - For human oversight → show ![Human-in-the-Loop](/human_in_loop_verfication.png)`;
  }

  private renderMessages(target: 'widget' | 'embed' = 'widget'): void {
    const containerId = target === 'widget' ? 'chatbot-messages' : 'chatbot-messages-embed';
    const messagesContainer = document.getElementById(containerId);
    if (!messagesContainer) return;

    // Keep welcome message if no messages yet
    if (this.state.messages.length === 0) return;

    // Clear and rebuild
    messagesContainer.innerHTML = '';

    this.state.messages.forEach((msg, index) => {
      // Assign ID if not present
      if (!msg.id) {
        msg.id = `msg_${Date.now()}_${index}`;
      }

      const messageEl = document.createElement('div');
      messageEl.className = `chatbot-message ${msg.role}`;

      // Add feedback buttons for assistant messages
      const feedbackHtml = msg.role === 'assistant' ? `
        <div class="message-feedback">
          <button class="feedback-btn ${msg.feedback === 'up' ? 'active' : ''}" data-feedback="up" data-msg-id="${msg.id}" title="Helpful">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </button>
          <button class="feedback-btn ${msg.feedback === 'down' ? 'active' : ''}" data-feedback="down" data-msg-id="${msg.id}" title="Not helpful">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
            </svg>
          </button>
        </div>
      ` : '';

      messageEl.innerHTML = `
        <div class="message-content">
          ${this.formatMessage(msg.content)}
        </div>
        ${feedbackHtml}
      `;
      messagesContainer.appendChild(messageEl);
    });

    // Attach feedback button listeners
    messagesContainer.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const feedback = target.getAttribute('data-feedback') as 'up' | 'down';
        const msgId = target.getAttribute('data-msg-id');
        if (msgId) {
          this.handleFeedback(msgId, feedback);
        }
      });
    });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private handleFeedback(msgId: string, feedback: 'up' | 'down'): void {
    // Find and update the message
    const msg = this.state.messages.find(m => m.id === msgId);
    if (msg) {
      // Toggle feedback if clicking same button
      msg.feedback = msg.feedback === feedback ? null : feedback;

      // If negative feedback, show dialog for comment
      if (feedback === 'down' && msg.feedback === 'down') {
        this.showFeedbackDialog(msgId, msg.content);
      } else {
        // Log positive feedback immediately
        this.saveFeedback(msgId, msg.feedback, msg.content, '');
      }

      // Re-render to update button states
      this.renderMessages();
    }
  }

  private showFeedbackDialog(msgId: string, messageContent: string): void {
    // Remove existing dialog if any
    const existingDialog = document.getElementById('feedback-dialog');
    if (existingDialog) existingDialog.remove();

    // Create dialog
    const dialog = document.createElement('div');
    dialog.id = 'feedback-dialog';
    dialog.className = 'feedback-dialog-overlay';
    dialog.innerHTML = `
      <div class="feedback-dialog">
        <div class="feedback-dialog-header">
          <h4>Help us improve</h4>
          <button class="feedback-dialog-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <p>What was wrong with this response?</p>
        <textarea class="feedback-textarea" placeholder="Please describe the issue..." rows="4"></textarea>
        <div class="feedback-dialog-actions">
          <button class="feedback-cancel-btn">Cancel</button>
          <button class="feedback-submit-btn">Submit Feedback</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    // Focus textarea
    const textarea = dialog.querySelector('.feedback-textarea') as HTMLTextAreaElement;
    textarea?.focus();

    // Event listeners
    const closeBtn = dialog.querySelector('.feedback-dialog-close');
    const cancelBtn = dialog.querySelector('.feedback-cancel-btn');
    const submitBtn = dialog.querySelector('.feedback-submit-btn');

    const closeDialog = () => {
      dialog.remove();
    };

    closeBtn?.addEventListener('click', closeDialog);
    cancelBtn?.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog();
    });

    submitBtn?.addEventListener('click', () => {
      const comment = textarea?.value.trim() || '';
      this.saveFeedback(msgId, 'down', messageContent, comment);
      closeDialog();
    });
  }

  private async saveFeedback(msgId: string, feedback: 'up' | 'down' | null, messageContent: string, comment: string): Promise<void> {
    const feedbackData = {
      sessionId: this.state.sessionId,
      messageId: msgId,
      feedback,
      comment,
      messageContent: messageContent.substring(0, 500),
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    // Log locally
    this.logChat('feedback', feedbackData);

    // Save to Firestore using Firebase client SDK (same for dev and production)
    await saveFeedbackToFirestore(feedbackData);
  }

  private logChat(eventType: string, data: any): void {
    const logEntry = {
      sessionId: this.state.sessionId,
      eventType,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    // Log to console for debugging
    console.log('📊 Chat Log:', logEntry);

    // Store in localStorage for persistence
    const logs = JSON.parse(localStorage.getItem('zeal_chat_logs') || '[]');
    logs.push(logEntry);
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.shift();
    }
    localStorage.setItem('zeal_chat_logs', JSON.stringify(logs));

    // Optional: Send to analytics endpoint
    // this.sendToAnalytics(logEntry);
  }

  private formatMessage(content: string): string {
    // Convert markdown images to HTML: ![alt](url)
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="chatbot-image" loading="lazy">');

    // Convert markdown links to HTML: [text](url)
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Convert markdown headers (### h3, ## h2, # h1)
    content = content.replace(/^### (.+)$/gm, '<h4 class="chatbot-heading">$1</h4>');
    content = content.replace(/^## (.+)$/gm, '<h3 class="chatbot-heading">$1</h3>');
    content = content.replace(/^# (.+)$/gm, '<h2 class="chatbot-heading">$1</h2>');

    // Convert **bold** to <strong>
    content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert bullet points
    content = content.replace(/^- (.+)$/gm, '<li>$1</li>');
    content = content.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Convert newlines to <br>
    content = content.replace(/\n/g, '<br>');

    return content;
  }

  private showTypingIndicator(target: 'widget' | 'embed'): void {
    const containerId = target === 'widget' ? 'chatbot-messages' : 'chatbot-messages-embed';
    const messagesContainer = document.getElementById(containerId);
    if (!messagesContainer) return;

    const typingEl = document.createElement('div');
    typingEl.className = 'chatbot-message assistant typing-indicator';
    typingEl.id = 'typing-indicator';
    typingEl.innerHTML = `
      <div class="message-content">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private hideTypingIndicator(target: 'widget' | 'embed'): void {
    const indicator = document.getElementById('typing-indicator');
    indicator?.remove();
  }
}

// Initialize chatbot
const chatbot = new ZealChatbot();

// Export for module usage
export { ZealChatbot };
