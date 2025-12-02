/**
 * Native FAQ Data - Structured FAQ content for the Zeal AI website
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  id: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    id: 'a',
    title: 'A. Data Protection, Privacy & Compliance',
    items: [
      {
        question: 'Where is all data processed and stored (jurisdiction, region), and can we mandate EEA-only or tenant-restricted processing?',
        answer: `<p>Yes, we offer EU Data Residency option. Our infrastructure is built on Vercel and Google Cloud with comprehensive compliance:</p>
<p><strong>Vercel Compliance Framework:</strong></p>
<ul>
<li><strong>GDPR Compliant</strong> with Data Processing Addendum (DPA) available</li>
<li><strong>Data Privacy Framework (DPF)</strong> certified (public listing at dataprivacyframework.gov)</li>
<li><strong>ISO 27001:2013</strong> certified for information security management</li>
<li><strong>SOC 2 Type 2</strong> attestation available</li>
</ul>
<p><strong>Data Protection:</strong></p>
<ul>
<li>Data encrypted at rest (AES-256) and in transit (HTTPS/TLS)</li>
<li>Automatic backups every 2 hours, retained for 30 days</li>
<li>Global replication for disaster resilience</li>
<li>Infrastructure primarily uses AWS with failover to nearest edge location</li>
</ul>
<p>We can contractually guarantee EEA-only processing and tenant-restricted data handling.</p>
<p><strong>Our Secure Serverless Architecture:</strong></p>
<ul>
<li><strong>Vercel</strong> - World-leading dev/ops platform with EU residency and EU compliance</li>
<li><strong>Supabase</strong> - No-SQL database with safe API separation and elegant API integration</li>
<li><strong>Google Gemini</strong> - AI processing via encrypted secure traffic</li>
<li>All customer documents and ERP systems connect through encrypted APIs</li>
</ul>
<p><strong>More details:</strong></p>
<ul>
<li><a href="https://vercel.com/docs/security" target="_blank" rel="noopener">Vercel Security Docs</a></li>
<li><a href="https://vercel.com/marketplace/supabase" target="_blank" rel="noopener">Vercel + Supabase Integration</a></li>
<li><a href="https://supabase.com/docs" target="_blank" rel="noopener">Supabase Documentation</a></li>
<li><a href="https://supabase.com/docs/guides/platform/going-into-prod" target="_blank" rel="noopener">Supabase Production Guide</a></li>
<li><a href="https://supabase.com/docs/guides/platform/security" target="_blank" rel="noopener">Supabase Security</a></li>
</ul>`
      },
      {
        question: 'Do you contractually guarantee that no client data is used to train or fine-tune any model, and provide a DPA including all sub-processors?',
        answer: `<p>Yes, we do. We provide a comprehensive Data Processing Agreement (DPA) that:</p>
<ul>
<li>Explicitly prohibits use of client data for model training or fine-tuning</li>
<li>Lists all sub-processors (Vercel, Google Cloud, Firebase)</li>
<li>Includes Standard Contractual Clauses for international transfers</li>
<li>Provides full audit rights</li>
<li>Aligned with Vercel's GDPR-compliant DPA framework</li>
</ul>`
      }
    ]
  },
  {
    id: 'b',
    title: 'B. Data Usage, Retention & Sovereignty',
    items: [
      {
        question: 'Do you offer zero-retention inference options (no logging, no caching, immediate deletion)?',
        answer: `<p>Yes, zero-retention inference options are available upon request. We can configure our systems to process requests without persistent logging, with immediate deletion after response generation.</p>`
      },
      {
        question: 'How long are prompts, responses and uploaded files retained, and can we enforce real-time deletion?',
        answer: `<p>By default:</p>
<ul>
<li>Session data is retained during the active session only</li>
<li>Issue-related data is stored until the issue is permanently resolved</li>
<li>Uploaded files can be configured for immediate deletion after processing</li>
</ul>
<p>Real-time deletion can be enforced through our API or upon request. We support configurable retention policies based on your compliance requirements.</p>`
      },
      {
        question: 'Can you demonstrate prompt/data isolation to guarantee our data never influences any other client?',
        answer: `<p>Yes, we guarantee complete data isolation:</p>
<ul>
<li>Each tenant has isolated Firestore collections</li>
<li>No shared vector databases between clients</li>
<li>Separate inference contexts per session</li>
<li>We can provide architecture documentation and conduct demonstrations</li>
</ul>`
      }
    ]
  },
  {
    id: 'c',
    title: 'C. Security & Penetration Testing',
    items: [
      {
        question: 'When was the last independent penetration test, and can we see the executive summary?',
        answer: `<p>Our infrastructure is built on Vercel's enterprise platform with comprehensive security certifications:</p>
<p><strong>Vercel Security Certifications:</strong></p>
<ul>
<li><strong>ISO 27001:2013</strong> - Information security management certified</li>
<li><strong>SOC 2 Type 2</strong> - Attestation available (contact for report access)</li>
<li><strong>PCI DSS v4.0</strong> - Payment card industry compliant</li>
<li><strong>HIPAA</strong> - Healthcare compliance support for enterprise (report at security.vercel.com)</li>
<li><strong>TISAX Level 2</strong> - Automotive industry security assessment completed</li>
</ul>
<p><strong>Penetration Testing:</strong></p>
<ul>
<li>Regular third-party penetration testing conducted</li>
<li>Daily code reviews and static analysis checks</li>
<li>Dependency scanning at code level</li>
<li>Cloud security posture management (CSPM) for vulnerability scanning</li>
<li>Pro and Enterprise customers can request annual penetration testing reports</li>
</ul>
<p><strong>Our Secure Serverless Architecture:</strong></p>
<div class="faq-image-container"><img src="/security.png" alt="Secure and private serverless architecture with Vercel, Supabase, and Google Gemini" class="faq-image"></div>
<p><strong>Security Responsibilities by Delivery Model:</strong></p>
<ul>
<li><strong>FDE (Forward Deployment Engineering)</strong>: Zeal AI manages the complete tech stack security, compliance alignment, and ongoing security monitoring as part of our managed service.</li>
<li><strong>Project Method</strong>: Customer IT is responsible for aligning the tech stack with their existing IT systems and ensuring security policies are consistent across all company IT systems, including the delivered project assets.</li>
</ul>
<p>More details: <a href="https://vercel.com/security" target="_blank" rel="noopener">https://vercel.com/security</a></p>`
      },
      {
        question: 'Do you have a bug-bounty or responsible disclosure program in place?',
        answer: `<p>Yes, we participate in Vercel's security programs:</p>
<ul>
<li><strong>Private bug bounty program</strong> offering researcher rewards</li>
<li><strong>Responsible disclosure</strong>: responsible.disclosure@vercel.com</li>
<li>Application-level security reviews for each deployment</li>
</ul>`
      }
    ]
  },
  {
    id: 'd',
    title: 'D. AI Model Governance & Transparency',
    items: [
      {
        question: 'Which exact LLMs and versions are used, and can we mandate or prohibit specific models per workflow?',
        answer: `<p>We currently use Google Gemini 2.5 Pro as our primary LLM, accessed via OpenRouter for flexibility. LLMs are improving rapidly, and we continuously evaluate and switch to faster and more capable models. While we cannot contractually freeze model versions (as this would prevent improvements), we can:</p>
<ul>
<li>Notify you before major model changes</li>
<li>Provide testing windows for validation</li>
<li>Support specific model requirements for regulated workflows</li>
</ul>`
      },
      {
        question: 'How do you prevent prompt injection, data exfiltration, and jailbreak attacks in production?',
        answer: `<p>We implement industry best practices including:</p>
<ul>
<li>Input sanitization and validation</li>
<li>System prompt protection with boundary markers</li>
<li>Output filtering for sensitive data patterns</li>
<li>Rate limiting and anomaly detection</li>
<li>Separation of instruction and data contexts</li>
<li>Regular security audits of prompts and responses</li>
</ul>`
      },
      {
        question: 'Do you provide full audit logs of prompts, outputs, and agent decisions?',
        answer: `<p>Yes, comprehensive audit logging is part of our data usage and retention policy. We store:</p>
<ul>
<li>All prompts and responses (configurable retention)</li>
<li>Agent decision trees and reasoning chains</li>
<li>Timestamps and user context</li>
<li>API call metadata</li>
</ul>
<p>Audit logs are essential for continuous improvement and compliance. Access can be provided through our dashboard or API.</p>`
      }
    ]
  },
  {
    id: 'e',
    title: 'E. Intellectual Property & Ownership',
    items: [
      {
        question: 'Who owns the prompts, workflows, RAG knowledge bases, and agent configurations created during the project?',
        answer: `<p>IP ownership depends on your chosen delivery model:</p>
<p><strong>Forward Deployment Engineering (FDE) - RECOMMENDED (10x Higher Success Rate)</strong></p>
<ul>
<li>Zeal AI owns assets built by the FDE team</li>
<li>Team carries R&D investment risk and operational costs</li>
<li>Customer receives perpetual usage license</li>
<li>Inspired by Palantir and Sierra methodologies</li>
<li>Free demos and POC with your own data</li>
<li>100% satisfaction money-back warranty</li>
<li>Extra effort invested to discover hidden AI potential</li>
<li>10x higher probability to break through the "hard work productivity barrier"</li>
<li><strong>Optional managed service after delivery:</strong> We can handle operations, maintenance, and continuous improvements</li>
</ul>
<p><strong>Project Method (Agile/Waterfall) - FULL CUSTOMER OWNERSHIP</strong></p>
<ul>
<li><strong>Customer owns 100% of all IP</strong> including:
<ul>
<li>All prompts and system configurations</li>
<li>All workflows and automation logic</li>
<li>All RAG knowledge bases and vector databases</li>
<li>All agent configurations and fine-tuning</li>
<li>All source code and documentation</li>
</ul></li>
<li>Customer assumes full ownership, control, and operational responsibilities</li>
<li>Full export rights included from day one</li>
<li><strong>Pricing options:</strong> Time & Materials (T&M), Target Cost, or Fixed Fee</li>
<li><strong>Note:</strong> Project delivery does not include free demos, money-back warranties, or extra effort to discover hidden AI potential</li>
<li><strong>Additional benefits for enterprise requirements:</strong>
<ul>
<li>All IT assets under same change control as your existing systems</li>
<li>All IT assets deployed under same hyperscaler (AWS, Azure, GCP)</li>
<li>Use your preferred outsourcing partner for managed services</li>
<li>Sovereign AI option available for data residency requirements</li>
<li>Complete independence from Zeal AI after project completion</li>
</ul></li>
</ul>`
      },
      {
        question: 'Can we fully export all assets (flows, vector DBs, configs) if we end the engagement?',
        answer: `<ul>
<li><strong>Project Method</strong>: Yes, full export rights included from day one - you own everything</li>
<li><strong>FDE Method</strong>: Export rights can be negotiated as part of an asset purchase agreement</li>
</ul>`
      }
    ]
  },
  {
    id: 'f',
    title: 'F. Reliability, SLAs & Business Continuity',
    items: [
      {
        question: 'What uptime SLA do you guarantee (99.9% / 99.95%) and what are the penalties for breaches?',
        answer: `<p>We guarantee 99.9% uptime SLA with:</p>
<ul>
<li>Service credits for downtime exceeding SLA</li>
<li>Tiered credit structure based on severity</li>
<li>Exclusions for scheduled maintenance (announced 72h in advance)</li>
<li>Force majeure provisions</li>
</ul>
<p>Enterprise customers can negotiate 99.95% SLA with enhanced support.</p>`
      },
      {
        question: 'What is your incident response time for P1 (critical) failures?',
        answer: `<ul>
<li><strong>P1 (Critical)</strong>: 15-minute response, 4-hour resolution target</li>
<li><strong>P2 (High)</strong>: 1-hour response, 8-hour resolution target</li>
<li><strong>P3 (Medium)</strong>: 4-hour response, 24-hour resolution target</li>
<li><strong>P4 (Low)</strong>: Next business day response</li>
</ul>
<p>24/7 on-call support available for enterprise customers.</p>`
      }
    ]
  },
  {
    id: 'g',
    title: 'G. Commercial, Contracting & Exit',
    items: [
      {
        question: 'Are there minimum contract terms, early termination fees, or lock-ins we should be aware of?',
        answer: `<p>Standard terms:</p>
<ul>
<li>Monthly or annual billing options</li>
<li>2-month notice for termination</li>
<li>No early termination fees for monthly plans</li>
<li>Annual plans prorated upon early exit</li>
<li>No technical lock-in - data always exportable</li>
</ul>`
      },
      {
        question: 'What is your typical time-to-value from signature to production deployment?',
        answer: `<p>4-12 weeks depending on complexity:</p>
<ul>
<li><strong>Simple integrations</strong>: 4-6 weeks</li>
<li><strong>Standard implementations</strong>: 6-8 weeks</li>
<li><strong>Complex enterprise deployments</strong>: 8-12 weeks</li>
</ul>
<p>Includes: scoping, development, testing, UAT, and production deployment. We offer free POC with your own data to validate before commitment.</p>`
      }
    ]
  },
  {
    id: 'h',
    title: 'H. Vendor Viability & Delivery Capacity',
    items: [
      {
        question: 'As a smaller Finnish firm, what is your capacity to support a global, multi-region deployment?',
        answer: `<p>We leverage cloud-native architecture for global scale:</p>
<ul>
<li>Vercel's global edge network (95+ regions)</li>
<li>Google Cloud's worldwide infrastructure</li>
<li>Firebase's multi-region Firestore</li>
<li>No geographical limitations for deployment</li>
</ul>
<p>Our FDE methodology ensures consistent delivery quality regardless of client location.</p>`
      },
      {
        question: 'Who comprises your core technical team and what is your staff retention rate?',
        answer: `<p>Our team consists of:</p>
<ul>
<li>Aalto University graduates with strong academic backgrounds</li>
<li>Quality Black Belts in process improvement</li>
<li>Full-stack engineers with AI/ML specialization</li>
<li>Forward Deployment Engineers combining technical and business skills</li>
</ul>
<p>Team details available at: <a href="https://www.zealsourcing.fi/team" target="_blank" rel="noopener">https://www.zealsourcing.fi/team</a></p>`
      },
      {
        question: 'How do you ensure continuity and knowledge transfer (i.e., no founder/person dependency)?',
        answer: `<p>The Forward Deployment Engineering methodology ensures:</p>
<ul>
<li>Comprehensive documentation as standard practice</li>
<li>Multiple team members familiar with each project</li>
<li>Standardized architecture patterns across projects</li>
<li>Client-accessible knowledge bases</li>
<li>Structured handover processes</li>
</ul>`
      }
    ]
  },
  {
    id: 'i',
    title: 'I. AI Safety, Risk & Human Oversight',
    items: [
      {
        question: 'What guardrails do you enforce to prevent hallucinations, bias, or unsafe behaviour in mission-critical tasks?',
        answer: `<ul>
<li>Confidence thresholds with automatic escalation</li>
<li>Output validation against known-good patterns</li>
<li>Bias detection and mitigation in training data selection</li>
<li>Restricted action spaces for autonomous agents</li>
<li>Regular bias audits and fairness testing</li>
</ul>`
      },
      {
        question: 'Can we configure human approval gates, confidence thresholds, or human-in-the-loop interventions?',
        answer: `<p>Yes, fully configurable:</p>
<ul>
<li>Approval gates at any workflow stage</li>
<li>Adjustable confidence thresholds (e.g., auto-approve above 95%)</li>
<li>Mandatory human review for specified action types</li>
<li>Escalation workflows for edge cases</li>
<li>Real-time intervention capabilities</li>
</ul>`
      },
      {
        question: 'What visual verification and testing capabilities do you provide?',
        answer: `<p>We provide a sophisticated Human-in-the-Loop Verification system that combines AI generation with human oversight:</p>
<div class="faq-image-container"><img src="/human_in_loop_verfication.png" alt="Human-in-the-Loop Verification System with AI Generation, DevOps, Continuous Improvement, and Automated Testing" class="faq-image"></div>
<p><strong>Why High-Quality Verification UI/UX Matters:</strong></p>
<ul>
<li><strong>Faster verification cycles</strong> - Intuitive interfaces reduce time spent reviewing AI outputs</li>
<li><strong>Higher accuracy</strong> - Clear visual presentation helps humans catch errors AI might miss</li>
<li><strong>Lower cognitive load</strong> - Well-designed UI prevents reviewer fatigue and maintains quality</li>
<li><strong>Better feedback capture</strong> - Easy rejection workflows ensure AI learns from mistakes</li>
<li><strong>Audit trail</strong> - Every human decision is logged for compliance and continuous improvement</li>
<li><strong>Trust building</strong> - Transparent AI reasoning builds confidence in the system</li>
</ul>
<p><strong>Verification UI/UX Features:</strong></p>
<ul>
<li>Visual verification interface for human review of AI-generated outputs</li>
<li>Side-by-side comparison of AI generation vs expected results</li>
<li>One-click approval/rejection with feedback capture</li>
<li>Transparent AI reasoning display for informed decisions</li>
</ul>
<p><strong>Continuous Testing & Continuous Improvement (CT/CI):</strong></p>
<ul>
<li>Automated testing pipelines for AI outputs</li>
<li>Regression testing against known-good baselines</li>
<li>Performance monitoring and quality metrics</li>
<li>DevOps integration for seamless deployment</li>
<li>Continuous improvement feedback loops</li>
</ul>
<p><strong>Agentic Process Automation (APA):</strong></p>
<ul>
<li>AI agents that plan, execute, and self-evaluate tasks</li>
<li>API integrations with ERP, inventory, MRP, and customer systems</li>
<li>Automated data validation and cross-system verification</li>
<li>Human oversight at critical decision points</li>
</ul>`
      },
      {
        question: 'How do you handle incidents where the AI makes incorrect or harmful decisions?',
        answer: `<ul>
<li>Immediate incident logging and notification</li>
<li>Root cause analysis within 24 hours</li>
<li>Corrective action implementation</li>
<li>Client notification and transparency</li>
<li>Continuous improvement feedback loops</li>
<li>Optional: automatic rollback capabilities</li>
</ul>`
      }
    ]
  },
  {
    id: 'j',
    title: 'J. Compliance, Legal & Regulatory Requirements',
    items: [
      {
        question: 'Are you fully compliant with GDPR, EU AI Act, CCPA, and local data laws (e.g., KSA, UAE)?',
        answer: `<p>Yes, we maintain compliance with:</p>
<ul>
<li><strong>GDPR</strong>: Full compliance including DPA, SCCs, and data subject rights</li>
<li><strong>EU AI Act</strong>: High-risk AI system requirements where applicable</li>
<li><strong>CCPA</strong>: California privacy requirements supported</li>
<li><strong>Regional laws</strong>: We can adapt to KSA, UAE, and other jurisdictional requirements</li>
</ul>`
      },
      {
        question: 'Do you provide operational support for data erasure (right to be forgotten) and data portability?',
        answer: `<p>Yes:</p>
<ul>
<li>Automated data erasure upon request (within 30 days)</li>
<li>Data export in standard formats (JSON, CSV)</li>
<li>API endpoints for programmatic data access</li>
<li>Audit trail of erasure requests</li>
</ul>`
      }
    ]
  },
  {
    id: 'k',
    title: 'K. Implementation, Integration & Customisation',
    items: [
      {
        question: 'How do you integrate with complex enterprise systems (SAP, Oracle, Salesforce, Dynamics, ServiceNow)?',
        answer: `<p>We provide:</p>
<ul>
<li>Pre-built connectors for major platforms</li>
<li>Custom API integration development</li>
<li>Middleware support (MuleSoft, Dell Boomi, etc.)</li>
<li>Real-time and batch data synchronization</li>
<li>SSO/SAML integration</li>
</ul>`
      },
      {
        question: 'What percentage of the build is truly no-code vs custom engineering for large enterprises?',
        answer: `<p>Typical split:</p>
<ul>
<li>40-60% no-code configuration (workflows, prompts, rules)</li>
<li>20-30% low-code customization (UI, integrations)</li>
<li>20-30% custom engineering (complex logic, enterprise integrations)</li>
</ul>
<p>The exact ratio depends on your requirements and existing systems.</p>`
      },
      {
        question: 'What is the typical implementation timeline (scoping → MVP → production) for a project of our complexity?',
        answer: `<p>Standard timeline:</p>
<ul>
<li><strong>Scoping</strong>: 1-2 weeks</li>
<li><strong>MVP Development</strong>: 4-6 weeks</li>
<li><strong>Testing & UAT</strong>: 2-3 weeks</li>
<li><strong>Production Deployment</strong>: 1 week</li>
<li><strong>Total</strong>: 8-12 weeks for complex projects</li>
</ul>
<p>We offer free POC to validate approach before full commitment.</p>`
      }
    ]
  },
  {
    id: 'l',
    title: 'L. Cost, Licensing & Total Cost of Ownership',
    items: [
      {
        question: 'What is the pricing model (tokens, transactions, agents, seats, compute usage), and what scales cost the most?',
        answer: `<p>Pricing depends on delivery model:</p>
<ul>
<li><strong>FDE</strong>: Fixed monthly fee with included usage</li>
<li><strong>Project</strong>: Time & materials or fixed price</li>
</ul>
<p>Primary cost drivers:</p>
<ul>
<li>Token usage (for LLM calls)</li>
<li>Storage (for vector DBs and documents)</li>
<li>Compute (for complex processing)</li>
</ul>
<p>Contact us for detailed pricing: <a href="https://www.zealsourcing.fi/team" target="_blank" rel="noopener">https://www.zealsourcing.fi/team</a></p>`
      },
      {
        question: 'Are there additional costs for maintenance, changes, API usage, or third-party model calls?',
        answer: `<ul>
<li><strong>FDE</strong>: All-inclusive monthly fee - no hidden costs</li>
<li><strong>Project</strong>: Separate maintenance agreement available</li>
</ul>
<p>Third-party costs (Google Cloud, Vercel, LLM providers) are typically included or passed through at cost.</p>`
      }
    ]
  },
  {
    id: 'm',
    title: 'M. Technical Architecture & Operational Transparency',
    items: [
      {
        question: 'Can you provide a detailed data flow diagram showing where each component (LLM, vectors, APIs) sits?',
        answer: `<p>Yes, we provide:</p>
<ul>
<li>Architecture documentation for your deployment</li>
<li>Data flow diagrams</li>
<li>Security boundary documentation</li>
<li>Integration specifications</li>
</ul>
<p>Standard stack: TypeScript → Vercel (serverless) → Supabase/Firebase Firestore → Google Gemini</p>
<p>Reference architecture documentation:</p>
<ul>
<li><a href="https://vercel.com/docs/concepts" target="_blank" rel="noopener">Vercel Architecture</a></li>
<li><a href="https://supabase.com/docs/guides/getting-started/architecture" target="_blank" rel="noopener">Supabase Architecture</a></li>
<li><a href="https://vercel.com/marketplace/supabase" target="_blank" rel="noopener">Vercel + Supabase Integration</a></li>
</ul>`
      },
      {
        question: 'Is data encrypted end-to-end, and can we manage our own encryption keys?',
        answer: `<p>Yes, leveraging Vercel's enterprise-grade encryption:</p>
<ul>
<li><strong>Data at rest</strong>: AES-256 encryption</li>
<li><strong>Data in transit</strong>: HTTPS/TLS (all deployments served exclusively over HTTPS)</li>
<li><strong>SSL certificates</strong>: Automatically generated and renewed at no charge</li>
<li>Customer-managed encryption keys (CMEK) available for enterprise</li>
<li>Bring Your Own Key (BYOK) supported</li>
</ul>
<p><strong>Additional Vercel Security Features:</strong></p>
<ul>
<li>Enterprise-grade Web Application Firewall (WAF) included at no cost</li>
<li>Automatic DDoS mitigation built into the platform</li>
<li>Low-quality traffic filtering enabled by default</li>
<li>Firewall observability with detailed access logs</li>
<li>Role-based access control (RBAC)</li>
<li>Audit logs for accountability</li>
</ul>
<p>More details: <a href="https://vercel.com/docs/security" target="_blank" rel="noopener">https://vercel.com/docs/security</a></p>`
      },
      {
        question: 'How do you version, test, and update agents when LLM vendors release new model versions?',
        answer: `<p>Our update process:</p>
<ul>
<li>New model evaluation in staging environment</li>
<li>Performance benchmarking against current version</li>
<li>Regression testing with client-specific test cases</li>
<li>Staged rollout with monitoring</li>
<li>Automatic rollback capability</li>
<li>Client notification before major changes</li>
</ul>`
      }
    ]
  },
  {
    id: 'n',
    title: 'N. Model Hosting & Deployment Options',
    items: [
      {
        question: 'Can agents run inside our own Azure/GCP/AWS tenant or private VPC?',
        answer: `<p>Yes, we support:</p>
<ul>
<li>Deployment in customer's cloud tenant</li>
<li>Private VPC configurations</li>
<li>VPN connectivity options</li>
<li>Hybrid cloud architectures</li>
</ul>`
      },
      {
        question: 'Do you support on-prem or sovereign-cloud deployment?',
        answer: `<p>Yes:</p>
<ul>
<li>On-premises deployment available (additional setup required)</li>
<li>Sovereign cloud support (Azure Government, AWS GovCloud, etc.)</li>
<li>Air-gapped deployment options for high-security environments</li>
<li>Local LLM hosting options where required</li>
</ul>`
      }
    ]
  },
  {
    id: 'o',
    title: 'O. Our Products - Professional Demand Manager',
    items: [
      {
        question: 'What is Professional Demand Manager and what problems does it solve?',
        answer: `<p>Professional Demand Manager is an AI-powered procurement automation platform with agentic process optimization for enterprise demand management and supplier orchestration. It helps organizations:</p>
<ul>
<li>Search and analyze 400+ verified suppliers across multiple categories</li>
<li>Find vendors for professional services (consulting, training, R&D, legal services)</li>
<li>Automate procurement workflows and decision-making</li>
<li>Make data-driven vendor selection decisions</li>
</ul>
<p>Demo: <a href="https://demand-manager.vercel.app/" target="_blank" rel="noopener">https://demand-manager.vercel.app/</a></p>`
      },
      {
        question: 'What are the key features of Professional Demand Manager?',
        answer: `<ul>
<li><strong>Supplier Search</strong>: Fuzzy, case-insensitive search across 400+ suppliers</li>
<li><strong>AI-Powered Assistant</strong>: Multiple LLM options (Gemini, Grok) for intelligent procurement assistance</li>
<li><strong>Document Analysis</strong>: Process and analyze procurement documents (PDF, Excel, Word, CSV)</li>
<li><strong>System Prompt Management</strong>: Production and testing versions with version control</li>
<li><strong>Supplier Statistics</strong>: Real-time analytics on supplier distribution</li>
<li><strong>Export Capabilities</strong>: Download supplier data and search results as CSV</li>
<li><strong>Function Calling</strong>: Direct database queries for supplier data, contracts, and invoices</li>
</ul>`
      },
      {
        question: 'What types of supplier searches can Professional Demand Manager perform?',
        answer: `<p>The platform can search across multiple data sources:</p>
<ul>
<li>External labour suppliers (410+ suppliers)</li>
<li>Training invoices and 2023 financial data</li>
<li>iPRO contracts (active and expired)</li>
<li>Training suppliers with A/B/C classifications</li>
<li>Purchase requisitions in Basware format</li>
</ul>`
      }
    ]
  },
  {
    id: 'p',
    title: 'P. Our Products - Massify',
    items: [
      {
        question: 'What is Massify and how does it help with proposal generation?',
        answer: `<p>Massify is a platform that helps you create mass tailored proposals with sophisticated price calculations. It personalizes each proposal for every recipient with intelligent pricing automation. Key benefits:</p>
<ul>
<li>Generate personalized proposals for multiple recipients simultaneously</li>
<li>Advanced price calculations tailored to each recipient</li>
<li>AI-powered proposal personalization and optimization</li>
<li>Automated pricing strategies based on recipient data</li>
<li>Streamlined proposal workflow and increased conversion rates</li>
</ul>
<p>Demo: <a href="https://massify.vercel.app/" target="_blank" rel="noopener">https://massify.vercel.app/</a></p>`
      },
      {
        question: "What are Massify's core capabilities?",
        answer: `<ul>
<li><strong>Mass Proposal Generation</strong>: Create personalized proposals for multiple recipients simultaneously</li>
<li><strong>Sophisticated Pricing Engine</strong>: Advanced price calculations tailored to each recipient</li>
<li><strong>AI-Powered Assistant</strong>: Multiple LLM options for intelligent proposal creation</li>
<li><strong>Document Analysis</strong>: Process proposal templates and data (PDF, Excel, Word, CSV)</li>
<li><strong>Price Optimization</strong>: AI-driven pricing recommendations and strategies</li>
<li><strong>CRM Integration</strong>: Access to 6,446 customers with merged service history</li>
<li><strong>Multi-language Support</strong>: Create proposals in multiple languages</li>
</ul>`
      },
      {
        question: 'Who benefits most from using Massify?',
        answer: `<p>Massify is perfect for:</p>
<ul>
<li><strong>Sales Teams</strong>: Generate personalized proposals for multiple prospects simultaneously</li>
<li><strong>B2B Companies</strong>: Create tailored quotes with sophisticated pricing for different customer segments</li>
<li><strong>Service Providers</strong>: Mass customize service proposals based on client needs</li>
<li><strong>Agencies</strong>: Batch create personalized pitches with dynamic pricing</li>
<li><strong>Enterprise Sales</strong>: Automate proposal workflow while maintaining personalization at scale</li>
</ul>`
      }
    ]
  },
  {
    id: 'q',
    title: 'Q. Our Products - Retta Property Manager AI',
    items: [
      {
        question: 'What is Retta Property Manager AI and what does it automate?',
        answer: `<p>Retta Laskutusapuri (Retta Property Manager AI) is an AI-powered invoicing assistant for property management. It provides:</p>
<ul>
<li>Intelligent billing automation and financial operations</li>
<li>Multi-tab parallel processing for up to 200 invoice rows across 4 AI assistants</li>
<li>Document intelligence for PDF, Excel, CSV, and Word documents</li>
<li>Real-time ERP integration via function calling</li>
<li>Automatic data splitting for large Excel files</li>
</ul>
<p>Demo: <a href="https://retta-property-manager-ai.vercel.app/" target="_blank" rel="noopener">https://retta-property-manager-ai.vercel.app/</a></p>`
      },
      {
        question: 'What are the key invoicing operations Retta can handle?',
        answer: `<ul>
<li><strong>Invoice Processing</strong>: Automated analysis and categorization of sales invoices</li>
<li><strong>Payment Tracking</strong>: Monitor payment status and overdue invoices</li>
<li><strong>Financial Analytics</strong>: Generate insights from billing data</li>
<li><strong>Billing Process Optimization</strong>: Streamline invoicing workflows</li>
<li><strong>Document Intelligence</strong>: Extract key information from invoice documents</li>
<li><strong>Compliance Monitoring</strong>: Ensure adherence to invoicing policies and procedures</li>
<li><strong>Tiliöinti Generation</strong>: Automatic accounting entries from invoice data</li>
</ul>`
      },
      {
        question: 'How does Retta handle large invoice files?',
        answer: `<p>Retta uses a unified Excel processing architecture:</p>
<ul>
<li>All Excel data follows the same processing path regardless of size</li>
<li>Data is split into 20-row chunks automatically</li>
<li>Chunks are stored in Firestore for reliable processing</li>
<li>Sequential processing with 500ms delays respects API limits</li>
<li>Results are consolidated into a single MyyntiExcel output</li>
<li>Maximum capacity: 260 rows per batch across 13 sequential tabs</li>
</ul>`
      }
    ]
  },
  {
    id: 'r',
    title: 'R. Our Products - Professional Buyer',
    items: [
      {
        question: 'What is Professional Buyer and what is its purpose?',
        answer: `<p>Professional Buyer is a specialized AI-powered procurement assistant focused on supplier search, vendor selection, and procurement intelligence. It helps users:</p>
<ul>
<li>Search and analyze 410+ verified external labour suppliers</li>
<li>Find vendors for professional services (IT consulting, business consulting, training, R&D, legal)</li>
<li>Access procurement policies and guidelines</li>
<li>Make data-driven vendor selection decisions</li>
</ul>
<p>Demo: <a href="https://professional-buyer.vercel.app/" target="_blank" rel="noopener">https://professional-buyer.vercel.app/</a></p>`
      },
      {
        question: 'What features does Professional Buyer offer for procurement teams?',
        answer: `<ul>
<li><strong>External Labour Supplier Search</strong>: Fuzzy, case-insensitive search across 410+ suppliers</li>
<li><strong>AI-Powered Chat</strong>: Google Gemini AI for intelligent procurement assistance</li>
<li><strong>Document Analysis</strong>: Process procurement documents (PDF, Excel, Word, CSV)</li>
<li><strong>Policy Context Viewer</strong>: Browse procurement policies with paged navigation</li>
<li><strong>Supplier Statistics</strong>: Real-time analytics on supplier distribution and compliance</li>
<li><strong>Export Capabilities</strong>: Download supplier data and search results as CSV</li>
<li><strong>Contract Analysis</strong>: Access iPRO contracts and track active/expired status</li>
</ul>`
      },
      {
        question: 'What data sources can Professional Buyer query?',
        answer: `<p>Professional Buyer can search across:</p>
<ul>
<li>External labour suppliers (410+ suppliers, IT categories excluded)</li>
<li>Training invoices and 2023 financial data</li>
<li>iPRO contracts with active/expired status</li>
<li>Training suppliers with A/B/C classifications</li>
<li>Purchase requisitions in Basware format</li>
<li>Continuous improvement logs for tracking AI performance</li>
</ul>`
      }
    ]
  }
];
