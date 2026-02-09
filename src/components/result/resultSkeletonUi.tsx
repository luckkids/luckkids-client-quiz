import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

const skeletonAnimation = keyframes`
    0%{
      background-position: 0% 0;
    }
    100%{
      background-position: 200% 0;
    }
`;

const Skeleton = styled.span({
    background: 'linear-gradient(90deg,rgba(181, 181, 181, 1) 0%, rgba(217, 217, 217, 1) 38%, rgba(227, 227, 227, 1) 50%, rgba(227, 227, 227, 1) 55%, rgba(217, 217, 217, 1) 68%, rgba(181, 181, 181, 1) 100%)',
    position:'absolute',
    display:'block',
    width:'100%',
    height:'100%',
    zIndex:'9',
    backgroundSize: '200%',
    backgroundPosition:'0% 0',
    animation:`${skeletonAnimation} 2s infinite ease-in-out`
})

export default function ResultSkeletonUI(){
    return <Skeleton/>
}