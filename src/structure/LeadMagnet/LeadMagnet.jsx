import React, { useState } from "react";
import GetNow from "../../structure/GetNow/GetNow";

const LeadMagnet = () => {
  const [showGetNow, setShowGetNow] = useState(true);
  const [showLeadMagnet, setShowLeadMagnet] = useState(true);

  const sampleBiodataDetails = {
    modelNumber: "0000",
    language: "English",
    type: "Guest",
    amount: 0,
  };

  return (
    <>
      { showLeadMagnet && (
        <GetNow
          heading={`Get 8 Free Biodata Sample and Biodata Tips`}
          paragraph={`Fill the details to get on your Whatsapp`}
          buttonTitle={`Submit`}
          isOpen={showGetNow}
          onClose={() => {
            setShowGetNow(false);
            setShowLeadMagnet(false);
          }}
          modelDetails={sampleBiodataDetails}
          isLeadMagnet={true}
        />
      )}
    </>
  );
};

export default LeadMagnet;
