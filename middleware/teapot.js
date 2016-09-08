
module.exports = function (router) {
  /* ALL Responds width 418 - I'm not a teapot. */
  router.use(function (req, res, next) {
    res.status(418)
    next()
  })
}
