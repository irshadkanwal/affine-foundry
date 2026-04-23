export const formatDataForTable = (dataArray) => {
  return dataArray?.map((value) => ({
    verpass: value?.verificationPass,
    verfail: value?.verificationFail,
    vertotal: value?.verificationTotal,
    verpassPc: `${Math.ceil(value?.verificationPercent * 100)}%`,
    valpass: value?.validationPass,
    valfail: value?.validationFail,
    valtotal: value?.validationTotal,
    valpassPc: `${Math.ceil(value?.validationPercent * 100)}%`,
    tlpass: value?.totalPass,
    tlfail: value?.totalFail,
    tltotal: value?.total, //
    tlpassPc: `${Math.ceil(value?.totalPercent * 100)}%`,
  }));
};
export function formatTotalRowForTable(formattedData) {
  const initialTotalValues = {
    verpass: 0,
    verfail: 0,
    vertotal: 0,
    verpassPc: 0,
    valpass: 0,
    valfail: 0,
    valtotal: 0,
    valpassPc: 0,
    tlpass: 0,
    tlfail: 0,
    tltotal: 0, //
    tlpassPc: 0,
  };
  return formattedData?.reduce((acc, currentValue) => {
    acc.verpass += currentValue.verificationPass;
    acc.verfail += currentValue.verificationFail;
    acc.vertotal += currentValue.verificationTotal;
    acc.verpassPc = `${Math.ceil((acc.verpass / acc.vertotal) * 100)}%`;
    acc.valpass += currentValue.validationPass;
    acc.valfail += currentValue.validationFail;
    acc.valtotal += currentValue.validationTotal;
    acc.valpassPc = `${Math.ceil((acc.valpass / acc.valtotal) * 100)}%`;
    acc.tlpass += currentValue.totalPass;
    acc.tlfail += currentValue.totalFail;
    acc.tltotal += currentValue.totalPass + currentValue.totalFail;
    acc.tlpassPc = `${Math.ceil((acc.tlpass / acc.tltotal) * 100)}%`;
    return acc;
  }, initialTotalValues);
}
