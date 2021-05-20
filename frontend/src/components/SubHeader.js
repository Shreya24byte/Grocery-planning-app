
export function SubHeader() {
    const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const newDate = new Date()
    const currentMonth = months[ newDate.getMonth()];
    return (
        <div>
           <p className="h2" style={{color: "#1D2731"}}> {`Plan for the month of ${currentMonth}`}</p>
        </div>
    )
}

