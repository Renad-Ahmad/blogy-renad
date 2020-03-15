const express = require('express');

const Article = require('../models/article');

const router = express.Router();

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/articles
 * Description:   Get All Articles
 */
router.get('/api/articles', (req, res) => {
  Article.find()
  .then((allArticles) => {
    res.status(200).json({ articles: allArticles });
  })
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/articles/5d664b8b68b4f5092aba18e9
 * Description:   Get An Article by Article ID
 */
router.get('/api/articles/:id', (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.status(200).json({ article: article });
      } else {
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    })
});

 /**
  * Action:       CREATE
  * Method:       POST
  * URI:          /api/articles
  * Description:  Create a new Article
  */
 router.post('/api/articles', (req, res) => {
   Article.create(req.body.article)
   .then((newArticle) => {
     res.status(201).json({ article: newArticle });
   })
   .catch((error) => {
     res.status(500).json({ error: error });
   });
 });

  
   /**
    * Action:       DESTROY
    * Method:       DELETE
    * URI:          /api/articles/5d664b8b68b4f5092aba18e9
    * Description:  Delete An Article by Article ID
    */
   router.delete('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        return article.remove();
      } else {
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID Doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
   });

   /**
   * Action:      UPDATE
   * Method:      PATCH
   * URI:         /api/articles/5d664b8b68b4f5092aba18e9
   * Description: Update An Article by Article ID
   */


   router.patch('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.status(201).json({article});
        return article.update(req.body.article);
      } else {
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID Doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
   });

module.exports = router;