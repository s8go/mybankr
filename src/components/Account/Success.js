import React from 'react';
import { TransferTrans } from '../Logic/Transfer';
import styled from 'styled-components';
import {FaCheck} from "react-icons/fa"

const Success = ({cancel}) => {
  return (
   <>
   
  

<TransferSuccess>
<form>
<div className="cancel">
          <p onClick={()=>cancel("cancel")}>
            X
          </p>
        </div>

    <h4>Transaction Successful</h4>
    <FaCheck/>

</form>
</TransferSuccess>

</>

  )
}

export default Success

const TransferSuccess = styled(TransferTrans)`
color: white;

& h4, & svg{
  font-size: max(1.1em, 1.1vw, 17px);
}
`