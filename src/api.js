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

export const getSingleArticle = (article_id) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/articles/${article_id}`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("failed to fetch article");
      }
      return response.json();
    })
    .then((data) => {
      return data.article;
    });
};

export const getAllComments = (article_id) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/articles/${article_id}/comments`)
  .then((response) => {
    if (!response.ok) {
      return Promise.reject('failed to fetch comments')
    }
    return response.json()
  })
  .then((data) => {

    return data.comments
  })
  
}
