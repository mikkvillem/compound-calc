import React from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
type ChartData = {
  name: string;
  balance: number;
  principal: number;
  interest: number;
};

type Props = {
  data: ChartData[];
};

type TooltipPayload = {
  name: string;
  payload: ChartData;
};

type TooltipProps = {
  active: boolean;
  payload: TooltipPayload[];
  label: string;
};

const CustomTooltip = ({ active, payload, label }: Partial<TooltipProps>) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-full py-2 text-xs font-bold rounded-t-md">
        <p className="text-center text-black">{`Year ${label}`}</p>
        <div className="flex justify-center w-full gap-2 px-1">
          <p>{`Principal: ${payload[0].payload.principal} €`}</p>
          <p>{`Interest: ${payload[1].payload.interest} €`}</p>
        </div>
      </div>
    );
  }

  return null;
};

const Chart = (props: Props) => {
  return (
    <ResponsiveContainer
      height={180}
      width="95%"
      className="mx-auto"
    >
      <BarChart
        data={props.data}
        stackOffset="sign"
        className="absolute z-0 mx-auto -mt-10 overflow-hidden bg-white rounded-xl"
        margin={{
          top: 45,
          right: 10,
          left: 10,
          bottom: 40,
        }}
      >
        <Tooltip
          isAnimationActive={false}
          allowEscapeViewBox={{ x: false, y: false }}
          position={{ x: 0, y: 135 }}
          wrapperClassName="visible"
          itemStyle={{
            width: '100%',
          }}
          active
          content={<CustomTooltip />}
          cursor={{ fill: '#B2DAC5', fillOpacity: '20%' }}
        />
        <Bar
          dataKey="principal"
          fill="#11864E"
          stackId="stack"
          isAnimationActive={false}
        />
        <Bar
          dataKey="interest"
          fill="#D9D9D9"
          stackId="stack"
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
