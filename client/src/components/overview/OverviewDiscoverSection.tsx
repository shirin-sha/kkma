import React from "react";

// DiscoverSection.jsx
// Converted from Elementor HTML to React with Tailwind CSS.

export default function OverviewDiscoverSection() {
  const items = [
    {
      title: "Membership\nDetails",
      description:
        "Find out more about the benefits and requirements of becoming a KKMA member.",
      icon: "flaticon-group",
      count: "01",
      link: "/membership",
    },
    {
      title: "News &\nUpdates",
      description:
        "Stay informed & keep up with what's happening in our community.",
      icon: "fa fa-globe",
      count: "02",
      link: "/media",
    },
    {
      title: "Events\nCalendar",
      description:
        "Stay connected and participate in our vibrant community events.",
      icon: "flaticon-teamwork",
      count: "03",
      link: "/media#events",
    },
    {
      title: "Forms &\nDownloads",
      description:
        "Access important forms and documents. Download resources you need quickly and easily.",
      icon: "flaticon-download",
      count: "04",
      link: "/downloads",
    },
  ];

  return (
    <section
      className="relative py-16 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url(https://kkma.net/wp-content/uploads/2021/05/discover-bg-2.jpg)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="flex items-center justify-center space-x-2 text-white/90 uppercase tracking-wide">
            <i className="flaticon-star" />
            <span>Stay Connected with KKMA Resources</span>
            <i className="flaticon-star" />
          </h6>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Quick Access to Essential Resources and Updates.
          </h2>
          <div className="w-24 h-1 bg-[#83B253] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <a
              key={index}
              className="relative group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden p-6 transition-transform transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              href={item.link}
            >
              {/* Front Content */}
              <div className="content-box text-center">
                <div className="icon-box text-4xl mb-3">
                  <i className={item.icon}></i>
                </div>
                <h4 className="font-semibold text-lg text-white whitespace-pre-line">
                  {item.title}
                </h4>
                <span className="absolute bottom-3 right-3 text-4xl font-bold text-[#83B253] opacity-30">
                  {item.count}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0b1b10]/90 p-6 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h4 className="font-semibold text-lg mb-2 whitespace-pre-line">
                  {item.title}
                </h4>
                <p className="text-sm mb-4 opacity-90">{item.description}</p>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#83B253] text-black font-bold">
                  <i className="flaticon-right-arrow"></i>
                </span>
                <span className="absolute bottom-3 right-3 text-4xl font-bold text-[#83B253] opacity-20">
                  {item.count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}