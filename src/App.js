import React, {useEffect, useState} from 'react';
import {makeStyles, List, TextField, ListSubheader} from '@material-ui/core';
import styled from "styled-components";
import Root from './Root.js'
import RenderSearchItems from "./SearchItems";

const Container = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

const StyledList = styled(List)`
    margin-right: 60px;
`;

const AllergenList = styled.div`
    display:block;
    -webkit-tap-highlight-color: white;
`;

const InputContainer = styled.div`
    text-align: left;
    ${AllergenList} > div {
        margin-top: 20px;
        color: red !important;
        cursor: pointer;
    }
`;

export let asd = null;

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

function App() {

    const [searchArray, setSearchArray] = useState([{}]);
    const [menuItems, setMenuItems] = useState([{
        name: "Omelette",
        id: 1,
        level: 0,
        nested: [
            {
                name: "Meat",
                id: 11,
                level: 1,
                nested: [
                    {
                        name: "Sliced Fillet",
                        id: 111,
                        level: 2,
                        nested: [
                            {
                                name: "Pork",
                                id: 1111,
                                level: 3
                            },
                            {
                                name: "Chicken",
                                id: 1112,
                                level: 3
                            },
                            {
                                name: "Beef",
                                id: 1113,
                                level: 3
                            }
                        ]
                    }
                ]
            },
            {
                name: "Egg",
                id: 12,
                level: 1,
            },
            {
                name: "Cheese",
                id: 12,
                level: 1,
            }
        ]
    }, {
        name: "English Breakfast", id: 2, level: 0, nested: [{
            name: "Pancake",
            id: 21,
            level: 1
        }]
    }, {
        name: "Hamburger", id: 3, level: 0, nested: [{
            name: "Bread",
            id: 31,
            level: 1
        },
            {
                name: "Meat",
                id: 32,
                level: 1,
                nested: [{
                    name: "Pork",
                    id: 321,
                    level: 2
                }]
            }
        ]
    }]);
    const [mealArray, setMealArray] = useState([]);

    const classes = useStyles();
    let parent = null;
    let ingredientArray = [];

    const searchAllergens = (obj) => obj.nested ?
        obj.nested.forEach(item => searchAllergens(item))
        :
        obj.level !== 0 && ingredientArray.push({...obj, master: parent});

    const checkForAllergens = () => {
        ingredientArray = [];
        menuItems.forEach(item => {
            parent = item;
            searchAllergens(item);
        });
    };

    useEffect(() => checkForAllergens(), [searchArray]);

    const reduceFoodArray = (allergenArray) => {
        const reducedArray = [];
        allergenArray.map(item => reducedArray.indexOf(item.master) === -1 && reducedArray.push(item.master));
        return reducedArray;
    };

    const handleChange = (e) => {
        const allergenArray = ingredientArray.filter(item => e.target.value !== "" && item.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        setSearchArray(allergenArray);
        setMealArray(reduceFoodArray(allergenArray));
    };

    const highlightMeal = (ingredient) => {
        let highlightArrayNew = null;
        searchArray.forEach(item => item.master === ingredient && (highlightArrayNew = ingredient));
        return highlightArrayNew;
    };

    return (
        <Container>
            <StyledList
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <span>Restaurant Menu</span>
                    </ListSubheader>
                }
                className={classes.root}
            >
                {menuItems.map(component => {
                    return <Root {...component} highlight={highlightMeal(component)}
                                 key={"a" + component.id}/>
                })}
            </StyledList>
            <InputContainer>
                <TextField label="Check allergen" variant="outlined" onChange={handleChange}/>
                <AllergenList><RenderSearchItems searchArray={searchArray} highlightMeal={highlightMeal}
                                                 mealArray={mealArray}/></AllergenList>
            </InputContainer>
        </Container>
    );
}

export default App;
