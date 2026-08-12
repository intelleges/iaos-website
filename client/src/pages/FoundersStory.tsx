import SEO from "@/components/seo";
import "./FoundersStory.css";

const ENTITIES = [
  {
    n: "01",
    name: "Person",
    desc: "The party responsible for the process. The user.",
  },
  {
    n: "02",
    name: "Partner",
    desc: "An organization, and its relationship to another organization.",
  },
  {
    n: "03",
    name: "Protocol",
    desc: "The requirement that has to be satisfied.",
  },
  {
    n: "04",
    name: "Touchpoint",
    desc: "The point at which a requirement becomes operational.",
  },
  {
    n: "05",
    name: "Questionnaire",
    desc: "The structured mechanism for obtaining information. Both the data and the documents.",
  },
  {
    n: "06",
    name: "AMS",
    desc: "The communication layer that moves people through the process.",
  },
  {
    n: "07",
    name: "CMS",
    desc: "The content that explains what people need to know and do.",
  },
];

const STRESS_QUESTIONS = [
  "What happens when the same supplier sells to multiple sites?",
  "How do sites share information without losing their own relationships?",
  "What happens when a supplier has no email?",
  "Which requirement applies to which supplier, site, buyer, and event?",
  "What happened, who did it, when — and where is the evidence?",
];

const STATS = [
  { num: "400", lab: "Sites worldwide" },
  { num: "750", lab: "Users" },
  { num: "15", lab: "Compliance protocols" },
];

const PROTOCOLS = [
  "Annual Reps & Certs",
  "Buy American Act",
  "C-TPAT",
  "Counterfeit Parts",
  "Conflict Minerals",
  "Sole Source",
  "ITAR / Export",
  "Supplier Diversity",
  "Cybersecurity",
  "Flowdowns",
];

