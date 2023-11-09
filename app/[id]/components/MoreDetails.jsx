"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Remarks from "./Remarks";

const MoreDetails = ({ remarks }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const hasWarning = remarks.some((remark) => remark.type === "warning");
    if (hasWarning) {
      setWarning(true);
    }
  }, [remarks]);

  return (
    <div
      className={`more-details ${showDetails ? "show" : ""} ${
        warning ? "warning" : ""
      }`}
    >
      <button onClick={() => setShowDetails((prev) => !prev)}>
        <motion.div
          initial="collpased"
          animate={showDetails ? "expanded" : "collapsed"}
          variants={{ collapsed: { rotate: 0 }, expanded: { rotate: 180 } }}
          transition={{ duration: 0.4 }}
        >
          &darr;
        </motion.div>
      </button>
      {showDetails && (
        <>
          <div className="hints">
            <h4>Details</h4>
            <Remarks remarks={remarks} type={"hints"} />
          </div>
          {warning && (
            <div className="warnings">
              <h4>Warnings</h4>
              <Remarks remarks={remarks} type={"warnings"} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoreDetails;
