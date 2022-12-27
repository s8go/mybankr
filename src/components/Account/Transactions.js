import React from 'react'
import styled from 'styled-components'

const Transactions = ({initTransaction}) => {

  return (
    <Trans>
      <div
      className="transactions"
      onClick={() => initTransaction("deposit")}
    >
      deposit
    </div>

    <div
      className="transactions"
      onClick={() => initTransaction("transfer")}
    >
      transfer
    </div>



    <div
      className="transactions loan"
      onClick={() => initTransaction("loan")}
    >
      loan
    </div>
  </Trans>
  )
}

export default Transactions

const Trans = styled.div`
display: flex;
flex-wrap: wrap;
justify-content:center;
width: 100%;
margin: auto;
margin-top:1em;

& .transactions {
margin: .5em;
padding: .5em;
font-size: max(1vw, 1em);
width: 12%;
min-width: fit-content;
cursor:pointer;
text-align: center;
box-shadow: 2px 2px 5px rgb(0, 0, 23),  -2px -2px 5px  rgb(0, 0, 73);
transition: .5s;
color: rgb(152, 152, 152);

&:hover{
  background:rgb(0, 0, 73, 0.4);
  width: 15%;
  color:rgb(255, 255, 255);
}


}

@media screen and (min-width: 1024px){
justify-content:flex-start;
}
`