import React from 'react';

const ItemList = props => {
  return (
    <div>
      {
        props.data
        &&
        <ul>
          {props.data?.map((x, index) =>
            <li key={index}>
              <ul>
                <li onClick={() => {
                  const inputText = prompt("Input new Comment!", x.data.title);
                  if (inputText === null || inputText === '') {
                    return false
                  } else {
                    console.log(inputText)
                  }
                }
                }>edit</li>
                <li>{x.data.user}</li>
                <li>{x.id}</li>
                <li>{x.data.timestamp._seconds}</li>
                <li>{x.data.title}</li>
                <li>{JSON.stringify(x.data.position)}</li>
                {/* <li><img src={`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${x.data.position.lat},${x.data.position.lng}&key=AIzaSyA1Xd3oiuXW_0dQxAi46m1GBzqnDnw8Xvo`} alt="" /></li> */}
                <li>{x.data.address}</li>
              </ul>
            </li>
          )}
        </ul>
        // <p>{JSON.stringify(data)}</p>
      }
    </div>
  );
}

export default ItemList;
