import Link from 'next/link';
import PropTypes from 'prop-types';

import Card from './Card';

const classes = {
  categories: {
    marginBottom: 50,
  },
  category: {
    margin: 18,
  },
};

/* eslint-disable jsx-a11y/anchor-is-valid */
const Cards = ({ items }) => {
  return (
    <div className="stretchSelf" css={classes.categories}>
      <div className="flexRow justifyCenter">
        {items.map((item, index) => (
          <Link href="/" passHref key={index}>
            <a>
              <Card
                hoverable
                title={item.title}
                image={'/temp/' + item.image}
                price={item.price}
                key={index}
                className={classes.category}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

Cards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      title: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
    }),
  ),
};

export default Cards;
