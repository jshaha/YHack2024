import styled from "styled-components";
import { Colors } from "../../colors";

export const StyledButtonWhite = styled.button`
  background: ${Colors.neutral};
  color: ${Colors.brand500};
  // color: pink;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${Colors.brand500};
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.5s, transform 0.3s;

  &:hover {
    background: ${Colors.neutral};
    color: ${Colors.brand200_dark};
    // color: pink;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid ${Colors.brand200_dark};
    font-size: 1rem;
    font-weight: 500;
    transition: background 0.5s, transform 0.3s;
  }
`;
