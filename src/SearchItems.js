    import React from 'react';
import styled from "styled-components";

const SearchItem = styled.div`
   font-weight: ${props => props.highlight ? 'bold' : 'normal'};
`;

const RenderSearchItems = (props) =>
    <>
            {props.searchArray.length > 0 && props.mealArray.map((item, index) => <SearchItem
            onClick={() => props.highlightMeal(item)}
            key={index + "_"}>{item.name}</SearchItem>)}
    </>

export default RenderSearchItems;