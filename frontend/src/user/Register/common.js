import styled from "styled-components"

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`

export const FormContainer = styled.form`
    width: 80%;
    margin-left: -60px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`

export const MutedLink = styled.a`
    font-size: 11px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
    opacity:1;
`

export const BoldLink = styled.a`
    font-size: 11px;
    color: rgb(153, 10, 15);
    font-weight: 500;
    text-decoration: none;
    margin: 0 4px;
`

export const Input = styled.input`
    width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.3);
    border-bottom: 1.4px solid transparent;
    transition: all 200ms ease-in-out;
    font-size: 12px;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
        opacity:1;
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid rgb(241, 196, 15);
    }
`

export const SubmitButton = styled.button`
    width: 70%;
    padding: 11px 40%;
    margin-right: 55px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(241, 196, 15);
    background: linear-gradient(
        58deg,
        rgb(153, 10, 15) 20%,
        rgb(153, 10, 15) 100%
    );

    &:hover {
        filter: brightness(1.03);
    }
`
