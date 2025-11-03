const Portfolio = () => {
  const caseStudies = [
    {
      title: "Global E-Commerce Expansion",
      client: "TechRetail Inc.",
      challenge: "Needed to expand international shipping to 45 countries within 6 months",
      solution: "Implemented multi-carrier strategy with real-time tracking across all regions",
      results: "200% increase in international orders, 99.2% on-time delivery rate"
    },
    {
      title: "Healthcare Logistics Optimization",
      client: "MedSupply Co.",
      challenge: "Temperature-sensitive medical supplies requiring precise handling",
      solution: "Custom cold-chain logistics with 24/7 monitoring and express delivery",
      results: "Zero product loss, 100% compliance with regulatory standards"
    },
    {
      title: "Seasonal Demand Management",
      client: "Fashion Forward",
      challenge: "Handling 5x volume increase during holiday season",
      solution: "Scalable warehousing solution with flexible staffing and AI-powered forecasting",
      results: "Processed 500K+ orders in Q4 with 98% customer satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Success stories from businesses we've helped grow
          </p>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-2 text-foreground">{study.title}</h2>
                <p className="text-accent font-semibold mb-6">Client: {study.client}</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bold text-sm uppercase mb-2 text-muted-foreground">Challenge</h3>
                    <p className="text-foreground">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm uppercase mb-2 text-muted-foreground">Solution</h3>
                    <p className="text-foreground">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm uppercase mb-2 text-muted-foreground">Results</h3>
                    <p className="text-foreground font-semibold">{study.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Write Your Success Story?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how Excel Logistics can help your business thrive.
            </p>
            <button className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
