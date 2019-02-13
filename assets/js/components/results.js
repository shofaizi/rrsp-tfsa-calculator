Vue.component('results', {
  props: {
    tfsa: {
      required: true,
      type: Object
    },
    rrsp: {
      required: true,
      type: Object
    },
  },
  template: `
    <div class="results">
      <table style='margin-top: 2rem;'>
        <tr>
          <th></th>
          <th>TFSA</th>
          <th>RRSP</th>
        </tr>
        <tr>
          <td>Total Deposit</td>
          <td>$ {{ tfsa.deposit }}</td>
          <td>$ {{ rrsp.deposit }}</td>
        </tr>
        <tr>
          <td>Future Value</td>
          <td>$ {{ tfsa.futureValue }}</td>
          <td>$ {{ rrsp.futureValue }}</td>
        </tr>
        <tr>
          <td>Future Tax Paid</td>
          <td>$ {{ tfsa.futureTaxPaid }}</td>
          <td :class="{'rrspFutureTaxPaid' : rrsp.futureTaxPaid > 0}">$ {{ rrsp.futureTaxPaid }}</td>
        </tr>
        <tr>
          <td>After Tax Future Value</td>
          <td :class="{'totalAfterTax' : tfsa.afterTaxFutureValue > 0}">$ {{ tfsa.afterTaxFutureValue }}</td>
          <td :class="{'totalAfterTax' : rrsp.afterTaxFutureValue > 0}">$ {{ rrsp.afterTaxFutureValue }}</td>
        </tr>
      </table>
      <br>
      <note></note>
    </div>
  `
})
