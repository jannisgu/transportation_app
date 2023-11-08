"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductIcon = ({ type }) => {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <div>
      <div
        className={`product ${showTitle ? "expanded" : ""}`}
        onClick={() => setShowTitle((prev) => !prev)}
      >
        <Image src={`/${type}.png`} alt={type} width={22} height={22} />
        {showTitle && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            className="title"
          >
            {type}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductIcon;
