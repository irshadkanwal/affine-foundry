// //   return data?.reduce((acc, curr) => {
// //     if (acc.find((value) => value.category === curr.category)) {
// //       const foundCategory = acc.map((accValue) => {
// //         if (accValue.category === curr.category) {
// //           const verificationPassCount =
// //             curr.context === "Verification" && curr.status === "Pass"
// //               ? accValue.verificationPassCount + 1
// //               : accValue.verificationPassCount;
// //           const verificationFailCount =
// //             curr.context === "Verification" && curr.status === "Fail"
// //               ? accValue.verificationFailCount + 1
// //               : accValue.verificationFailCount;
// //           const validationPassCount =
// //             curr.context === "Validation" && curr.status === "Pass"
// //               ? accValue.validationPassCount + 1
// //               : accValue.validationPassCount;
// //           const validationFailCount =
// //             curr.context === "Validation" && curr.status === "Fail"
// //               ? accValue.validationFailCount + 1
// //               : accValue.validationFailCount;

// //           const verificationTotalCount =
// //             verificationPassCount + verificationFailCount;
// //           const validationTotalCount =
// //             validationPassCount + validationFailCount;
// //           const totalPassCount = verificationPassCount + validationPassCount;
// //           const totalFailCount = verificationFailCount + validationFailCount;

// //           const totalVerificationPassCount =
// //             accValue.totalVerificationPassCount + verificationPassCount;
// //           const totalVerificationFailCount =
// //             accValue.totalVerificationFailCount + verificationFailCount;
// //           const totalVerificationCount =
// //             totalVerificationPassCount + totalVerificationFailCount;
// //           const totalValidationPassCount =
// //             accValue.totalValidationPassCount + validationPassCount;
// //           const totalValidationFailCount =
// //             accValue.totalValidationFailCount + validationFailCount;
// //           const totalValidationCount =
// //             totalValidationFailCount + totalValidationPassCount;
// //           return {
// //             ...accValue,
// //             verificationPassCount,
// //             verificationFailCount,

// //             validationPassCount,
// //             validationFailCount,

// //             verificationTotalCount,
// //             validationTotalCount,

// //             verificationTotalPercent:
// //               verificationPassCount / verificationTotalCount,
// //             validationTotalPercent: validationPassCount / validationTotalCount,

// //             totalVerificationPassCount,
// //             totalVerificationFailCount,
// //             totalVerificationCount,
// //             totalVerificationPassPercent:
// //               totalVerificationPassCount / totalVerificationPassCount,

// //             totalValidationPassCount,
// //             totalValidationFailCount,
// //             totalValidationCount,
// //             totalValidationPassPercent:
// //               totalValidationPassCount / totalValidationCount,

// //             totalPassCount,
// //             totalFailCount,
// //             totalPassPercent:
// //               totalPassCount / (totalFailCount + totalPassCount),
// //           };
// //         }
// //         return accValue;
// //       });
// //       return foundCategory;
// //     }
// //     const verificationPassCount =
// //       curr.context === "Verification" && curr.status === "Pass" ? 1 : 0;
// //     const verificationFailCount =
// //       curr.context === "Verification" && curr.status === "Fail" ? 1 : 0;
// //     const validationPassCount =
// //       curr.context === "Validation" && curr.status === "Pass" ? 1 : 0;
// //     const validationFailCount =
// //       curr.context === "Validation" && curr.status === "Fail" ? 1 : 0;
// //     const totalPassCount = verificationPassCount + validationPassCount;
// //     const totalFailCount = verificationFailCount + validationFailCount;
// //     const totalVerificationPassCount = verificationPassCount;
// //     const totalVerificationFailCount = verificationFailCount;
// //     const totalVerificationCount =
// //       totalVerificationPassCount + totalVerificationFailCount;
// //     const totalValidationPassCount = validationPassCount;
// //     const totalValidationFailCount = validationFailCount;
// //     const totalValidationCount =
// //       totalValidationFailCount + totalValidationPassCount;
// //     return [
// //       ...acc,
// //       {
// //         category: curr.category,
// //         verificationPassCount,
// //         verificationFailCount,
// //         verificationTotalCount: 1,
// //         verificationTotalPercent: verificationPassCount / 1,

