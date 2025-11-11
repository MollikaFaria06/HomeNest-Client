import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">Property Details</h1>
      <p className="mt-4">Property ID: {id}</p>
      
    </div>
  );
};

export default PropertyDetails;
