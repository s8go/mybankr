import React from 'react'

const Transactions = ({initTransaction}) => {

  return (
    <div className="transaction-list">
    <div
      className="transactions deposit"
      onClick={() => initTransaction("deposit")}
    >
      deposit
    </div>

    <div className="transactions withdraw">withdraw</div>

    <div
      className="transactions"
      onClick={() => initTransaction("transfer")}
    >
      transfer
    </div>

    <div className="transactions saving">saving</div>

    <div
      className="transactions loan"
      onClick={() => initTransaction("loan")}
    >
      loan
    </div>

    <div className="transactions Pay Bills">Pay Bills</div>
  </div>
  )
}

export default Transactions