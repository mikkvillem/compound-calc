'use client';

import React, { useState } from 'react';
import Input from './Input';
import Toggle from './Toggle';

const formatToCurrency = (number: number) => {
  return new Intl.NumberFormat('et-ET', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(number);
};

const calculateFutureValueOfRecurringContributions = (
  contribution: number,
  investmentPeriods: number,
  monthlyInterval: boolean,
  dailyRateOfReturn: number
) => {
  /* 

- calculating and summarizing the future value of each contribution at the end of the investment period
- assuming contributions are added at the end of the period, thus not collecting interest for the current period
- for monthly contributions, calculating the interest by using the average length of a month. (365 / 12) days

*/

  const durationMultiplier = monthlyInterval ? 12 : 1;
  let futureValueSum = 0;

  for (let i = 1; i <= investmentPeriods; i++) {
    const daysUntilEnd = 365 * ((investmentPeriods - i) / durationMultiplier);

    futureValueSum += Math.pow(1 + dailyRateOfReturn, daysUntilEnd) * contribution;
  }
  return futureValueSum;
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

  const futureValueOfInitialInvestment =
    initialInvestment * Math.pow(1 + dailyRateOfReturn, 365 * investmentDuration);

  const futureValueOfContributions = calculateFutureValueOfRecurringContributions(
    contribution,
    investmentPeriods,
    monthlyInterval,
    dailyRateOfReturn
  );

  return (
    <div className="w-full p-6 sm:p-3 bg-pallette-green-dark rounded-2xl sm:mt-8">
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
            onChange={(e) => setInitialInvestment(e.target.valueAsNumber)}
          />
          <Input
            type="number"
            label="Contribution"
            name="contribution"
            required
            step={10}
            value={contribution}
            onChange={(e) => setContribution(e.target.valueAsNumber)}
          />
        </div>
        <Toggle
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
            onChange={(e) => setInvestmentDuration(e.target.valueAsNumber)}
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
      <p className="text-2xl text-pallette-green-light">
        {formatToCurrency(futureValueOfContributions + futureValueOfInitialInvestment)}
      </p>
      <h4 className="mt-4 text-sm text-pallette-green-light sm:text-xs">Total contributions:</h4>
      <p className="text-2xl text-pallette-green-light">{formatToCurrency(totalInvested)}</p>
    </div>
  );
};

export default Calculator;
