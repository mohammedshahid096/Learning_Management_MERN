import { Card } from "flowbite-react";
import React from "react";
import ApexChart from "react-apexcharts";

export const UserDashboardYearWise = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = [
    { name: "Months", data: data && data.map((item) => item.count) },
  ];
  const options = {
    chart: {
      type: "bar",
    },
    zoom: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 15,
      dropShadow: {
        enabled: true,
        left: 2,
        top: 2,
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data && data.map((item) => item.month_name),
      title: {
        text: "No.of.Users",
      },
    },
    yaxis: {
      title: {
        text: "Month",
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 10,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  return (
    <Card className={`p-3 text-black ${className}`}>
      <h4 className=" font-bold text-center text-white">Year Wise Users</h4>
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

export const UserDashboardRole = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = [
    { name: "Role", data: data && data.map((item) => item.count) },
  ];
  const options = {
    chart: {
      type: "bar",
    },
    zoom: {
      enabled: true,
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      dropShadow: {
        enabled: true,
        left: 2,
        top: 2,
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data && data.map((item) => item._id),
      title: {
        text: "No.of.Users",
      },
    },
    yaxis: {
      title: {
        text: "Month",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 10,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  return (
    <Card className={`p-3 text-black ${className}`}>
      <h4 className=" font-bold text-center text-white">User Role Based</h4>
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

export const UserDashboardSocialDonut = ({
  className,
  width = undefined,
  data = null,
}) => {
  const series = data && Object.values(data);
  const options = {
    chart: {
      height: 200,
      type: "donut",
      align: "center",
    },
    labels: ["Social", "Non-Social"],
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      show: true,
    },
    responsive: [
      {
        breakpoint: 45,
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
      <h4 className=" font-bold text-center text-white">User Account Based</h4>
      <ApexChart
        options={options}
        series={series || []}
        type="donut"
        width={width}
        height={350}
      />
    </Card>
  );
};
