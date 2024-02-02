const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware to verify the product exists in the DB
/*
function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    .then((product) => {
      if (product) {
        res.locals.product = product; //stores product in res locals
        return next();
      }
      next({ status: 404, message: `Product cannot be found.` });
    })
    .catch(next);
}
*/
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
  const { product: data } = res.locals; //now you can access the product in res locals
  res.json({ data });
}

/*
function list(req, res, next) {
  res.json({
    data: [{ product_title: "product 1" }, { product_title: "product 2" }],
  });
}
*/
//updated list version using async await
async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}
async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
