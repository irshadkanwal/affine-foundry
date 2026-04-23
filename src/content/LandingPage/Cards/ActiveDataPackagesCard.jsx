import Loading from "components/Loading";
import { useTopActiveDataPackages } from "hooks/dashboard/useTopActiveDataPackages";
import React from "react";

function ActiveDataPackagesCard({ className = "" }) {
  const { data: topActiveData, isLoading: isActiveDataLoading } =
    useTopActiveDataPackages();
  const packageData = topActiveData?.slice(0, 4) || [];

  return (
    <div className={`landing-page-card ${className}`}>
      <div className="landing-page-card-header">
        <p>Top Active Data Packages</p>
      </div>
      {isActiveDataLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="landing-page-card-body package_list">
          {packageData?.map((item, index) => {
            return (
              <div key={item.id}>
                <div
                  className="package_list_item"
                  style={{
                    padding: item.id === 1 && "0 15px 10px 15px",
                  }}
                >
                  {item.name}
                </div>
                {index < packageData?.length - 1 && (
                  <div className="card_custom_hr"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActiveDataPackagesCard;
