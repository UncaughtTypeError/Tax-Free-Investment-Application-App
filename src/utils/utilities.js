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

    let { LumpSumInvestmentMonth, LumpSumInvestmentAmount, DebitOrderStartMonth, DebitOrderAmount } = formatNumbers(applicationParameters);

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

    const setStartMonth = () => {
        scopeState.StartMonth = (LumpSumInvestmentAmount > 0) ? (LumpSumInvestmentMonth + 1) : DebitOrderStartMonth;
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

        let { MaximumDebitMonths, MaximumDebitAmount, StartMonth, MonthsRemaining } = scopeState;

        MaximumDebitMonths = Math.floor((LUMP_SUM_LIMIT - LumpSumInvestmentAmount) / DebitOrderAmount);
        MaximumDebitAmount = MaximumDebitMonths * DebitOrderAmount;

        if(MaximumDebitMonths > 0) {
            scopeState.StartMonth = (MonthsRemaining - MaximumDebitMonths) + (StartMonth + 1);
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