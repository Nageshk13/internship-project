import { useState, useEffect } from "react";

const Home = () => {
  const successStories = [
    {
      name: "Asha, Donor",
      text: "Donating here made me feel truly connected to a cause bigger than myself.",
      color: "text-blue-600",
    },
    {
      name: "Ravi, Volunteer",
      text: "Volunteering changed my life. It gave me purpose and lifelong friendships.",
      color: "text-green-600",
    },
    {
      name: "Neha, Donor",
      text: "I saw the direct impact of my contribution. That's rare.",
      color: "text-orange-600",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [successStories.length]);

  const prevStory = () => {
    setCurrent((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const nextStory = () => {
    setCurrent((prev) => (prev + 1) % successStories.length);
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/events");
        const data = await res.json();
        const campaignEvents = data.filter((event) => event.type === "Campaign");
        setCampaigns(campaignEvents);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="text-center py-24 bg-gray-100 border-b border-gray-200 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-600">
            One hand to give. One soul to serve. One system to unite. 🤝
          </h1>
          <p className="mb-8 text-gray-600 text-lg">
            Join a movement where compassion becomes action — connecting donors, empowering volunteers, and building hope through every moment of kindness.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="/donor">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full shadow-lg">
                Donate Now 💰
              </button>
            </a>
            <a href="/volunteer">
              <button className="bg-white text-blue-600 border border-blue-300 px-8 py-3 rounded-full shadow-lg hover:bg-gray-100">
                Join as Volunteer 🙌
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-14">📊 Our Impact So Far</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[{ count: "200+", label: "Active Volunteers", color: "text-green-500" },
            { count: "₹75K+", label: "Funds Raised", color: "text-blue-600" },
            { count: "50+", label: "Projects Completed", color: "text-orange-500" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border">
              <h3 className={`text-5xl font-extrabold ${item.color}`}>{item.count}</h3>
              <p className="mt-3 text-gray-600 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="py-20 bg-yellow-50 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">📅 Monthly Campaigns & Challenges</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {campaigns.length === 0 ? (
            <p className="text-gray-600 text-center col-span-3">No active campaigns currently.</p>
          ) : (
            campaigns.map((campaign, idx) => (
              <div key={campaign._id || idx} className="bg-white border rounded-2xl shadow-md p-6 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 text-sm">
                  {campaign.description || "Participate in our monthly initiative to help those in need."}
                </p>
                <p className="mt-2 text-xs text-gray-500">Date: {campaign.date?.split("T")[0]}</p>
                {campaign.goalAmount && <p className="text-xs text-gray-500">Goal: ₹{campaign.goalAmount}</p>}
              </div>
            ))
          )}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-20 bg-white border-t border-gray-200 px-6">
        <h2 className="text-3xl font-semibold text-center mb-14">🌟 Success Stories</h2>
        <div className="relative max-w-3xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {successStories.map((story, index) => (
              <div key={index} className="min-w-full px-6">
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md text-center">
                  <div className="text-4xl mb-4 text-gray-300">❝</div>
                  <p className="text-gray-700 italic mb-6">{story.text}</p>
                  <h4 className={`font-semibold ${story.color}`}>{story.name}</h4>
                </div>
              </div>
            ))}
          </div>
          <button onClick={prevStory} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
            ◀
          </button>
          <button onClick={nextStory} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
            ▶
          </button>
        </div>
      </section>

      {/* VOLUNTEER EXPERIENCES */}
      <section className="py-20 bg-blue-50 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">🧡 Volunteer Experiences</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-10">
          {[{ name: "Kiran", quote: "Every weekend, I look forward to giving back. It keeps me grounded." },
            { name: "Sana", quote: "Helping out at the shelters has been incredibly humbling and rewarding." },
            { name: "Arjun", quote: "The smiles I see are worth every second I spend volunteering." },
          ].map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg">
              <p className="italic text-gray-600 mb-4">"{v.quote}"</p>
              <h4 className="font-semibold text-blue-700">{v.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Moments That Matter */}
      <section className="py-20 px-6" style={{ backgroundColor: "#DFFFD6" }}>
        <h2 className="text-3xl font-semibold text-center mb-12">📸 Moments That Matter</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[{ title: "Empathy in Action", img: "/images/empathy.png" },
            { title: "Joy of Giving", img: "/images/giving.png" },
            { title: "Community Care", img: "/images/community.png" },
            { title: "Hope Restored", img: "/images/hope.png" },
            { title: "Together We Can", img: "/images/together.png" },
            { title: "Making Change", img: "/images/change.png" },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFF7ED" }}>
        <h2 className="text-3xl font-semibold text-center mb-12">💡 What Makes Us Unique</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto text-center">
          {[{
              icon: "🤖",
              title: "Smart Matchmaking",
              desc: "Intelligent algorithms connect donors and volunteers to the most impactful opportunities.",
            },
            {
              icon: "📈",
              title: "Transparent Impact",
              desc: "Track your impact with real-time reports and campaign progress dashboards.",
            },
            {
              icon: "🌐",
              title: "Scalable Platform",
              desc: "Built for communities of any size, from local NGOs to global networks.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 border rounded-2xl shadow-md bg-white">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - Updated */}
      <section className="bg-green-500 text-white py-3 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Ready to Make an Impact?</h2>
          <p className="mb-4 text-base">Join hands with our mission and help build brighter futures — one act of kindness at a time.</p>
          <a href="/volunteer">
            <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-all">
              Get Involved 🚀
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
