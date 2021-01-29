const ctx = document.querySelector(".js-chart").getContext("2d");

const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData().then(parseData).then(getLabelsAndData).then(drawChart);

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => response.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);

      acc.tempsGlobal.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);

      acc.tempsNHem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);

      acc.tempsSHem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);

      return acc;
    },
    { years: [], tempsGlobal: [], tempsNHem: [], tempsSHem: [] }
  );
}

function drawChart({ years, tempsGlobal, tempsNHem, tempsSHem }) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Global temps",
          data: tempsGlobal,
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Nhem temps",
          data: tempsNHem,
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          fill: false,
        },
        {
          label: "SHem temps",
          data: tempsSHem,
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + "°";
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + " year";
              },
            },
          },
        ],
      },
    },
  });
}

// function fetchData() {
//   fetch("./ZonAnn.Ts+dSST.csv")
//     .then((response) => response.text())
//     .then((data) => {
//       const parseData = Papa.parse(data, { header: true }).data;

//       const mappedData = parseData.reduce(
//         (acc, entry) => {
//           acc.years.push(entry.Year);
//           acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
//           return acc;
//         },
//         { years: [], temps: [] }
//       );

//       // const years = parseData.map((entry) => entry.Year);

//       // const temps = parseData.map(
//       //   (entry) => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE
//       // );

//       console.log(parseData);

//       new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: mappedData.years,
//           datasets: [
//             {
//               label: "Global temps",
//               data: mappedData.temps,
//               borderColor: ["rgba(255, 99, 132, 1)"],
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   callback: function (value, index, values) {
//                     return value + "°";
//                   },
//                 },
//               },
//             ],
//             xAxes: [
//               {
//                 ticks: {
//                   callback: function (value, index, values) {
//                     return value + " year";
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       });
//     });
// }
