"use client";

import Image from "next/image";

const Remarks = ({ remarks, type, details = true }) => {
  if (type === "hints") {
    if (details) {
      return remarks.map((remark, key) => {
        if (remark.type === "hint") {
          return <div key={key}>{remark.text}</div>;
        }
      });
    } else {
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
