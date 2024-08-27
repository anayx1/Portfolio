import React from "react";
import Link from "next/link";

const shopifyProjects = [
  {
    title: "Paudha Ghar",
    description: "Online plant store",
    imageUrl: "/media/paudhaghar.png",
    link: "https://www.paudhaghar.in/",
  },
  {
    title: "Hair Originals",
    description: "Premium hair extensions",
    imageUrl: "/media/hairoriginals.png",
    link: "https://www.hairoriginals.com/",
  },
  {
    title: "Superkicks",
    description: "Sneaker and streetwear store",
    imageUrl: "/media/superkicks.png",
    link: "https://www.superkicks.in/",
  },
  {
    title: "Jaipur Watch Company",
    description: "Luxury watch brand",
    imageUrl: "/media/jaipurwatch.png",
    link: "https://jaipur.watch/",
  },
  {
    title: "Bunaai",
    description: "Handcrafted ethnic wear",
    imageUrl: "/media/bunaai.png",
    link: "https://www.bunaai.com/",
  },
];

const ProjectCard = ({ title, description, imageUrl, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
  >
    <div className="aspect-w-16 aspect-h-9">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  </a>
);

export default function ShopifyProjects() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-6xl lg:text-9xl font-bold text-center text-gray-700 dark:text-gray-200 mb-10">
          Shopify Projects
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-20">
          Explore my curated collection of stunning Shopify websites
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {shopifyProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        <div className="text-center mt-20">
          <Link
            href="/projects"
            className="inline-block px-8 py-4 bg-[#6E07F3] text-white rounded-md shadow-lg text-xl font-semibold transition-all duration-300 hover:bg-[#5a06c9] hover:shadow-xl"
          >
            View My Coded Projects
          </Link>
        </div>
      </div>
    </section>
  );
}