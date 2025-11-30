import SEO from "@/components/seo";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for Intelleges Federal Compliance Management System - GDPR and U.S. Compliant"
      />
      
      <div className="container py-16 max-w-4xl">
        <h1 className="text-4xl font-light tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: November 30, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-medium mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Intelleges ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our compliance management platform and related services (the "Service"). This policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Account Information:</strong> Name, email address, company name, phone number, job title</li>
              <li><strong>Profile Data:</strong> User preferences, settings, and customizations</li>
              <li><strong>Business Data:</strong> Supplier information, compliance documents, questionnaire responses</li>
              <li><strong>Communication Data:</strong> Messages, support tickets, feedback</li>
              <li><strong>Payment Information:</strong> Billing address, payment method details (processed by third-party payment processors)</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Information Automatically Collected</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent, click patterns</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Log Data:</strong> Access times, error logs, performance metrics</li>
              <li><strong>Cookies and Tracking Technologies:</strong> Session cookies, analytics cookies, preference cookies</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">2.3 Marketing Website Data Collection</h3>
            <p className="text-muted-foreground mb-3">
              When you visit our marketing website (intelleges.com), we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Contact Information:</strong> Name, email, and company when downloading resources</li>
              <li><strong>Download Activity:</strong> Tracking of resource downloads and document access</li>
              <li><strong>Analytics Data:</strong> Website usage patterns via Google Analytics</li>
              <li><strong>Visitor Intelligence:</strong> B2B marketing insights via Apollo.io for enterprise outreach</li>
              <li><strong>Meeting Scheduling Data:</strong> Information collected via Calendly when booking consultations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Service Delivery:</strong> To provide, maintain, and improve the Service</li>
              <li><strong>Account Management:</strong> To create and manage your account</li>
              <li><strong>Communication:</strong> To send you updates, notifications, and support messages</li>
              <li><strong>Compliance:</strong> To help you meet regulatory and compliance requirements</li>
              <li><strong>Analytics:</strong> To understand how users interact with the Service and improve user experience</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
              <li><strong>Legal Obligations:</strong> To comply with applicable laws and regulations</li>
            </ul>
           </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">3.1 Processing of Supplier Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Intelleges processes supplier information on behalf of our customers (data controllers), including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Business Contact Information:</strong> Supplier company names, contact persons, email addresses, phone numbers</li>
              <li><strong>Compliance Certifications:</strong> ISO certifications, quality management documentation, regulatory approvals</li>
              <li><strong>Insurance Certificates:</strong> Liability insurance, workers' compensation, professional indemnity coverage</li>
              <li><strong>Questionnaire Responses:</strong> Compliance questionnaires, due diligence forms, capability assessments</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              As a data processor, we process this information only as directed by our customers and in accordance with our data processing agreements. Our customers remain the data controllers responsible for ensuring lawful processing of supplier data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For users in the European Economic Area (EEA), we process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Contract Performance:</strong> Processing necessary to provide the Service you've requested</li>
              <li><strong>Legitimate Interests:</strong> To improve our Service, prevent fraud, and ensure security</li>
              <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or court order</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>ISO 27001 Certification:</strong> Our information security management system is certified</li>
              <li><strong>Encryption:</strong> Data is encrypted in transit (TLS/SSL) and at rest (AES-256)</li>
              <li><strong>Access Controls:</strong> Role-based access and multi-factor authentication</li>
              <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
              <li><strong>Incident Response:</strong> Procedures for detecting and responding to security breaches</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When data is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for processing based on consent</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@intelleges.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">9. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Track visits across websites for advertising purposes</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can control cookies through your browser settings. Note that disabling certain cookies may limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">10. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our Service may integrate with third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Google Analytics (analytics)</li>
              <li>SendGrid (email delivery)</li>
              <li>Stripe (payment processing)</li>
              <li>AWS (cloud hosting)</li>
              <li>LinkedIn Insight Tag (marketing)</li>
              <li>Apollo.io (visitor tracking)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These third parties have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">11. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">12. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">13. California Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California residents have additional rights under the CCPA:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">14. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">15. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 text-muted-foreground">
              <p><strong>Data Protection Officer</strong></p>
              <p>Email: privacy@intelleges.com</p>
              <p>Phone: +1-917-818-0225</p>
              <p className="mt-4">
                <strong>EU Representative (for GDPR inquiries):</strong><br />
                Email: gdpr@intelleges.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">16. Supervisory Authority</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you are located in the EEA and believe we have not addressed your concerns adequately, you have the right to lodge a complaint with your local data protection supervisory authority.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
