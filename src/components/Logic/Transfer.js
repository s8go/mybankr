import React, { useState } from "react";
import styled from "styled-components";

const Transfer = ({
  completeTransaction,
  cancelTransaction,
  transactionType,
  receiver
}) => {
  const [transactionDetails, setTransactionDetails] = useState({});

  const [transactionProgress, setProgress] = useState(transactionType);

  function handleInput(e) {
    const name = e.name;
    const value = e.value;

    setTransactionDetails((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  }

  return (
    <TransferTrans>
      
 <form
        onSubmit={(e) => {
          e.preventDefault();
          completeTransaction({...transactionDetails,
          to: receiver === "" ? transactionDetails.to : receiver}, transactionType);
          setProgress("...");
        }}
      >
        <div className="cancel">
          <p onClick={()=>cancelTransaction("cancel")}>
            X
          </p>
        </div>
        <div>
          <label>amount:</label>

          <input
            type="number"
            name="amount"
            value={transactionDetails.amount || ""}
            onChange={(e) => {
              handleInput(e.target);
            }}
          />
        </div>

        {transactionType === "transfer" && (
          <>
            <div>
              <label>to:</label>

              <input
                type="text"
                name="to"
                value={transactionDetails.to || receiver}
                onChange={(e) => {
                  handleInput(e.target);
                }}
              />
            </div>

            <div>
              <label>note:</label>
              <input
                type="text"
                name="note"
                value={transactionDetails.note || ""}
                onChange={(e) => {
                  handleInput(e.target);
                }}
              />
            </div>
          </>
        )}
        <div>
          {transactionProgress === "..." ? (
            <input type="submit" value={transactionProgress} disabled />
          ) : (
            <input type="submit" value={transactionProgress} />
          )}
        </div>
      </form>

    </TransferTrans>
  );
};

export default Transfer;


export const TransferTrans = styled.div`
position: fixed;
height: 100vh;
width: 100vw;
top:0;
left:0;
z-index: 10001;
display:grid;
place-items:center;
background-color: rgba(0, 0, 0, 0.9);

& form{
  background-color: rgba(0, 0, 38);
  border-radius: .5em;
  width: 90%;
  max-width: 500px;
text-align: center;  
padding-bottom: 1em;
}

& .cancel{
  text-align: right;
  padding-inline: .5em;
  color: white;
  cursor: pointer;
}


& div{
  margin-top: 1em;
 
& input, & label{
  display: block;
  width: 50%;
  margin: auto;
  margin-top: .5em;
  font-size: max(.9em, .9vw);
}

& input{
  border-radius: .5em;
  padding: .5em;
  outline: none;
}

& input[type="submit"]{
  background: white;
  width: 25%;
  font-size: max(1em, 1vw);
  border: none;
  outline: none;
  color: black;
  padding: .6em 0;

}

& label {
  text-align: left;
  color: white;
}
}

`