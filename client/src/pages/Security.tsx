import SEO from "@/components/seo";
import { Shield, Lock, Eye, FileCheck, Server, Users, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Security() {
  const certifications = [
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "NIST 800-171", description: "Controlled Unclassified Information" },
  ];

  const securityMeasures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption."
    },
    {
      icon: Shield,
      title: "Access Controls",
      description: "Role-based access control (RBAC) with multi-factor authentication (MFA) required for all users."
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Hosted on AWS with redundant systems, DDoS protection, and 99.9% uptime SLA."
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring, intrusion detection, and automated threat response systems."
    },
    {
      icon: Users,
      title: "Security Training",
      description: "All employees undergo regular security awareness training and background checks."
    },
    {
      icon: FileCheck,
      title: "Regular Audits",
      description: "Annual third-party security audits and penetration testing by certified professionals."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Security" 
        description="Intelleges Security Statement - ISO 27001 Certified Information Security Management"
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Security Statement
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Enterprise-grade security for mission-critical compliance data
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 border-b border-border/20">
        <div className="container">
          <h2 className="text-3xl font-light text-center mb-12">Certifications & Compliance</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center p-6 rounded-lg border border-border/40 bg-muted/20">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-light text-center mb-12">Security Measures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {securityMeasures.map((measure) => (
              <div key={measure.title} className="flex gap-4">
                <div className="shrink-0">
                  <measure.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{measure.title}</h3>
                  <p className="text-muted-foreground">{measure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Security Information */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none space-y-8">
            <h2 className="text-3xl font-light mb-8">Comprehensive Security Framework</h2>

            <div>
              <h3 className="text-2xl font-medium mb-4">1. Data Protection</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intelleges implements multiple layers of data protection to ensure the confidentiality, integrity, and availability of your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Encryption at Rest:</strong> All data stored in our databases is encrypted using AES-256 encryption</li>
                <li><strong>Encryption in Transit:</strong> All data transmitted between clients and servers uses TLS 1.3 protocol</li>
                <li><strong>Database Security:</strong> Encrypted backups, point-in-time recovery, and automated failover</li>
                <li><strong>Data Segregation:</strong> Logical data separation between customers with strict access controls</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">2. Access Management</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all user accounts</li>
                <li><strong>Role-Based Access Control (RBAC):</strong> Granular permissions based on job function</li>
                <li><strong>Single Sign-On (SSO):</strong> Support for SAML 2.0 and OAuth 2.0</li>
                <li><strong>Session Management:</strong> Automatic timeout and secure session handling</li>
                <li><strong>Audit Logging:</strong> Complete audit trail of all access and modifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">3. Infrastructure Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Cloud Provider:</strong> Hosted on AWS with ISO 27001 certified data centers</li>
                <li><strong>Network Security:</strong> Virtual Private Cloud (VPC), network segmentation, and firewall rules</li>
                <li><strong>DDoS Protection:</strong> AWS Shield and CloudFlare protection against distributed attacks</li>
                <li><strong>Redundancy:</strong> Multi-region deployment with automatic failover</li>
                <li><strong>Backup & Recovery:</strong> Daily encrypted backups with 30-day retention</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">4. Application Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Secure Development:</strong> OWASP Top 10 compliance and secure coding practices</li>
                <li><strong>Code Reviews:</strong> Mandatory peer review and automated security scanning</li>
                <li><strong>Dependency Management:</strong> Regular updates and vulnerability scanning of third-party libraries</li>
                <li><strong>Input Validation:</strong> Comprehensive validation and sanitization of all user inputs</li>
                <li><strong>API Security:</strong> Rate limiting, authentication, and encryption for all API endpoints</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">5. Monitoring & Incident Response</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>24/7 Monitoring:</strong> Continuous monitoring of systems and security events</li>
                <li><strong>Intrusion Detection:</strong> Automated detection and alerting of suspicious activities</li>
                <li><strong>Incident Response Plan:</strong> Documented procedures for security incident handling</li>
                <li><strong>Breach Notification:</strong> Commitment to notify affected parties within 72 hours</li>
                <li><strong>Forensics:</strong> Capability to investigate and analyze security incidents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">6. Compliance & Governance</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>ISO 27001:</strong> Certified Information Security Management System</li>

                <li><strong>GDPR Compliance:</strong> Full compliance with EU data protection regulations</li>
                <li><strong>CCPA Compliance:</strong> California Consumer Privacy Act compliance</li>
                <li><strong>NIST 800-171:</strong> Compliance with Controlled Unclassified Information requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">7. Physical Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Data Center Security:</strong> AWS data centers with 24/7 physical security</li>
                <li><strong>Access Controls:</strong> Biometric access and video surveillance</li>
                <li><strong>Environmental Controls:</strong> Fire suppression, climate control, and power redundancy</li>
                <li><strong>Asset Disposal:</strong> Secure destruction of hardware according to NIST guidelines</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">8. Employee Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Background Checks:</strong> All employees undergo comprehensive background verification</li>
                <li><strong>Security Training:</strong> Regular security awareness and compliance training</li>
                <li><strong>Confidentiality Agreements:</strong> All employees sign NDAs and security policies</li>
                <li><strong>Least Privilege:</strong> Employees have access only to data required for their role</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">9. Third-Party Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Vendor Assessment:</strong> Security evaluation of all third-party service providers</li>
                <li><strong>Data Processing Agreements:</strong> Contractual security and privacy requirements</li>
                <li><strong>Regular Reviews:</strong> Ongoing monitoring of third-party security posture</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">10. Business Continuity</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Disaster Recovery Plan:</strong> Documented procedures for service restoration</li>
                <li><strong>Backup Strategy:</strong> Automated daily backups with geographic redundancy</li>
                <li><strong>Uptime SLA:</strong> 99.9% availability guarantee</li>
                <li><strong>Failover Testing:</strong> Regular testing of disaster recovery procedures</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-16 border-t border-border/20">
        <div className="container max-w-4xl">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-medium mb-4">Responsible Disclosure Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intelleges is committed to working with security researchers to identify and resolve security vulnerabilities. If you believe you have discovered a security issue, please report it to our security team:
              </p>
              <div className="bg-muted/40 p-6 rounded-lg">
                <p className="text-muted-foreground mb-2"><strong>Email:</strong> security@intelleges.com</p>
                <p className="text-muted-foreground mb-2"><strong>PGP Key:</strong> Available upon request</p>
                <p className="text-muted-foreground"><strong>Response Time:</strong> We aim to acknowledge reports within 24 hours</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please provide detailed information about the vulnerability, including steps to reproduce. We request that you do not publicly disclose the issue until we have had an opportunity to address it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl font-medium mb-4">Questions About Our Security?</h2>
          <p className="text-muted-foreground mb-8">
            Our security team is available to answer questions and provide additional documentation.
          </p>
          <div className="text-muted-foreground">
            <p><strong>Security Team:</strong> security@intelleges.com</p>
            <p><strong>Compliance Team:</strong> compliance@intelleges.com</p>
            <p className="mt-4 text-sm">Last Updated: November 30, 2025</p>
          </div>
        </div>
      </section>
    </div>
  );
}