// //         validationPassCount,
// //         validationFailCount,
// //         validationTotalCount: 1,
// //         validationTotalPercent: validationPassCount / 1,

// //         totalVerificationPassCount,
// //         totalVerificationFailCount,
// //         totalVerificationCount,
// //         totalVerificationPassPercent:
// //           totalVerificationPassCount / totalVerificationCount,

// //         totalValidationPassCount,
// //         totalValidationFailCount,
// //         totalValidationCount,
// //         totalValidationPassPercent:
// //           totalValidationPassCount / totalValidationCount,

// //         totalPassCount,
// //         totalFailCount,
// //         totalPassPercent: totalPassCount / (totalFailCount + totalPassCount),
// //       },
// //     ];
// //   }, []);
// // };
// export const reducerFunction = (data = []) => {
//   const result = data.reduce((acc, curr) => {
//     const verificationPassCount =
//       curr.context === "Verification" && curr.status === "Pass" ? 1 : 0;
//     const verificationFailCount =
//       curr.context === "Verification" && curr.status === "Fail" ? 1 : 0;
//     const validationPassCount =
//       curr.context === "Validation" && curr.status === "Pass" ? 1 : 0;
//     const validationFailCount =
//       curr.context === "Validation" && curr.status === "Fail" ? 1 : 0;
//     const totalPassCount = verificationPassCount + validationPassCount;
//     const totalFailCount = verificationFailCount + validationFailCount;

//     const foundCategory = acc.find((value) => value.category === curr.category);
//     if (foundCategory) {
//       foundCategory.verificationPassCount += verificationPassCount;
//       foundCategory.verificationFailCount += verificationFailCount;
//       foundCategory.validationPassCount += validationPassCount;
//       foundCategory.validationFailCount += validationFailCount;
//       foundCategory.verificationTotalCount +=
//         verificationPassCount + verificationFailCount;
//       foundCategory.validationTotalCount +=
//         validationPassCount + validationFailCount;
//       foundCategory.totalVerificationPassCount += verificationPassCount;
//       foundCategory.totalVerificationFailCount += verificationFailCount;
//       foundCategory.totalVerificationCount +=
//         verificationPassCount + verificationFailCount;
//       foundCategory.totalValidationPassCount += validationPassCount;
//       foundCategory.totalValidationFailCount += validationFailCount;
//       foundCategory.totalValidationCount +=
//         validationPassCount + validationFailCount;
//       foundCategory.totalPassCount += totalPassCount;
//       foundCategory.totalFailCount += totalFailCount;
//       foundCategory.totalPassPercent =
//         foundCategory.totalPassCount /
//         (foundCategory.totalFailCount + foundCategory.totalPassCount);
//       foundCategory.verificationTotalPercent =
//         foundCategory.verificationPassCount /
//         foundCategory.verificationTotalCount;
//       foundCategory.validationTotalPercent =
//         foundCategory.validationPassCount / foundCategory.validationTotalCount;
//     } else {
//       acc.push({
//         category: curr.category,
//         verificationPassCount,
//         verificationFailCount,
//         verificationTotalCount: verificationPassCount + verificationFailCount,
//         verificationTotalPercent:
//           verificationPassCount /
//           (verificationPassCount + verificationFailCount),
//         validationPassCount,
//         validationFailCount,
//         validationTotalCount: validationPassCount + validationFailCount,
//         validationTotalPercent:
//           validationPassCount / (validationPassCount + validationFailCount),
//         totalVerificationPassCount: verificationPassCount,
//         totalVerificationFailCount: verificationFailCount,
//         totalVerificationCount: verificationPassCount + verificationFailCount,
//         totalVerificationPassPercent:
//           verificationPassCount /
//           (verificationPassCount + verificationFailCount),
//         totalValidationPassCount: validationPassCount,
//         totalValidationFailCount: validationFailCount,
//         totalValidationCount: validationPassCount + validationFailCount,
//         totalValidationPassPercent:
//           validationPassCount / (validationPassCount + validationFailCount),
//         totalPassCount,
//         totalFailCount,
//         totalPassPercent: totalPassCount / (totalFailCount + totalPassCount),
//       });
//     }
//     return acc;
//   }, []);

//   return result;
// };
