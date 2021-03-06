import { createSelector } from 'reselect'; 

const selectShop = state => state.shop;

export const selectShopProducts = createSelector(
  [selectShop],
  shop => shop.products
);

export const selectShopCategories = createSelector(
  [selectShop],
  shop => shop.categories
);

export const selectIsProductFetching = createSelector(
  [selectShop],
  shop => shop.isProductsFetching
);

export const selectIsProductLoaded = createSelector(
  [selectShop],
  shop => !!shop.products
);

export const selectShopBestSellersFromTimesSold = createSelector(
  [selectShopProducts],
  products => 
    products
      .slice()
      .sort((a, b) => b.timesSold - a.timesSold)
);

export const selectShopBestSellers = createSelector(
  [selectShopProducts],
  products => products ? 
    products.filter(product => product.categories.bestSeller === true)
    : []
);

export const selectShopNewReleases = createSelector(
  [selectShopProducts],
  products => products ?
    products.filter(product => product.categories.newRelease === true)
    : []
);

export const selectShopComingSoon = createSelector(
  [selectShopProducts],
  products => products ?
    products.filter(product => product.categories.comingSoon === true)
    : []
);

export const selectProduct = productUrlParam => createSelector(
  [selectShopProducts], 
  products => products ?
    products.filter(product => '/' + product.routeName === productUrlParam)
    : []
);

export const selectAllProductCategories = createSelector(
  [selectShopProducts, selectShopCategories],
  (products, categories) => products && categories ? 
    Object.keys(categories).map(keys => {
      return { categoryName: categories[keys].name, 
                items: products.filter(product => product.categories[keys] === true)};
  })
  : []
);

export const selectCategoryItems = productUrlParam => createSelector(
  [selectShopProducts, selectShopCategories],
  (products, categories) => products && categories ? 
    Object.keys(categories)
      .filter(keys => categories[keys].name.toLowerCase() === productUrlParam)
      .map(category => products.filter(product => product.categories[category] === true))
  : []
);
 
export const selectAuthorItems = authorUrlParam => createSelector(
  [selectShopProducts],
  products => products ? 
    products.filter(product => 
      product.author.toLowerCase() === authorUrlParam || 
      product.narrator.toLowerCase() === authorUrlParam ||
      product.publisher.toLowerCase() === authorUrlParam)
  : []
);