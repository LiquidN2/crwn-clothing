import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// REDUX ACTIONS
import { toggleCartDisplay } from '../../redux/cart/cart.actions';

// REDUX SELECTORS
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// STYLES
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartDisplay, itemCount }) => (
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" onClick={toggleCartDisplay} />
    <span className="item-count">{itemCount}</span>
  </div>
);

CartIcon.propTypes = {
  itemCount: PropTypes.number,
  toggleCartDisplay: PropTypes.func,
};

// const mapStateToProps = state => ({
//   itemCount: selectCartItemsCount(state),
// });
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = dispatch => ({
  toggleCartDisplay: () => dispatch(toggleCartDisplay()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
