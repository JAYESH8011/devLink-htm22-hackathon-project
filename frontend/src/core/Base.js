import React from "react"


    const Base = ({
        className = "bg-dark text-white p-4",
        children
      }) => (
        <div>
          <div className="container-fluid">
           
            <div className={className}>{children}</div>
          </div>
          </div>
          )

export default Base;
