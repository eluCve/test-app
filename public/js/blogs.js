// Assume we have these arrays
const titles = [
    "The Ultimate Guide to Climbing Ranks",
    "How to Counter the Most Popular Champions in the Current Meta",
    "Mastering the Art of Warding Vision Control Tips for League of Legends",
    "The Psychology of Tilt How to Maintain a Positive Mindset and Avoid Tilting",
    "The Role of Support in League of Legends How to Be an Effective Support Player",
    "Jungle Pathing Strategies for Efficient Ganking and Objective Control"
  ];
  
  const images = [
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Ahri_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Zed_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Khazix_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Draven_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Senna_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/Elise_0.jpg"
  ];
  const dates = [
    "April 1, 2024",
    "April 15 2024",
    "May 1, 2024",
    "May 15, 2024",
    "June 1, 2024",
    "June 15, 2024"
  ];
  
  function createBlogPostCards() {
    const container = document.getElementById('blog-container');
  
    titles.forEach((title, index) => {
      const card = document.createElement('div');
      card.className = 'blog-post-card';
      card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${images[index]})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
      card.style.width = '300px';
      card.style.height = '200px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'flex-end';
      card.style.margin = '10px';
      card.style.borderRadius = '8px';
      card.style.cursor = 'pointer';
  
      const titleElement = document.createElement('h4');
      titleElement.textContent = title;
      titleElement.style.color = 'white';
      titleElement.style.textAlign = 'center';
      titleElement.style.padding = '10px';
      
      const dateElement = document.createElement('p');
      dateElement.textContent = dates[index];
      dateElement.style.color = 'white';
      dateElement.style.textAlign = 'center';
      dateElement.style.padding = '4px';
      dateElement.style.fontSize = '13px';
      dateElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      dateElement.style.width = '50%';

      card.appendChild(titleElement);
      card.appendChild(dateElement);
      container.appendChild(card);
  
      // Add click event listener to navigate to the blog post
      card.addEventListener('click', () => {
        window.location.href = `/blogs/${encodeURIComponent(title.toLowerCase().replace(/ /g, '-'))}`;
      });
    });
  }
  
  // Call this function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', createBlogPostCards);