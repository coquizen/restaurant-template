import styled from "styled-components"

export const PageCover = styled.div`
  height: 400px;
  max-height: 100%;
  ::before {
    content: "";
    z-index: 100;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 400px;
    width: 100%;
  }
  .page-cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
