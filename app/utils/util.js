const headRow = [
  ["username", "minutesElapsed",
    "mfq_1", "mfq_2","mfq_3","mfq_4","mfq_5","mfq_6",
    "mfq_7","mfq_8","mfq_9","mfq_10","mfq_11","mfq_12",
    "mfq_13","mfq_14","mfq_15","mfq_16","mfq_17","mfq_18",
    "mfq_19","mfq_20","mfq_21","mfq_22","mfq_23","mfq_24",
    "mfq_25","mfq_26","mfq_27","mfq_28", "mfq_29","mfq_30",
    "mfq_31", "mfq_32","mfq_33","mfq_34","mfq_35","mfq_36",
  ]
];
const createCSV = (allRecords) => {
  let csvContent = "data:text/csv;charset=utf-8,";

  headRow.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  allRecords.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  return csvContent;
}

module.exports = createCSV;
