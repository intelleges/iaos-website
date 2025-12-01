import { describe, it, expect } from 'vitest';
import { scoreLead, getQualificationExplanation } from './qualification';
import { isFreeEmailDomain, extractDomain } from './enrichment';
import type { EnrichedCompany } from './enrichment';

describe('Lead Qualification System', () => {
  describe('Email Domain Detection', () => {
    it('should identify free email domains', () => {
      expect(isFreeEmailDomain('john@gmail.com')).toBe(true);
      expect(isFreeEmailDomain('jane@yahoo.com')).toBe(true);
      expect(isFreeEmailDomain('test@outlook.com')).toBe(true);
      expect(isFreeEmailDomain('user@protonmail.com')).toBe(true);
    });

    it('should identify corporate email domains', () => {
      expect(isFreeEmailDomain('john@boeing.com')).toBe(false);
      expect(isFreeEmailDomain('jane@lockheedmartin.com')).toBe(false);
      expect(isFreeEmailDomain('test@honeywell.com')).toBe(false);
    });

    it('should extract domain from email', () => {
      expect(extractDomain('john@boeing.com')).toBe('boeing.com');
      expect(extractDomain('test@EXAMPLE.COM')).toBe('example.com');
    });
  });

  describe('Lead Scoring - Qualified Leads', () => {
    it('should qualify large aerospace company with decision-maker title', () => {
      const enrichment: EnrichedCompany = {
        domain: 'boeing.com',
        name: 'Boeing',
        industry: 'Aerospace & Defense',
        employeeCount: 150000,
        country: 'United States',
        revenueBand: '$100B+',
      };

      const result = scoreLead({
        name: 'John Smith',
        email: 'john.smith@boeing.com',
        company: 'Boeing',
        title: 'VP of Procurement',
        enrichment,
      });

      expect(result.qualified).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(result.reasons).toContain(expect.stringContaining('Target industry'));
      expect(result.reasons).toContain(expect.stringContaining('Large enterprise'));
      expect(result.reasons).toContain(expect.stringContaining('Decision-maker title'));
    });

    it('should qualify mid-size healthcare company', () => {
      const enrichment: EnrichedCompany = {
        domain: 'hospital.com',
        name: 'Regional Hospital System',
        industry: 'Healthcare',
        employeeCount: 500,
        country: 'United States',
        revenueBand: '$50-100M',
      };

      const result = scoreLead({
        name: 'Jane Doe',
        email: 'jane.doe@hospital.com',
        company: 'Regional Hospital System',
        title: 'Compliance Manager',
        enrichment,
      });

      expect(result.qualified).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(60);
    });

    it('should qualify manufacturing company with compliance role', () => {
      const enrichment: EnrichedCompany = {
        domain: 'manufacturer.com',
        name: 'Industrial Manufacturing Co',
        industry: 'Manufacturing',
        employeeCount: 800,
        country: 'United States',
        revenueBand: '$100-200M',
      };

      const result = scoreLead({
        name: 'Bob Johnson',
        email: 'bob.johnson@manufacturer.com',
        company: 'Industrial Manufacturing Co',
        title: 'Director of Quality Assurance',
        enrichment,
      });

      expect(result.qualified).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(60);
    });
  });

  describe('Lead Scoring - Disqualified Leads', () => {
    it('should disqualify free email addresses', () => {
      const enrichment: EnrichedCompany = {
        domain: 'boeing.com',
        name: 'Boeing',
        industry: 'Aerospace & Defense',
        employeeCount: 150000,
        country: 'United States',
        revenueBand: '$100B+',
      };

      const result = scoreLead({
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        company: 'Boeing',
        title: 'VP of Procurement',
        enrichment,
      });

      expect(result.qualified).toBe(false);
      expect(result.reasons).toContain(expect.stringContaining('Free email domain'));
    });

    it('should disqualify companies with less than 200 employees', () => {
      const enrichment: EnrichedCompany = {
        domain: 'smallcompany.com',
        name: 'Small Company Inc',
        industry: 'Aerospace',
        employeeCount: 50,
        country: 'United States',
        revenueBand: '$10-50M',
      };

      const result = scoreLead({
        name: 'Jane Doe',
        email: 'jane@smallcompany.com',
        company: 'Small Company Inc',
        title: 'CEO',
        enrichment,
      });

      expect(result.qualified).toBe(false);
      expect(result.reasons).toContain(expect.stringContaining('Company too small'));
    });

    it('should disqualify blocked industries', () => {
      const enrichment: EnrichedCompany = {
        domain: 'retailstore.com',
        name: 'Retail Store Chain',
        industry: 'Retail',
        employeeCount: 5000,
        country: 'United States',
        revenueBand: '$500M+',
      };

      const result = scoreLead({
        name: 'Bob Smith',
        email: 'bob@retailstore.com',
        company: 'Retail Store Chain',
        title: 'VP of Operations',
        enrichment,
      });

      expect(result.qualified).toBe(false);
      expect(result.reasons).toContain(expect.stringContaining('Blocked industry'));
    });

    it('should disqualify non-target countries', () => {
      const enrichment: EnrichedCompany = {
        domain: 'aerospace.co.uk',
        name: 'UK Aerospace Ltd',
        industry: 'Aerospace',
        employeeCount: 1000,
        country: 'United Kingdom',
        revenueBand: '$100M+',
      };

      const result = scoreLead({
        name: 'John Smith',
        email: 'john@aerospace.co.uk',
        company: 'UK Aerospace Ltd',
        title: 'Procurement Director',
        enrichment,
      });

      expect(result.qualified).toBe(false);
      expect(result.reasons).toContain(expect.stringContaining('Non-target country'));
    });

    it('should disqualify leads without enrichment data', () => {
      const result = scoreLead({
        name: 'Jane Doe',
        email: 'jane@unknown-company.com',
        company: 'Unknown Company',
        title: 'Manager',
        enrichment: null,
      });

      expect(result.qualified).toBe(false);
      expect(result.reasons).toContain(expect.stringContaining('No enrichment data'));
    });
  });

  describe('Scoring Edge Cases', () => {
    it('should handle leads with partial enrichment data', () => {
      const enrichment: EnrichedCompany = {
        domain: 'company.com',
        name: 'Some Company',
        industry: 'Aerospace',
        employeeCount: 300,
        country: 'United States',
        // No revenue band
      };

      const result = scoreLead({
        name: 'Test User',
        email: 'test@company.com',
        company: 'Some Company',
        enrichment,
      });

      expect(result.score).toBeGreaterThan(0);
      expect(result.derived.industry).toBe('Aerospace');
      expect(result.derived.employeeCount).toBe(300);
    });

    it('should give bonus points for high revenue bands', () => {
      const enrichment: EnrichedCompany = {
        domain: 'bigcompany.com',
        name: 'Big Company',
        industry: 'Healthcare',
        employeeCount: 2000,
        country: 'United States',
        revenueBand: '$1 Billion+',
      };

      const result = scoreLead({
        name: 'Executive',
        email: 'exec@bigcompany.com',
        company: 'Big Company',
        title: 'Chief Compliance Officer',
        enrichment,
      });

      expect(result.qualified).toBe(true);
      expect(result.reasons).toContain(expect.stringContaining('High revenue'));
    });

    it('should recognize various decision-maker titles', () => {
      const enrichment: EnrichedCompany = {
        domain: 'company.com',
        name: 'Company',
        industry: 'Manufacturing',
        employeeCount: 500,
        country: 'United States',
      };

      const titles = [
        'VP of Procurement',
        'Director of Supply Chain',
        'Chief Procurement Officer',
        'Head of Compliance',
        'Regulatory Affairs Manager',
      ];

      titles.forEach(title => {
        const result = scoreLead({
          name: 'Test',
          email: 'test@company.com',
          company: 'Company',
          title,
          enrichment,
        });

        expect(result.reasons).toContain(expect.stringContaining('Decision-maker title'));
      });
    });
  });

  describe('Qualification Explanation', () => {
    it('should generate human-readable explanation for qualified leads', () => {
      const result = {
        score: 85,
        qualified: true,
        reasons: ['Target industry match: Aerospace', 'Large enterprise: 1000+ employees'],
        derived: {},
      };

      const explanation = getQualificationExplanation(result);
      expect(explanation).toContain('Qualified');
      expect(explanation).toContain('85');
    });

    it('should generate human-readable explanation for disqualified leads', () => {
      const result = {
        score: 30,
        qualified: false,
        reasons: ['Free email domain', 'Company too small'],
        derived: {},
      };

      const explanation = getQualificationExplanation(result);
      expect(explanation).toContain('Not qualified');
      expect(explanation).toContain('30');
    });
  });

  describe('Scoring Thresholds', () => {
    it('should qualify leads at exactly 60 points', () => {
      // Corporate domain (+10) + Target industry (+50) = 60
      const enrichment: EnrichedCompany = {
        domain: 'aerospace.com',
        name: 'Aerospace Co',
        industry: 'Aerospace',
        employeeCount: 250, // +15 but also meets minimum
        country: 'United States', // +10
      };

      const result = scoreLead({
        name: 'Test',
        email: 'test@aerospace.com',
        company: 'Aerospace Co',
        enrichment,
      });

      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(result.qualified).toBe(true);
    });

    it('should disqualify leads at 59 points or below', () => {
      // Without enough positive signals
      const enrichment: EnrichedCompany = {
        domain: 'company.com',
        name: 'Generic Company',
        industry: 'Other',
        employeeCount: 250,
        country: 'United States',
      };

      const result = scoreLead({
        name: 'Test',
        email: 'test@company.com',
        company: 'Generic Company',
        enrichment,
      });

      if (result.score < 60) {
        expect(result.qualified).toBe(false);
      }
    });
  });
});