export default function FoundersStory() {
  return (
    <div className="founders-story">
      <SEO
        title="Our Founder's Story"
        description="Twenty-five years inside federal compliance taught one lesson, over and over. How the model was built, how it was stress-tested, and why this is the moment it finally scales — in the words of Intelleges founder John Betancourt."
        canonical="https://www.intelleges.com/founders-story"
        type="article"
        keywords="Intelleges founder, John Betancourt, federal compliance architecture, supplier compliance, FCMS"
      />

      <header className="hero">
        <div className="wrap">
          <span className="mono">Intelleges · Our Founder's Story</span>
          <h1>
            When a problem looks impossibly complicated,{" "}
            <em>find the underlying structure.</em>
          </h1>
          <p className="lede">
            Twenty-five years inside federal compliance taught one lesson, over
            and over. How the model was built, how it was stress-tested, and why
            this is the moment it finally scales — in the words of our founder.
          </p>
          <p className="byline">John Betancourt · Founder &amp; CEO, Intelleges</p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <span className="mono sec-index">01 · Origins</span>
          <h2>It begins with mathematics</h2>
          <p>
            My father was a distinguished lawyer who studied at the University of
            Havana around 1950. But one of the most important things he gave me
            had nothing to do with law. He taught me mathematics — how to break
            complicated problems into their parts, understand the relationships
            between them, look for the underlying structure, and never be
            intimidated by complexity.
          </p>
          <p>
            My stepfather reinforced it from another direction. Harvard class of
            1944, a PhD in economics in 1960. I began working for him young,
            exposed early to economics, quantitative analysis, and the idea that
            organizations could be understood as systems.
          </p>
          <p>
            Mathematics and economics became the intellectual foundation for
            almost everything I would eventually do.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">02 · Finance to architecture</span>
          <h2>Learning to think in dimensions</h2>
          <p>
            My career took me into major financial institutions — Citibank, then
            Chase — as computing was transforming finance. I became less
            interested in programming than in how information should be{" "}
            <em>structured</em>.
          </p>
          <p>
            Traditional databases encourage you to think in rows and columns.
            Businesses do not operate that way. They operate across dimensions at
            once: customer, product, geography, organization, time, transaction,
            account, business unit, scenario. Once you think multidimensionally,
            you stop seeing isolated records and start seeing relationships.
          </p>
          <p>
            I worked deeply with Essbase, one of the pioneering multidimensional
            platforms. The company behind it recruited me to become a senior
            architect; I went another way when Philip Morris brought me to
            Lausanne. Throughout, one question kept replacing another.
          </p>
          <div className="pull">
            The question was no longer{" "}
            <em className="q">how do we build this program?</em> It became{" "}
            <em className="q">what is the true structure of the problem?</em>
          </div>
          <p>
            Get that structure right, and the applications around it can evolve
            for decades without forcing you to reinvent the model.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">03 · The Federal Reserve</span>
          <h2>When systems matter, architecture matters</h2>
          <p>
            By around 2000, that path had taken me to the Federal Reserve Bank of
            New York — an environment that reinforced a principle that mattered
            enormously later. You have to understand state, controls,
            relationships, accountability, information integrity, and what
            happens when something goes wrong.
          </p>
          <p>
            You cannot depend on somebody remembering what should happen next.
            You design the system so that the process itself carries the
            discipline.
          </p>
          <p>Then I encountered federal contracting.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">04 · The Department of Defense</span>
          <h2>I did not see a paperwork problem</h2>
          <p>
            Around 2000, I began working in the Department of Defense
            environment, and started looking seriously at federal compliance.
            What struck me was extraordinary: some of the most sophisticated
            organizations in the world were managing incredibly complicated
            federal requirements with paper forms, spreadsheets, email, telephone
            calls, shared drives, and people's memories.
          </p>
          <p>
            I did not look at that and see a paperwork problem. I saw an
            architecture problem. Thousands of transactions — but underneath
            them, a relatively small number of fundamental things.
          </p>
        </div>
      </section>

      <section className="model">
        <div className="wrap">
          <span className="mono sec-index">The model</span>
          <h2>Seven entities. They never changed.</h2>
          <p>
            Beneath every regulation, customer, and transaction were the same
            seven things. Not designed around one rule or one client — the
            underlying structure of the problem itself.
          </p>
          <div className="entities">
            {ENTITIES.map((entity) => (
              <div className="entity" key={entity.n}>
                <span className="n">{entity.n}</span>
                <div>
                  <span className="name">{entity.name}</span>
                  <div className="desc">{entity.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="held">
            Technology changed. Workflows grew. Regulations changed. Scale
            multiplied. More than twenty-five years later, the model still holds.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">05 · Honeywell</span>
          <h2>The real enterprise stress test</h2>
          <p>
            Then came Honeywell. Once we had corporate approval, Honeywell
            Aerospace soon followed. These were sophisticated people examining
            whether the architecture could withstand the realities of an enormous
            global enterprise — and their questions were not theoretical.
          </p>
          <div className="stress">
            <span className="mono">They tried to find the edge of the model</span>
            <p className="big-q">
              Can a global enterprise rely on this software for all of its
              audit-readiness requirements, everywhere it operates?
            </p>
            <ul>
              {STRESS_QUESTIONS.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <p>
            Those were exactly the questions I had spent a career learning to
            answer. When they asked about the same vendor across sites, I did not
            see a duplicate-record problem — I saw relationships, shadows, and
            references. When they asked about suppliers without email, we built
            another mechanism. Each question exposed a new operating reality.
            None required changing the fundamental architecture. All required
            clear thinking, reliable judgement, and unimpeachable integrity.
          </p>
          <div className="pull">
            Honeywell was trying to find the edge of the model.
            <br />
            <strong>The model kept holding.</strong>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">06 · Scale</span>
          <h2>Not a form system — an operating system</h2>
          <p>
            Eventually the scale became enormous. Honeywell Aerospace
            represented, approximately:
          </p>
          <div className="stats">
            {STATS.map((stat) => (
              <div className="stat" key={stat.lab}>
                <div className="num">{stat.num}</div>
                <div className="lab">{stat.lab}</div>
              </div>
            ))}
          </div>
          <p>
            — alongside a very large global supplier population. The protocols
            included programs such as:
          </p>
          <div className="chips">
            {PROTOCOLS.map((protocol) => (
              <span className="chip" key={protocol}>
                {protocol}
              </span>
            ))}
          </div>
          <p>
            People hear <em>compliance software</em> and imagine a questionnaire
            or a paper form. Every protocol could require regulatory
            interpretation, design, questionnaire and content development,
            supplier populations, buyer and site configuration, launch, support,
            exception management, correction, approval, evidence, and audit
            support.
          </p>
          <p>
            And none of it is a simple multiplication. The same supplier serves
            many sites; each site has its own buyers; each buyer touches many
            suppliers; each protocol applies differently across all of them. It
            is a many-to-many web — suppliers, sites, buyers, protocols, and
            events crossing each other thousands of times over. Every one of
            those crossings has to be tracked, monitored, and assigned to the
            person responsible for it.
          </p>
          <div className="pull">
            That is not a form system. <strong>It is an operating system.</strong>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">07 · Recognition</span>
          <h2>Proven, and recognized for it</h2>
          <p>
            Consider who was doing the recognizing. Battelle is the largest
            independent nonprofit research and development institute in the
            world, manages national laboratories for the U.S. Department of
            Energy, and ranks among the largest federal contractors in the
            country — a <em>Washington Technology</em> Top 100 organization
            operating at the highest tier of federal sensitivity.
          </p>
          <p>
            In 2023, <strong>Battelle</strong> named <strong>Intelleges</strong>{" "}
            its <strong>Supplier of the Year</strong> — after we transformed a
            manual, paper-based supplier-compliance process into an automated,
            audit-ready system across programs including Annual Reps &amp; Certs,
            Buy American Act, and Incurred Cost Submissions. The architecture did
            not just hold at that scale. It was recognized for it.
          </p>
          <blockquote className="testimonial">
            <p>
              &ldquo;Thanks to their support, we have been able to transform our
              supply chain, reduce costs and improve our processes. We look
              forward to expanding our relationship with Intelleges and
              continuing to use their platform to drive transformation in our
              overall procurement process.&rdquo;
            </p>
            <cite>
              Ed McFarland — Vice President, Contracts, Procurement &amp; Small
              Business Programs, Battelle
            </cite>
          </blockquote>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">08 · The historical constraint</span>
          <h2>The difficulty was never the problem</h2>
          <p>
            It was never whether the architecture worked, or whether
            sophisticated customers needed it. The constraint was{" "}
            <strong>resources</strong>.
          </p>
          <p>
            A company like Honeywell Aerospace could consume an extraordinary
            amount of expert capacity. Every protocol, customer, and supplier
            population required work. Questionnaires, communications,
            configurations, exceptions, features — much of that knowledge and
            work ultimately came back to me. I was not simply supervising the
            organization that performed these functions. Very often, I was part
            of the production system itself.
          </p>
          <div className="pull">
            If every new dollar of sophisticated revenue requires another
            proportional unit of scarce expert labor, eventually the expert
            becomes the constraint.
          </div>
          <p>
            Hiring was the obvious answer — but it meant substantial capital, and
            people do not instantly inherit decades of domain knowledge. So
            Intelleges held an unusual position: we could solve problems at the
            level the world's most sophisticated companies demanded, with
            small-company resources to do it.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="mono sec-index">09 · What changed</span>
          <h2>Two kinds of leverage that did not exist before</h2>
          <p>
            AI changes the equation. For the first time, we can take judgment,
            architecture, and domain knowledge accumulated over decades and
            surround it with enormous production capacity — without an enormous
            payroll. The work moves toward where it creates the most value:{" "}
            <strong>
              judgment, architecture, interpretation, governance, and the
              difficult decisions.
            </strong>
          </p>
          <div className="lev">
            <div className="card">
              <span className="mono">Production leverage</span>
              <p>
                AI helps analyze the requirement, draft the specification, build
                the questionnaire and content, prepare and test the
                implementation — and surface what requires human judgment.
              </p>
            </div>
            <div className="card">
              <span className="mono">Operational leverage</span>
              <p>
                FCMS puts each role where it belongs — suppliers, buyers, site
                administrators, reviewers, the System Master — and tracks all the
                traffic, so no one has to hold it in their head.
              </p>
            </div>
          </div>
          <p>
            AI gives Intelleges production leverage. Our principal product, the
            Federal Compliance Management System, gives the customer operational
            leverage. That combination did not exist when this began in 2000.
          </p>
        </div>
      </section>

      <section className="close">
        <div className="wrap">
          <span className="mono sec-index">Why now</span>
          <h2>The problem never left</h2>
          <p>
            Federal compliance is still extraordinarily complicated. Departments
            are still under-resourced. Suppliers still send bad information,
            emails still bounce, people still change jobs, documents still go
            missing, procurement still waits. And compliance still fails in the
            handoffs.
          </p>
          <p>
            The architecture held. Honeywell and other major organizations
            stress-tested it in the real world. What kept us from scaling was not
            the market or the solution. The constraint was resources — and AI
            changes the resource equation.
          </p>
          <div className="kicker">
            We have the right model. Now we have the right resources.
          </div>
          <p className="close-invite">
            Let's solve your compliance challenge together. We have the right
            experience, and we can help.
          </p>
          <a
            className="cta"
            href="https://calendly.com/intelleges/intelleges-introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Introduction
          </a>
        </div>
      </section>
    </div>
  );
}
