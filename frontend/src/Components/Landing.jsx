import React from "react";
import { Card } from "./Cards";
import { MdOutlineForest } from "react-icons/md";
import { HeroCard } from "./HeroCard";


const Landing = () => {
  const featuredProjects = [
    // Add URLs for the featured project images
  ];

  const trendingProjects = [
    // Add URLs for the trending project images
  ];

  const getStartedCards = [
    {
      title: "Buy ECO tokens",
      description: "Buy and hold ECO, the first carbon offset token on Ethereum",
      imageUrl: "url_for_buy_eco_tokens_image",
    },
    {
      title: "Wrap ECO",
      description: "Convert ECO to wECO to use it in other DeFi protocols",
      imageUrl: "url_for_wrap_eco_image",
    },
    {
      title: "Provide liquidity",
      description: "Add ECO and ETH to Uniswap to earn fees and rewards",
      imageUrl: "url_for_provide_liquidity_image",
    },
    {
      title: "Stake ECO",
      description: "Lock up ECO to earn more ECO over time",
      imageUrl: "url_for_stake_eco_image",
    },
  ];

  return (
    <div>
      <header className="header">
      <div className="flex gap-2">
          < MdOutlineForest className=" mt-1"/>
          <h1 className="font-bold">EcoChain</h1>
        </div>
        <nav className=" flex gap-6 font-bold">
          <a href="/marketplace">Marketplace</a>
          <a href="/explorer">Explorer</a>
          <a href="/company">Company</a>
          <a href="/learn">Learn</a>
          <button>Connect Wallet</button>
        </nav>
      </header>

      <main>
      <HeroCard />
        <section className="hero">
          <h2>Buy carbon credits</h2>
          <p>Offset your carbon footprint with ECO, the first carbon offset token on Ethereum</p>
          <input type="text" placeholder="Search for projects" />
          <button>Search</button>
        </section>

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
