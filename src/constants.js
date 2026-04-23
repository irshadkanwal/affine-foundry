export const CONNECTION_TYPES = [
  {
    id: 1,
    label: "AWS S3",
  },
  {
    id: 2,
    label: "SFTP",
  },
  {
    id: 3,
    label: "FTP/S",
  },
  {
    id: 4,
    label: "RDBMS",
  },
  {
    id: 5,
    label: "HTTPS",
  },
];

export const FREQUENCY = [
  {
    value: "Real-Time",
    label: "Real-Time",
  },
  {
    value: "Hourly",
    label: "Hourly",
  },
  {
    value: "Daily",
    label: "Daily",
  },
  {
    value: "Weekly",
    label: "Weekly",
  },
  {
    value: "Monthly",
    label: "Monthly",
  },
];

export const DAYS = [
  {
    value: 1,
    label: "Mon",
  },
  {
    value: 2,
    label: "Tue",
  },
  {
    value: 3,
    label: "Wed",
  },
  {
    value: 4,
    label: "Thu",
  },
  {
    value: 5,
    label: "Fri",
  },
  {
    value: 6,
    label: "Sat",
  },
  {
    value: 7,
    label: "Sun",
  },
];
export const AT_LIST = [
  { value: 0, label: "12:00 AM" },
  { value: 30, label: "12:30 AM" },
  { value: 100, label: "1:00 AM" },
  { value: 130, label: "1:30 AM" },
  { value: 200, label: "2:00 AM" },
  { value: 230, label: "2:30 AM" },
  { value: 300, label: "3:00 AM" },
  { value: 330, label: "3:30 AM" },
  { value: 400, label: "4:00 AM" },
  { value: 430, label: "4:30 AM" },
  { value: 500, label: "5:00 AM" },
  { value: 530, label: "5:30 AM" },
  { value: 600, label: "6:00 AM" },
  { value: 630, label: "6:30 AM" },
  { value: 700, label: "7:00 AM" },
  { value: 730, label: "7:30 AM" },
  { value: 800, label: "8:00 AM" },
  { value: 830, label: "8:30 AM" },
  { value: 900, label: "9:00 AM" },
  { value: 930, label: "9:30 AM" },
  { value: 1000, label: "10:00 AM" },
  { value: 1030, label: "10:30 AM" },
  { value: 1100, label: "11:00 AM" },
  { value: 1130, label: "11:30 AM" },
  { value: 1200, label: "12:00 PM" },
  { value: 1230, label: "12:30 PM" },
  { value: 1300, label: "1:00 PM" },
  { value: 1330, label: "1:30 PM" },
  { value: 1400, label: "2:00 PM" },
  { value: 1430, label: "2:30 PM" },
  { value: 1500, label: "3:00 PM" },
  { value: 1530, label: "3:30 PM" },
  { value: 1600, label: "4:00 PM" },
  { value: 1630, label: "4:30 PM" },
  { value: 1700, label: "5:00 PM" },
  { value: 1730, label: "5:30 PM" },
  { value: 1800, label: "6:00 PM" },
  { value: 1830, label: "6:30 PM" },
  { value: 1900, label: "7:00 PM" },
  { value: 1930, label: "7:30 PM" },
  { value: 2000, label: "8:00 PM" },
  { value: 2030, label: "8:30 PM" },
  { value: 2100, label: "9:00 PM" },
  { value: 2130, label: "9:30 PM" },
  { value: 2200, label: "10:00 PM" },
  { value: 2230, label: "10:30 PM" },
  { value: 2300, label: "11:00 PM" },
  { value: 2330, label: "11:30 PM" },
];

export const RESOURCE_DATA_FORMAT = [
  {
    id: 1,
    label: "Fixed-Width",
  },
  {
    id: 2,
    label: "Delimited",
  },
  {
    id: 3,
    label: "JSON",
  },
  {
    id: 4,
    label: "X12",
  },
  {
    id: 5,
    label: "XML",
  },
  {
    id: 6,
    label: "HL7v2",
  },
  {
    id: 7,
    label: "C-CDA",
  },
  {
    id: 8,
    label: "Parquet",
  },
  {
    id: 9,
    label: "Avro",
  },
  {
    id: 10,
    label: "ORC",
  },
];
export const INITIAL_BUTTON_CONFIG = {
  isFormTab: true,
  isSubmitting: false, // this would mimic the isLoading from child component - Form
};
export const TRIGGER_OPTIONS = [
  {
    label: "Manual",
    value: 1,
  },
  {
    label: "Schedule",
    value: 2,
  },
  {
    label: "Continuous",
    value: 3,
  },
];
export const dataLevelType = [
  { id: 1, name: "Raw" },
  { id: 2, name: "Bronze" },
  { id: 3, name: "Silver" },
  { id: 4, name: "Gold" },
];
export const idleTimeDropDownValues = [
  {
    value: 0,
    label: "Day 0",
  },
  {
    value: 1,
    label: "Day 1",
  },
  {
    value: 2,
    label: "Day 2",
  },
  {
    value: 3,
    label: "Day 3",
  },
  {
    value: 4,
    label: "Day 4",
  },
  {
    value: 5,
    label: "Day 5",
  },
  {
    value: 6,
    label: "Day 6",
  },
];
export const clusterSize = [
  {
    value: "small",
    label: "small",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
   value: "large",
   label: "large",
  },
];
