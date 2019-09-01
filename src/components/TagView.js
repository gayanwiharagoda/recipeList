import React from "react";
import styled from "styled-components";

const TagsView = ({ tags = [] }) =>
  tags.length === 0 ? null : tags.map(tag => <Tag tag={tag} />);

export default TagsView;

const Tag = ({ tag }) => <TagContainer>{tag}</TagContainer>;

const TagContainer = styled.div`
  background-color: #55555a;
  color: white;
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 6px;
  & + & {
    margin-left: 8px;
  }
`;
