import React from "react";

const Page1 = ({ data }) => {
  console.log(data);

  return (
    <div>
      {data?.map((item, i) => (
        <div key={i}>
          {item.type === "h1" && <h1>{item.value}</h1>}
          {item.type === "h2" && <h2>{item.value}</h2>}
          {item.type === "h3" && <h3>{item.value}</h3>}
          {item.type === "h4" && <h4>{item.value}</h4>}
          {item.type === "h5" && <h5>{item.value}</h5>}
          {item.type === "h6" && <h6>{item.value}</h6>}
          {item.type === "p" && <p>{item.value}</p>}

          {item.type === "ol" && (
            <ol>
              {item.value?.map((prevUl, index) => (
                <React.Fragment key={index}>
                  {prevUl.type === "li" &&
                    prevUl.value?.map((prevLi, liIndex) => (
                      <li key={liIndex}>
                        {prevLi.type === "h3" && <h3>{prevLi.value}</h3>}
                        {prevLi.type === "h4" && <h4>{prevLi.value}</h4>}
                        {prevLi.type === "h5" && <h5>{prevLi.value}</h5>}
                        {prevLi.type === "h6" && <h6>{prevLi.value}</h6>}
                        {prevLi.type === "p" && <p>{prevLi.value}</p>}
                      </li>
                    ))}

                  {prevUl.type === "ul" && (
                    <ul>
                      {prevUl.value?.map((prevLi, liIndex) =>
                        prevLi.type === "li" ? (
                          <li key={liIndex}>
                            {prevLi.value?.map((subItem, subIndex) => (
                              <React.Fragment key={subIndex}>
                                {subItem.type === "h3" && (
                                  <h3>{subItem.value}</h3>
                                )}
                                {subItem.type === "h4" && (
                                  <h4>{subItem.value}</h4>
                                )}
                                {subItem.type === "h5" && (
                                  <h5>{subItem.value}</h5>
                                )}
                                {subItem.type === "h6" && (
                                  <h6>{subItem.value}</h6>
                                )}
                                {subItem.type === "p" && <p>{subItem.value}</p>}
                              </React.Fragment>
                            ))}
                          </li>
                        ) : null,
                      )}
                    </ul>
                  )}

                  {prevUl.type === "ol" && (
                    <ol>
                      {prevUl.value?.map((prevLi, liIndex) =>
                        prevLi.type === "li" ? (
                          <li key={liIndex}>
                            {prevLi.value?.map((subItem, subIndex) => (
                              <React.Fragment key={subIndex}>
                                {subItem.type === "h3" && (
                                  <h3>{subItem.value}</h3>
                                )}
                                {subItem.type === "h4" && (
                                  <h4>{subItem.value}</h4>
                                )}
                                {subItem.type === "h5" && (
                                  <h5>{subItem.value}</h5>
                                )}
                                {subItem.type === "h6" && (
                                  <h6>{subItem.value}</h6>
                                )}
                                {subItem.type === "p" && <p>{subItem.value}</p>}
                              </React.Fragment>
                            ))}
                          </li>
                        ) : null,
                      )}
                    </ol>
                  )}
                </React.Fragment>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page1;
