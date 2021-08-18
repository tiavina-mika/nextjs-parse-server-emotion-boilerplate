import Link from 'next/link';
import PropTypes from 'prop-types';

import { formatUrl } from '../../utils/utils';
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
const Cards = ({ items, pathname }) => {
  return (
    <div className="stretchSelf" css={classes.categories}>
      <div className="flexRow justifyCenter">
        {items.map((item, index) => (
          <Link href={formatUrl(pathname, item.slug)} passHref key={index}>
            <a>
              <Card
                hoverable
                title={item.title}
                image={item.image}
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
      slug: PropTypes.any,
      title: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
    }),
  ),
  pathname: PropTypes.string,
};

export default Cards;
