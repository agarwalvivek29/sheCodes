import React from "react";
import Cards from "./Cards";
import { MdOutlineForest } from "react-icons/md";
import HeroCard from "./HeroCard"; // Ensure you have this component correctly defined
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Landing = () => {
  const featuredProjects = [
    // Add URLs for the featured project images
  ];

  const trendingProjects = [
    // Add URLs for the trending project images
  ];

  const cardData = [
    {
      title: "Project 1",
      imageUrl: "https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Message for Project 1"
    },
    {
      title: "Project 2",
      imageUrl: "https://images.pexels.com/photos/418831/pexels-photo-418831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Message for Project 2"
    },
    {
      title: "Project 3",
      imageUrl: "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Message for Project 3"
    },
    {
      title: "Project 4",
      imageUrl: "https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=600",
      message: "Message for Project 4"
    },
    {
      title: "Project 5",
      imageUrl: "https://images.pexels.com/photos/1061623/pexels-photo-1061623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Message for Project 5"
    }
  ];

  return (
    <div>
      <Navbar />

      <main>
        <HeroCard />
        <h2 className="text-center text-5xl font-bold">Featured projects</h2>

        <div className="p-8">
          
          <Cards cards={cardData} />
        </div>
        <h1 className="text-center text-5xl font-bold m-3">Get Started</h1>
        <div className="flex justify-center space-x-4">
      <ThreeDCardDemo className="max-w-xs" />
      <ThreeDCardDemo className="max-w-xs" />
      <ThreeDCardDemo className="max-w-xs" />
     
    </div>
    
    <Footer  />


        {/* 
        <section className="featured-projects">
          <h3>Featured projects</h3>
          <div className="project-cards">
            {featuredProjects.map((url, index) => (
              <img key={index} src={url} alt={`Featured project ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="trending-projects">
          <h3>Discover trending projects</h3>
          <div className="project-cards">
            {trendingProjects.map((url, index) => (
              <img key={index} src={url} alt={`Trending project ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="get-started">
          <h3>Get started</h3>
          <div className="cards">
            {getStartedCards.map((card, index) => (
              <Card key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} />
            ))}
          </div>
        </section>
        */}
      </main>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        }

        .hero {
          text-align: center;
          padding: 2rem;
        }

        .project-cards {
          display: flex;
          gap: 1rem;
        }

        .get-started .cards {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Landing;
