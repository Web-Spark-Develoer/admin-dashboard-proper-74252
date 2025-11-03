const Blog = () => {
  const posts = [
    {
      title: "Understanding Ocean Freight: A Complete Guide",
      date: "January 15, 2025",
      excerpt: "Learn everything you need to know about ocean freight shipping, from container types to customs procedures.",
      category: "Shipping"
    },
    {
      title: "5 Ways to Reduce Your Shipping Costs",
      date: "January 10, 2025",
      excerpt: "Discover practical strategies to optimize your shipping expenses without compromising on service quality.",
      category: "Business Tips"
    },
    {
      title: "Air Freight vs. Ocean Freight: Making the Right Choice",
      date: "January 5, 2025",
      excerpt: "Compare the pros and cons of air and ocean freight to determine the best option for your business needs.",
      category: "Logistics"
    },
    {
      title: "The Future of Last-Mile Delivery",
      date: "December 28, 2024",
      excerpt: "Explore emerging trends and technologies shaping the future of last-mile delivery services.",
      category: "Innovation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Excel Logistics Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Insights, tips, and news from the world of logistics and shipping
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground hover:text-accent transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <button className="text-accent font-semibold hover:underline">
                  Read More →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
