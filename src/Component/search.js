import React from "react";

export default function Search(props) {
  return (
    <h1 className='m-3'>You searched for:{props.totalResults} </h1>
  )
}