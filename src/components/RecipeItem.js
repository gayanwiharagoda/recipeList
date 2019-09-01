import React from "react";
import styled from "styled-components";

const RecipeItem = ({ recipe, onClick }) => (
  <MainContainer onClick={() => onClick(recipe)}>
    <OverLayer>
      <Title>{recipe.fields.title}</Title>
    </OverLayer>
    <RecipeImage src={"https://" + recipe.fields.photo.fields.file.url} />
  </MainContainer>
);

export default RecipeItem

const MainContainer = styled.div`
  position: relative;
  display: flex;
  height: 300px;
`;

const OverLayer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: linear-gradient(#00000042, #0e0e0edb);
  cursor: pointer;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 1.3rem;
  color: white;
  font-weight: 600;
  padding: 20px;
`;
