function formatNumberDecimal(input) {
    return Number.parseFloat(input).toFixed(2);
}

function formatNumbers(object) {

    for(let [key, value] of Object.entries(object)) {
        value = Number(value);
        object = { ...object, [key]: value };
    }
    return object;

}

export default function applicationCheck(applicationParameters) {

    let { LumpSumInvestmentMonth = 0, LumpSumInvestmentAmount = 0, DebitOrderStartMonth = 0, DebitOrderAmount = 0 } = formatNumbers(applicationParameters);
    console.log(LumpSumInvestmentMonth,LumpSumInvestmentAmount,DebitOrderStartMonth,DebitOrderAmount);

    const LUMP_SUM_LIMIT = 30000;

    let EarliestPermissibleDebitOrderStartMonth,
        TotalContributions,
        ExcessContributions;

    const scopeState = {
        MonthsRemaining: 0,
        StartMonth: 0,
        MaximumDebitMonths: 0,
        MaximumDebitAmount: 0,
        ExcessContributions: 0,
    }

    const calculateStartMonth = (CalculateMonth) => {
        switch(CalculateMonth) {
            case 13: // Jan
                return 1;
            case 14: // Feb
                return 2;
            default:
                return CalculateMonth;
        }

    }

    const setStartMonth = () => {
        let CalculateMonth = (LumpSumInvestmentAmount > 0 && LumpSumInvestmentMonth >= DebitOrderStartMonth) ? (LumpSumInvestmentMonth + 1) : DebitOrderStartMonth;
        scopeState.StartMonth = calculateStartMonth(CalculateMonth);
    }

    const setMonthsRemaining = () => {

        let { StartMonth, MonthsRemaining } = scopeState;

        if(StartMonth <= 2) {
            MonthsRemaining = 2 - StartMonth;
        } else {
            MonthsRemaining = 14 - StartMonth;
        }
        
        scopeState.MonthsRemaining = MonthsRemaining;

    }

    const setMaximumDebitAmount = () => {

        let { MonthsRemaining } = scopeState;

        scopeState.MaximumDebitAmount = MonthsRemaining * DebitOrderAmount;

    }

    const setEarliestStartMonth = () => {

        let { MaximumDebitMonths, StartMonth, MonthsRemaining } = scopeState;

        MaximumDebitMonths = Math.floor((LUMP_SUM_LIMIT - LumpSumInvestmentAmount) / DebitOrderAmount);

        if(MaximumDebitMonths > 0) {
            let CalculateMonth = (MonthsRemaining - MaximumDebitMonths) + (StartMonth + 1);
            scopeState.StartMonth = calculateStartMonth(CalculateMonth);
        } else {
            scopeState.StartMonth = 3; // roll over to beginning of next tax year
        }

        scopeState.ExcessContributions = MAX_TOTAL - LUMP_SUM_LIMIT;

    }

    setStartMonth();
    setMonthsRemaining();
    setMaximumDebitAmount();

    const MAX_TOTAL = scopeState.MaximumDebitAmount + LumpSumInvestmentAmount;

    if (LumpSumInvestmentAmount > LUMP_SUM_LIMIT) {
        console.log('Exceeds contributions limit.');
    } else if(MAX_TOTAL > LUMP_SUM_LIMIT) {
        setEarliestStartMonth();
    }

    EarliestPermissibleDebitOrderStartMonth = scopeState.StartMonth;
    TotalContributions = formatNumberDecimal(scopeState.MaximumDebitAmount + LumpSumInvestmentAmount);
    ExcessContributions = formatNumberDecimal(scopeState.ExcessContributions);

    return { EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions };

}