export const getAllArtictles = (list) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/articles`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("failed to fetch articles");
      }
      return response.json();
    })
    .then(({ articles }) => {
      return articles;
    });
};
