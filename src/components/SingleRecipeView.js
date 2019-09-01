import React from "react";
import styled from "styled-components";

import RecipeItem from "./RecipeItem";
import TagsView from "./TagView";

const displayTags = tags =>
  tags &&
  tags.length !== 0 && (
    <>
      <Row>
        <SubTitle>Tags</SubTitle>
      </Row>
      <Row paddingTop>
        <TagsView tags={tags} />
      </Row>
    </>
  );

const displayChef = chef =>
  chef && (
    <>
      <Row paddingTop>
        <SubTitle>Chef</SubTitle>
      </Row>
      <Row paddingTop>
        <Paragraph>{chef}</Paragraph>
      </Row>
    </>
  );

const SingleRecipeView = ({ recipe }) => {
  const description = recipe.fields.description;
  const tags = recipe.fields.tags;
  const chef = recipe.fields.chef;
  return (
    <Col>
      <RecipeItem recipe={recipe} />
      <BodyContainer>
        <LeftContainer>
          <Title>Description</Title>
          <Paragraph paddingTop>{description}</Paragraph>
        </LeftContainer>
        <RightContainer>
          {displayTags(tags)}
          {displayChef(chef)}
        </RightContainer>
      </BodyContainer>
    </Col>
  );
};

export default SingleRecipeView;

const Title = styled.span`
  font-size: 1.2rem;
`;

const SubTitle = styled.span`
  font-size: 1rem;
`;

const Paragraph = styled.span`
  ${p => p.paddingTop && `padding-top: 16px;`}
  color: #484242;
  font-size: 0.9rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  ${p => p.paddingTop && `padding-top: 16px`}
  ${p => p.paddingButton && `padding-bottom: 16px`}
`;

const BodyContainer = styled.div`
  padding: 32px 0px;
  display: flex;
  max-width: 1400px;
  align-self: center;
}
`;

const BodyColumn = styled(Col)`
  padding: 0px 24px;
`;

const LeftContainer = styled(BodyColumn)`
  flex: 4;
  border-right: solid 1px #b5b6bbf2;
`;

const RightContainer = styled(BodyColumn)`
  flex: 1;
`;
