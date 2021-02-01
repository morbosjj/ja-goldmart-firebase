import React from 'react';
import Helmet from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'JA Goldmart Enterprise',
  description:
    'JA Goldmart Enterprise is a packaging firm engaged in making of Corrugated Boxes, and other packaging materials, also engage in office supplies and it caters exporters and local companies producing handicrafts, fashion accessories, Christmas decors, garments, furnitures, farming tools, PE foam, cosmetics, apparel, bicycles, TV/DVDs, banks, pharmaceuticals, telecommunication & X-Ray (Airport) Machines (body & luggage), pesticides, government institutions, fruits and food industries.',
  keywords:
    'Production Machine Supplier, Die Cutting Machine, Slotter Machine, Corrugated Carton Box Folder Gluer, Laminating Machine, Paper Cutting Machine, Offset Printing Machine',
};

export default Meta;
