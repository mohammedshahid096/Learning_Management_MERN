import { Card } from "flowbite-react";
import React from "react";
import ApexChart from "react-apexcharts";

export const CourseLevelAnalysis = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = data && data.map((item) => item.count);
  const options = {
    labels: data && data.map((item) => item.level),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Card className={`p-3 text-black ${className}`}>
      <h4 className=" font-bold text-center text-white">Level Wise Courses</h4>
      <ApexChart
        options={options}
        series={series || []}
        type="pie"
        width={width}
        height={350}
      />
    </Card>
  );
};

export const CourseTop5Purchase = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = [
    {
      name: "Purchases",
      type: "column",
      data: data && data.map((item) => item.purchase),
    },
    {
      name: "Rating",
      type: "line",
      data: data && data.map((item) => item.rating),
    },
  ];

  const options = {
    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },

    dataLabels: {
      enabled: true,
      // enabledOnSeries: [1],
      // distributed: true,
    },
    labels: data && data.map((item) => item.name),
    yaxis: [
      {
        title: {
          text: "No.of.Purchase",
        },
      },
      {
        opposite: true,
        title: {
          text: "No.of.Ratings",
        },
      },
    ],
  };

  return (
    <Card className={`p-3 max-sm:p-0 text-black ${className}`}>
      <h4 className=" font-bold text-center text-white">
        Top 5 Course Purchase
      </h4>
      <ApexChart
        options={options}
        series={series || []}
        type="line"
        width={width}
        height={350}
      />
    </Card>
  );
};

export const CoursePyramidAnalysis = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = [
    {
      name: "",
      data: data && data.map((item) => item.rating),
    },
  ];
  const options = {
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    colors: [
      "#F44F5E",
      "#E55A89",
      "#D863B1",
      "#CA6CD8",
      "#B57BED",
      "#8D95EB",
      "#62ACEA",
      "#4BC3E6",
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: "Pyramid Chart",
      align: "middle",
    },
    xaxis: {
      categories: data && data.map((item) => item.name),
    },
    legend: {
      show: false,
    },
  };

  return (
    <Card className={`p-3 max-sm:p-0 text-black ${className}`}>
      <h4 className=" font-bold text-center text-white">Top Courses</h4>
      <ApexChart
        options={options}
        series={series || []}
        type="bar"
        width={width}
        height={350}
      />
    </Card>
  );
};
