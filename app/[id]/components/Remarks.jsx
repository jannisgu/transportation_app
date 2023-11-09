"use client";

import Image from "next/image";

const Remarks = ({ remarks, type, details = true }) => {
  // handle remarks based on type and position
  if (type === "hints") {
    if (details) {
      // if hints and position is inside of "MoreDetails"
      return remarks.map((remark, key) => {
        if (remark.type === "hint") {
          return <div key={key}>{remark.text}</div>;
        }
      });
    } else {
      // if position is on front
      return remarks.map((remark, key) => {
        if (remark.type === "hint") {
          if (remark.code === "FK") {
            return (
              <div className="hint" key={key} title={remark.text}>
                <Image
                  src={"/bicycle.png"}
                  alt="bicycle conveyance"
                  width={20}
                  height={20}
                />
              </div>
            );
          } else if (remark.code === "WV") {
            return (
              <div className="hint" key={key} title={remark.text}>
                <Image
                  src={"/wifi.png"}
                  alt="wifi available"
                  width={20}
                  height={20}
                />
              </div>
            );
          }
        }
      });
    }
  } else if (type === "warnings") {
    return remarks.map((remark, key) => {
      if (remark.type === "warning") {
        return (
          <div
            key={key}
            dangerouslySetInnerHTML={{ __html: remark.text }}
          ></div>
        );
      }
    });
  }
};

export default Remarks;
