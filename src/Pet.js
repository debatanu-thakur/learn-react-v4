import React from 'react';
const Pet1 = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h3", {}, props.breed)
  ]);
};
/**
 * This can also be written as
 *  className instead of class(since this name is reserved in js) attribute for css
 *  htmlFor instead of for(since this name is reserved in js) attributed
 * the below is jsx
 */
const Pet = props => {
    return (
        <div className=""> 
            <h1>{ props.name.toUpperCase() }</h1>
            <h2> {props.animal}</h2>
            <h3> {props.breed}</h3>
        </div>
    );
};
export default Pet;