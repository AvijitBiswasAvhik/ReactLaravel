import {React, ReactDOM, useEffect, useState} from 'react';

const List = (props) =>{
    let [el , setEl] = useState();
    console.log(props.element[0]);
    useEffect(()=>{
        let element = props.data.map((el,i)=>{
            return (
                <a href="" key={i} style={{textDecoration: 'none'}}><li > {props.element[i] != null && props.element[i]} {el}</li></a>
            )
        })
        setEl(element);
    },[])
    let style = {
            listStyleType: 'none',
            textDecoration: 'none',  
            textTransform: 'capitalize',
            textAlign: 'center'
    }
    return (
        <>
        <u style={style}>
            {el}
        </u>
        </>
    )
}

export default List;