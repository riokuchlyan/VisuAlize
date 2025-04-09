const GoToTickersList = () => {

    const TickersList = async () => {
        window.location.href = "/tickers-list";
    }

    return (
        <div style={{ marginTop: "15px" }} className='input'>
            <button onClick={TickersList}>Tickers List</button>
          </div>
    );
}

export default GoToTickersList;