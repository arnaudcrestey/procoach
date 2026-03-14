"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

type RadarData = {
  subject: string;
  score: number;
};

export function ProfileRadar({ data }: { data: RadarData[] }) {
  return (
    <div className="glass h-72 w-full rounded-2xl p-6 md:p-8">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius="70%"
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid stroke="rgba(255,255,255,0.25)" />

          <PolarAngleAxis
            dataKey="subject"
            stroke="#d4ceff"
            tick={{ fontSize: 12 }}
          />

          <Radar
            dataKey="score"
            stroke="#59d6ff"
            fill="#8f7bff"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
