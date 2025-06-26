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

export const patchArticleVotes = (article_id, increment) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/articles/${article_id}`, {
    method: 'PATCH',
    headers: {'Content-type': 'application/json'}, body: JSON.stringify({inc_votes: increment})
  })
  .then((response) => {
    if (!response.ok) {
      return Promise.reject({status: response.status, msg: 'failed to update votes'})
    }
    return response.json()
  })
  .then((article) => {

    return article.article.votes
  })
}

export const makeComment = (article_id, username, body) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/articles/${article_id}/comments`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({username: username, body: body})
  })
.then((response) => {
  if (!response.ok) {
    return Promise.reject({status: response.status, msg: 'failed to post new comment'})
  }
  return response.json()
})
.then((data) => 
{return data.comment})


};

export const deleteComment = (comment_id) => {
  return fetch(`https://nc-news-zgkw.onrender.com/api/comments/${comment_id}`, {
    method: 'DELETE'
    
  })
  .then((response) => {
    if (!response.ok)
   { return Promise,reject({status: response.status, msg: 'failed to delete comment'})}
    return
  })
  .catch((error) => {
    console.error('error in deleteComment api call', error)
    return Promise.reject(error)
  })
  }
