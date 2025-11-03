const Corporate = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Corporate Responsibility
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Building a sustainable future through responsible business practices
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Environmental Sustainability</h2>
            <p className="text-muted-foreground mb-8">
              At Excel Logistics, we are committed to reducing our environmental footprint through innovative 
              green initiatives. Our fleet of electric and hybrid vehicles, combined with optimized routing 
              algorithms, helps us minimize emissions while maintaining efficient delivery times.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="bg-card p-6 rounded-lg">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Carbon Neutral Goal</h3>
                <p className="text-muted-foreground">
                  Committed to achieving carbon neutrality by 2030 through renewable energy and offset programs.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Sustainable Packaging</h3>
                <p className="text-muted-foreground">
                  Using 100% recyclable materials and encouraging customers to reuse packaging.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Green Energy</h3>
                <p className="text-muted-foreground">
                  50% of our facilities now run on renewable energy sources.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Community Engagement</h2>
            <p className="text-muted-foreground mb-6">
              We believe in giving back to the communities we serve. Through our Community First program, 
              we partner with local organizations to support education, disaster relief, and economic development.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Diversity & Inclusion</h2>
            <p className="text-muted-foreground mb-6">
              Excel Logistics is proud to foster a diverse and inclusive workplace where all employees can thrive. 
              We are committed to equal opportunity employment and creating a culture of respect and belonging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Corporate;
