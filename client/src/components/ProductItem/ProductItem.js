import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import BreadCrumbNav from '../BreadCrumbNav/BreadCrumbNav';
import CustomButton from '../CustomButton/CustomButton';

import { addItem } from '../../redux/cart/cart.actions';
import { selectProduct } from '../../redux/shop/shop.selectors';

import './ProductItem.scss';

const ProductItem = ({ product, addItem }) => {
  const item = product[0];
  const { 
    title,
    imageUrl,
    subTitle,
    author,
    narrator,
    length,
    releaseDate,
    language,
    publisher,
    price,
    description
   } = item;
  return (
    <React.Fragment>
      <BreadCrumbNav title={title} />
      <section className='product-item'>
        <div className='product-item-top'>
          <div className='product-image'>
            <img src={imageUrl} alt='book' />
          </div>
          <div className='product-details'>
            <h2>{title}</h2>
            <h3>{subTitle}</h3>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>By:</span>
              <a href='/'>{author}</a>
            </span>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>Narrated By:</span>
              <a href='/'>{narrator}</a>
            </span>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>Length:</span>
              {length}
            </span>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>Release Date:</span>
              {releaseDate}
            </span>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>Language:</span>
              {language}
            </span>
            <span className='product-details-text'>
              <span className='product-details-text-bold'>Publisher:</span>
              <a href='/'>{publisher}</a>
            </span>

            <span className='product-price'>${price}</span>
            <CustomButton onClick={() => addItem(item)}>Add to Cart</CustomButton>
            <div className='product-share'>
              <span className='share-text'>Share:</span>
            </div>
          </div>
        </div>
        <div className='product-item-bottom'>
          <div className='product-description'>
            <h3>Publisher Summary</h3>
            <div className='product-description-text'>
              {ReactHtmlParser(description)}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  product: selectProduct(ownProps.match.url)(state)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);