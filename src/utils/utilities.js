/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * Formats input to float
 * @param {NumberLike} input - the number or string to convert to a float
 * @returns {string} A float
 */
function formatNumberDecimal(input) {
    return Number.parseFloat(input).toFixed(2);
}

/**
 * Formats input to integer
 * @param {Object} object - the object containing numbers or strings to convert to integers
 * @param {NumberLike} object.LumpSumInvestmentMonth - the chosen month of the lump sum investment
 * @param {NumberLike} object.LumpSumInvestmentAmount - the specified lump sum investment amount
 * @param {NumberLike} object.DebitOrderStartMonth - the chosen month of the first debit order
 * @param {NumberLike} object.DebitOrderAmount - the predefined monthly deposit amount
 * @returns {Object} Converted value types
 */
function formatNumbers(object) {
    for(let [key, value] of Object.entries(object)) {
        value = Number(value);
        object = { ...object, [key]: value };
    }
    return object;
}

/**
 * Formats input to integer
 * @param {Object} applicationParameters - the object containing numbers or strings to convert to integers
 * @param {NumberLike} applicationParameters.LumpSumInvestmentMonth - the chosen month of the lump sum investment
 * @param {NumberLike} applicationParameters.LumpSumInvestmentAmount - the specified lump sum investment amount
 * @param {NumberLike} applicationParameters.DebitOrderStartMonth - the chosen month of the first debit order
 * @param {NumberLike} applicationParameters.DebitOrderAmount - the predefined monthly deposit amount
 * @returns {Object} EarliestPermissibleDebitOrderStartMonth that first debit order may occur, TotalContributions of lump sum and debit orders, ExcessContributions exceeding tax year cap
 * @todo Allow variable debit amount input.
 */
export default function applicationCheck(applicationParameters) {

    let { LumpSumInvestmentMonth = 0, LumpSumInvestmentAmount = 0, DebitOrderStartMonth = 0, DebitOrderAmount = 0 } = formatNumbers(applicationParameters);

    /** @constant {number} 
     *  @default
     */
    const LUMP_SUM_LIMIT = 30000;

    let EarliestPermissibleDebitOrderStartMonth,
        TotalContributions,
        ExcessContributions;

    const scopeState = {
        MonthsRemaining: 0,
        StartMonth: 0,
        MaximumDebitMonths: 0,
        MaximumDebitAmount: 0,
        MaximumTotal: 0,
        ExcessContributions: 0,
    }

    /**
     * Calculates debit start month
     * @param {number} CalculateMonth - an integer representing a month in a 14 month cycle
     * @returns {number} integer representing month of first debit order
     */
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

    /**
     * Sets debit start month
     * @description determine if lump sum amount is provided and if lump sum month is greater than debit month, then select the applicable start month reference
     * @summary determine applicable start month reference (uses scoped state)
     */
    const setStartMonth = () => {
        let CalculateMonth = (LumpSumInvestmentAmount > 0 && LumpSumInvestmentMonth >= DebitOrderStartMonth) ? (LumpSumInvestmentMonth + 1) : DebitOrderStartMonth;
        scopeState.StartMonth = calculateStartMonth(CalculateMonth);
    }

    /**
     * Sets remaining months of the year
     * @description determine which side of the tax year application falls on, then select the applicable total to deduct start month from
     * @summary determine which side of the tax year to deduct start month from (uses scoped state)
     */
    const setMonthsRemaining = () => {
        let { StartMonth, MonthsRemaining } = scopeState;

        if(StartMonth <= 2) {
            MonthsRemaining = 2 - StartMonth;
        } else {
            MonthsRemaining = 14 - StartMonth;
        }
        scopeState.MonthsRemaining = MonthsRemaining;
    }

    /**
     * Sets maximum amount that may be debited
     * @description determine maximum debit contributions by multiplying the monthly debit amount by the remaining months
     * @summary determine maximum amount that may be debited in remaining tax year (uses scoped state)
     */
    const setMaximumDebitAmount = () => {
        let { MonthsRemaining } = scopeState;
        scopeState.MaximumDebitAmount = MonthsRemaining * DebitOrderAmount;
    }

    /**
     * Sets maximum total contributions
     * @description determine maximum total contributions by summing the maximum debit amount possible with any provided lump sum investment
     * @summary determine maximum total contributions for the remaining tax year (uses scoped state)
     */
    const setMaximumTotal = () => {
        let { MaximumDebitAmount } = scopeState;
        scopeState.MaximumTotal = MaximumDebitAmount + LumpSumInvestmentAmount;
    }

    /**
     * Sets earliest possible debit month
     * @description determine if any debit months are possible and roll over to first debit month of the follow tax year, else determine the earliest possible debit month by deducting the maximum debit months possible from the remaining months of the tax year. Set excess contributions from the difference of the maximum total contributions and tax year contributions cap.
     * @summary determine the earliest possible debit month if in excess of contributions tax cap (uses scoped state)
     */
    const setEarliestStartMonth = () => {
        let { MaximumDebitMonths, StartMonth, MonthsRemaining } = scopeState;

        MaximumDebitMonths = Math.floor((LUMP_SUM_LIMIT - LumpSumInvestmentAmount) / DebitOrderAmount);

        if(MaximumDebitMonths > 0) {
            let CalculateMonth = (MonthsRemaining - MaximumDebitMonths) + (StartMonth + 1);
            scopeState.StartMonth = calculateStartMonth(CalculateMonth);
        } else {
            scopeState.StartMonth = 3; // roll over to beginning of next tax year
        }
        scopeState.ExcessContributions = scopeState.MaximumTotal - LUMP_SUM_LIMIT;
    }

    setStartMonth();
    setMonthsRemaining();
    setMaximumDebitAmount();
    setMaximumTotal();

    if (LumpSumInvestmentAmount > LUMP_SUM_LIMIT) {
        console.log('Exceeds contributions limit.');
    } else if(scopeState.MaximumTotal > LUMP_SUM_LIMIT) {
        setEarliestStartMonth();
    }

    EarliestPermissibleDebitOrderStartMonth = scopeState.StartMonth;
    TotalContributions = formatNumberDecimal(scopeState.MaximumTotal);
    ExcessContributions = formatNumberDecimal(scopeState.ExcessContributions);

    return { EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions };
}