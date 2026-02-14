import SEO from "@/components/seo";
import EnterprisePlanConfigurator from "@/components/EnterprisePlanConfigurator";

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Configure your enterprise compliance solution. All plans are built on the same Intelleges protocols and templates used by leading enterprises."
      />
      <EnterprisePlanConfigurator />
    </>
  );
}
