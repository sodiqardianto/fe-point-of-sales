"use client";
import React, { createElement } from "react";
import { Typography } from "@material-tailwind/react";

import { statisticsCardsData } from "../data/statistics-cards-data";
import StatisticsCard from "@/components/StatisticsCard";

const Dashboard = () => {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            value={footer.value}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
            color={"blue"}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
