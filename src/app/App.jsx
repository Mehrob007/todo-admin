import { Router } from "react-router";
import "./App.css";
import Page1 from "../pages/page-1/Page1";
import Page2 from "../pages/page-2/Page2";
import Page3 from "../pages/page-3/Page3";
import Page4 from "../pages/page-4/Page4";
import Page5 from "../pages/page-5/Page5";
import Page6 from "../pages/page-6/Page6";
import Page7 from "../pages/page-7/Page7";
import Page8 from "../pages/page-8/Page8";
import Page9 from "../pages/page-9/Page9";

const data = [
  { type: "h1", value: "faysifabfo" },
  {
    type: "ol",
    view: "1.0.0",
    value: [
      { type: "li", value: [{ type: "h3", value: "test" }] },
      { type: "li", value: [{ type: "h4", value: "test" }] },
      { type: "li", value: [{ type: "p", value: "test" }] },
      {
        type: "li",
        value: [
          {
            type: "ul",
            view: "*",
            value: [
              {
                type: "li",
                value: [{ type: "h3", value: "test" }],
              },
              {
                type: "li",
                value: [{ type: "h5", value: "test" }],
              },
              {
                type: "li",
                value: [{ type: "p", value: "test" }],
              },
            ],
          },
        ],
      },
      { type: "li", value: [{ type: "h3", value: "test" }] },
      { type: "li", value: [{ type: "h3", value: "test" }] },
      { type: "li", value: [{ type: "h3", value: "test" }] },
    ],
  },
];

function App() {
  return (
    <>
      <Page1 data={data} />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <Page8 />
      <Page9 />
    </>
  );
}

export default App;
