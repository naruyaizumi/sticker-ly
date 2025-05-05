;(async () => {
 try {
  require('./default')
  require('./crop')
  require('./full')
  require('./circle')
  require('./rounded')
  require('./star')
 } catch (err) {
  console.error(err)
 }
})()