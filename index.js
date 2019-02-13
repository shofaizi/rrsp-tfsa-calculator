var app = new Vue({
  el: '#app',
  data: {
    marginalTaxRate: '',
    averageTaxRateInRetirement: '',
    deposit: '',
    investmentPeriod: '',
    returnOnInvestment: '',
    inflationRate: '',
    tfsaResults: {
      deposit: 0.00.toFixed(2),
      futureValue: 0.00.toFixed(2),
      futureTaxPaid: 0.00.toFixed(2),
      afterTaxFutureValue: 0.00.toFixed(2)
    },
    rrspResults: {
      deposit: 0.00.toFixed(2),
      futureValue: 0.00.toFixed(2),
      futureTaxPaid: 0.00.toFixed(2),
      afterTaxFutureValue: 0.00.toFixed(2)
    },
    errorMessages: [],
  },
  methods: {
    calculateAfterTaxDeposit: function (deposit, marginalTaxRate) {
      /*
        NOTE:
          Subtracts marginal tax rate from 100% then it multiplies
          the difference by the deposit

        PARAMETERS:
          deposit = $
          marginalTaxRate = decimal
      */

      let percentDifference = (1.0 - marginalTaxRate);
      return (deposit / percentDifference);
    },
    calculateRealRateReturn: function (returnOnInvestment, inflationRate) {
      return ((1 + returnOnInvestment) / (1 + inflationRate)) - 1;
    },
    calculateFutureValue: function (deposit, realReturnRate, investmentPeriod) {
      return (deposit * ((1 + realReturnRate) ** investmentPeriod));
    },
    calculateFutureTax: function (futureValue, averageTaxRateInRetirement) {
      return (futureValue * averageTaxRateInRetirement);
    },
    calculateResults: function () {
      
      /*
        NOTE:
          Validate user input first. If parameters are missing or incorrect input
          is given then throw error messages. Otherwise, calculate the results and
          display them.
      */
      this.validateInput();

      if (this.errorMessages.length == 0) {

        // NOTE: Variables have precise values and are used for calculations
        let marginalTaxRate = parseFloat(this.marginalTaxRate) / 100
        let averageTaxRateInRetirement = parseFloat(this.averageTaxRateInRetirement) / 100
        let deposit = parseFloat(this.deposit)
        let investmentPeriod = parseFloat(this.investmentPeriod)
        let returnOnInvestment = parseFloat(this.returnOnInvestment) / 100
        let inflationRate = parseFloat(this.inflationRate) / 100
        let realReturnRate = this.calculateRealRateReturn(returnOnInvestment, inflationRate)

        // NOTE: tfsaResults and rrspResults will have 2 decimal points to display in UI.
        // Set deposit for TFSA and RRSP
        let rrspDeposit = this.calculateAfterTaxDeposit(deposit, marginalTaxRate);
        this.tfsaResults.deposit = deposit.toFixed(2);
        this.rrspResults.deposit = rrspDeposit.toFixed(2);

        // Set Future Value for TFSA and RRSP
        this.tfsaResults.futureValue = this.calculateFutureValue(this.tfsaResults.deposit, realReturnRate, investmentPeriod).toFixed(2);
        this.rrspResults.futureValue = this.calculateFutureValue(rrspDeposit, realReturnRate, investmentPeriod).toFixed(2);
        var rrspFutureValue = this.calculateFutureValue(rrspDeposit, realReturnRate, investmentPeriod)

        // Set Future Tax Paid for RRSP only
        this.rrspResults.futureTaxPaid = this.calculateFutureTax(rrspFutureValue, averageTaxRateInRetirement).toFixed(2);

        // Set After-Tax Future Value for TFSA and RRSP
        this.tfsaResults.afterTaxFutureValue = this.tfsaResults.futureValue;
        this.rrspResults.afterTaxFutureValue = (this.rrspResults.futureValue - this.rrspResults.futureTaxPaid).toFixed(2);
      };
    },
    isNumeric: function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    validateInput: function () {

      var inputs = {
        marginalTaxRate: "'Marginal Tax Rate'",
        averageTaxRateInRetirement: "'Average Tax Rate in Retirement'",
        deposit: "'Deposit'",
        investmentPeriod: "'Investment Period'",
        returnOnInvestment: "'Return on Investment'",
        inflationRate: "'Inflation Rate'"
      }

      // Refreshes the list
      this.errorMessages = [];

      for(key in inputs) {

        // Check for negative values
        if(this[key] < 0) {
          this.errorMessages.push("Please enter a positive numerical value for " + inputs[key])
        }

        // Check for non-numerical values
        else if (!this.isNumeric(this[key])) {
          this.errorMessages.push("Please enter a numerical value for " + inputs[key])
        };
      }
    }
  },
})
