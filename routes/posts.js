const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
router.post('/', async(req, res, next) =>  {
  try {
      /* 請在此填寫答案 */
      // 取得來自 request body 的資料
      // 驗證是否有 content 欄位 -> 若有則使用 mongoose 語法新增資料 -> 回傳成功回應
      //                       -> 未填寫 content 欄位 -> 回傳失敗回應
    try {
      const data = req.body;
      if(data.content){
      await Post.create(data);
      const getAllPosts = await Post.find();
      res.send({
        status: true,
        message: '成功新增一則貼文',
        posts: getAllPosts,
      });
    } catch (err) {
      res.status(401).send({
        status: false,
        message: err.message
      });
    }
  } catch (error) {
    res.status(400).json({
        status: 'false',
        "message": "欄位未填寫正確，或無此 todo ID"
    });
  }
})

router.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  if (id) {
    const data = await Post.findById(id);
    res.send(
      {
        status: true,
        message: '成功取得該筆貼文',
        data,
      }
    );
  } else {
    res.send(
      {
        status: false,
        message: '請在確認 id 是否正確'
      }
    )
  }
}

module.exports = router;

