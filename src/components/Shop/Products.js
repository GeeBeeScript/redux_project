import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const randomItems = [
    {id: "p1", price: 7, title: "My First Book", description: "The first book written"},
    {id: "p2", price: 8, title: "My Second Book", description: "The second book written"}
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {randomItems.map(product => 
          (<ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
