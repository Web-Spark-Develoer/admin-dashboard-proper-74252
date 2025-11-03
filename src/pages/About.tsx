const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            About Excel Logistics
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Excel Logistics has been a trusted name in the shipping and logistics industry for over 50 years. 
              We pride ourselves on delivering exceptional service, innovative solutions, and unwavering reliability 
              to customers worldwide.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              To provide fast, reliable, and cost-effective logistics solutions that empower businesses and individuals 
              to connect with the world. We are committed to excellence in every shipment, every delivery, and every 
              customer interaction.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-foreground">Reliability</h3>
                <p className="text-muted-foreground">
                  We deliver on our promises, every time. Your packages are safe with us.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-foreground">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our processes and technology to serve you better.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-foreground">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our top priority. We go the extra mile for you.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Our History</h2>
            <p className="text-muted-foreground mb-6">
              Founded in 1970, Excel Logistics started as a small local delivery service. Through dedication, 
              innovation, and customer focus, we've grown into a global logistics provider serving millions of 
              customers across six continents.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
