export default function FundingDistribution() {
  return (
    <section id="distribution">
      <h2>Business Funding Distribution</h2>

      <table className="raae-table">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Estimated Funding %</th>
          </tr>
        </thead>

        <tbody>
          <tr><td>Retail</td><td>15%</td></tr>
          <tr><td>Manufacturing</td><td>20%</td></tr>
          <tr><td>Agriculture</td><td>30%</td></tr>
          <tr><td>Energy</td><td>15%</td></tr>
          <tr><td>Mining</td><td>10%</td></tr>
          <tr><td>Other</td><td>5%</td></tr>
          <tr><td>Tourism</td><td>5%</td></tr>
        </tbody>
      </table>
    </section>
  )
}