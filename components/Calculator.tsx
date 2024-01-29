'use client';

import React, { useState } from 'react';
import Input from './Input';
import DurationToggle from './DurationToggle';
import Chart from './Chart';

const formatToCurrency = (number: number) => {
  return new Intl.NumberFormat('et-ET', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(number);
};

const calculateCompoundFutureValue = (
  initialInvestment: number,
  contribution: number,
  investmentPeriods: number,
  monthlyInterval: boolean,
  dailyRateOfReturn: number
) => {
  const durationMultiplier = monthlyInterval ? 12 : 1;
  let futureValueSum = initialInvestment;
  let yearlyTotals = [initialInvestment];

  for (let i = 1; i <= investmentPeriods; i++) {
    // - for monthly contributions, calculating the interest by using the average length of a month. (365 / 12) days
    const daysInPeriod = 365 / durationMultiplier;

    // - assuming contributions are added at the end of the period, thus not collecting interest for the current period
    futureValueSum = Math.pow(1 + dailyRateOfReturn, daysInPeriod) * futureValueSum + contribution;

    if (i % durationMultiplier === 0) {
      yearlyTotals.push(futureValueSum);
    }
  }

  return { totalFutureValue: futureValueSum, yearlyTotals };
};

const Calculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [contribution, setContribution] = useState(200);
  const [monthlyInterval, setMonthlyInterval] = useState(true);
  const [investmentDuration, setInvestmentDuration] = useState(5);
  const [annualRateOfReturn, setAnnualRateOfReturn] = useState(5);

  const durationMultiplier = monthlyInterval ? 12 : 1;
  const dailyRateOfReturn = annualRateOfReturn / 100 / 365;
  const investmentPeriods = investmentDuration * durationMultiplier;
  const totalContributions = investmentPeriods * contribution;

  const totalInvested = initialInvestment + totalContributions;

  const { totalFutureValue, yearlyTotals } = calculateCompoundFutureValue(
    initialInvestment,
    contribution,
    investmentPeriods,
    monthlyInterval,
    dailyRateOfReturn
  );

  const totalReturnOnInvestment = (totalFutureValue / totalInvested - 1) * 100;

  const chartData = yearlyTotals.map((balance, index) => {
    const principal = initialInvestment + index * durationMultiplier * contribution;
    const interest = balance - principal;
    return {
      name: `Year ${index}`,
      balance,
      principal: Number(principal.toFixed(0)),
      interest: Number(interest.toFixed(0)),
    };
  });

  return (
    <div>
      <div className="relative z-10 w-full p-6 sm:p-3 bg-pallette-green-dark rounded-2xl sm:mt-8">
        <h1 className="mb-4 text-xl font-bold text-center sm:mt-2 text-pallette-green-light">
          Compound calculator
        </h1>
        <div className="flex flex-col w-full gap-4 mx-auto">
          <div className="flex justify-center w-full gap-3">
            <Input
              type="number"
              label="Initial investment"
              name="initialInvestment"
              required
              min={0}
              step={100}
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Math.abs(e.target.valueAsNumber))}
            />
            <Input
              type="number"
              label="Contribution"
              name="contribution"
              required
              min={0}
              step={10}
              value={contribution}
              onChange={(e) => setContribution(Math.abs(e.target.valueAsNumber))}
            />
          </div>
          <DurationToggle
            label="Contribution frequency"
            value={monthlyInterval}
            onChange={() => setMonthlyInterval((prev) => !prev)}
          />
          <div className="flex gap-3">
            <Input
              type="number"
              label="Years of growth"
              name="investmentDuration"
              required
              min={1}
              step={1}
              value={investmentDuration}
              onChange={(e) => setInvestmentDuration(Math.abs(e.target.valueAsNumber))}
            />
            <Input
              type="number"
              label="Est. annual return"
              name="annualReturn"
              step={0.1}
              required
              value={annualRateOfReturn}
              onChange={(e) => setAnnualRateOfReturn(e.target.valueAsNumber)}
            />
          </div>
        </div>
        <h4 className="mt-4 text-sm text-pallette-green-light sm:text-xs">Total future value:</h4>
        <div className="flex items-end justify-between">
          <p className="text-2xl text-pallette-green-light">{formatToCurrency(totalFutureValue)}</p>
          <p className="text-sm text-pallette-green-light">
            ({totalReturnOnInvestment.toFixed(2)} %)
          </p>
        </div>
        <h4 className="mt-4 text-sm text-pallette-green-light sm:text-xs">Total contributions:</h4>
        <p className="text-2xl text-pallette-green-light">{formatToCurrency(totalInvested)}</p>
      </div>

      <Chart data={chartData} />
    </div>
  );
};

export default Calculator;
