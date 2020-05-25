import applicationCheck from './utilities';

const inputMock = [
    { LumpSumInvestmentMonth: 8, LumpSumInvestmentAmount: '20000', DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
    { LumpSumInvestmentMonth: 10, LumpSumInvestmentAmount: '20000', DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
    { LumpSumInvestmentMonth: 5, LumpSumInvestmentAmount: 0, DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
    { LumpSumInvestmentMonth: 5, LumpSumInvestmentAmount: '25000', DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
    { LumpSumInvestmentMonth: 5, LumpSumInvestmentAmount: '27000', DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
    { LumpSumInvestmentMonth: 5, LumpSumInvestmentAmount: '28000', DebitOrderStartMonth: 5, DebitOrderAmount: 2500 },
];

describe('applicationCheck', () => {

    it('should process invalid application WITH lump sum', () => {
        // expect excess contributions
        expect(applicationCheck(inputMock[0])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 11, TotalContributions: '32500.00', ExcessContributions: '2500.00'
        });
    });

    it('should process valid application WITH lump sum', () => {
        // expect valid first debit month and no excess contributions
        expect(applicationCheck(inputMock[1])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 11, TotalContributions: '27500.00', ExcessContributions: '0.00'
        });
    });

    it('should process valid application WITHOUT lump sum', () => {
        // expect no excess contributions
        expect(applicationCheck(inputMock[2])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 5, TotalContributions: '22500.00', ExcessContributions: '0.00'
        });
    });

    it('should process application with next year roll-over of first debit order month', () => {
        // expect first debit month Jan
        expect(applicationCheck(inputMock[3])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 1, TotalContributions: '45000.00', ExcessContributions: '15000.00'
        });
        // expect first debit month Feb
        expect(applicationCheck(inputMock[4])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 2, TotalContributions: '47000.00', ExcessContributions: '17000.00'
        });
    });

    it('should process application with new tax year roll-over of first debit order month', () => {
        // expect first debit month Mar (following tax year)
        expect(applicationCheck(inputMock[5])).toEqual({
            EarliestPermissibleDebitOrderStartMonth: 3, TotalContributions: '48000.00', ExcessContributions: '18000.00'
        });
    });

});