import React from 'react';
import Layouts from '../../components/Layouts';
import NextLink from 'next/link';
import { Button, Card, Grid, List, ListItem } from '@material-ui/core';
import useStyle from '../../utils/styles';
import Image from 'next/image';
import { Rating, Typography } from '@mui/material';
import db from '../../utils/db';
import Product from '../../models/Product';
export default function ProductScreen(props)
 {
   const {product} = props;
  const classes = useStyle();
  if (!product) {
    return <h1>Page is Not Found</h1>;
  }
  return (
    <Layouts title={product.name} description={product.description}>
      <div className={classes.secton}>
        <NextLink href="/" passHref>
          <Button className={classes.section}>go to back page</Button>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h1"> {product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating:
                <Rating
                  name="half-ratings"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                ></Rating>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
          
        </Grid>
        <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color={product.countInStock > 0 ? 'primary' : 'error'} >
                        {product.countInStock > 0 ? 'Instock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth varient="contained" color="primary">
                    Add to Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
      </Grid>
    </Layouts>
  );
}

 
export async function getServerSideProps(context){
  const{params} = context;
  const{slug} = params
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();

  return {
    props:{
    products:db.convertDocToObj(product),
    }
  }
}