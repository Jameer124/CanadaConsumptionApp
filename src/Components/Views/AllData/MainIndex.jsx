import React, { useState,useEffect,useRef, useCallback } from "react";
import { AiFillControl } from "react-icons/ai";
import APIService from "../../../Axios/useApi";
import Toplitemenu from "../../MenuItem/Toplitemenu";
import { setCalData, setScreenName } from "../../Utilities/Common";
import ScreenLoader from "../../Utilities/Loading";
import Filterpanel from "./Filterpanel";
import PeriodChart from "./PeriodChart"

import { Segment } from "@mui/icons-material";
import TableLevel from "./TableLevel";
export default function Index() {
  const _element = React.useRef();
  const [gridRef,setgridRef] = useState ({
      Segment: useRef(null),
      Account: useRef(null),
      Brand: useRef(null),
      chart1:useRef(null),
      chart2 : useRef(null)
    });
  setScreenName("Canada Consumption");
  setCalData([{Current_Year:2024, Current_Period:6}]);
  const [CBMTab, setCBMTab] = useState("Cumulative");
   const [screenData, setScreenData] = useState(null);
   
   const [Error, setError] = useState(null);
  const [chartLegends, setchartLegends] = useState({
    "#9370DB" : "LYYTD", "#82C91E" : "LYYTG",
    "#CED4DA" : "LY", "#0000A0":"YTD",
    "#FF7675" : "Field", "#636384" : "Plan", "#FFA500" : "DemandRev","#00D7B9":"POS"

  })
  const [chartLegendstatus, setchartLegendstatus] = useState({
   "LYYTD" : true,
   "LYYTG" : true,
   "LY" : true,
   "YTD" : true,
   "Field":true,
   "Plan" : true,
   "DemandRev" : true,
   "Pos" : true

  })
  const [chartLegends1, setchartLegends1] = useState({
    "#1dd1a1" : "Sfa_Rev", "#00C2FF" : "Sfa_Field",
    "#636384" : "Bias_Rev", "#FFA500":"Bias_Field"
  })
  const [chartLegendstatus1, setchartLegendstatus1] = useState({
   "Sfa_Rev" : true,
   "Sfa_Field" : true,
   "Bias_Rev" : true,
   "Bias_Field" : true
   

  })
  // const chartscolor1 = {"#00D7B9" : "YTD", "#82C91E" : "YTG"}
  // const chartscolor2 = {"#FF7675" : "Field", "#636384" : "Plan", "#FFA500" : "DemandRev","#00D7B9":"POS"}
  const [DefaultVS, setDefaultVS] = useState("Vs LY");
  const [MetricTab, setMetricTab] = useState("ABS");
  const [FMetricTab, setFMetricTab] = useState("Key Metrics");
  const [ChartMetricTab, setChartMetricTab] = useState("Gsv");
  const [DefaultYear, setDefaultYear] = useState(2025);
   const [loader, SetLoader] = useState(true);
   const [GridRecordSettings, setGridRecordSetting] = useState({
       Segment: true,
       Account: true,
       Brand: true,
     });
  
  const [dataFromChild, setDataFromChild] = useState({
    DefaultYear: 2025,
    ScreenType: "Total Business",
    DefaultVS: "vs Plan",
  });
  const [SegmentValue, setSegmentValue] = React.useState({
    value: "Walmart.com",
  });
  const [AccountValue, setAccountValue] = React.useState({
    value: "All",
  });
  const [BrandValue, setBrandValue] = React.useState({
    value: "All",
  });
  const [PPGValue, setPPGValue] = React.useState({
    value: "All",
  });
  const [Filtertype, setFiltertype] = useState(true);
  const Cardheight = window.innerHeight - window.innerHeight * 0.077;
  const InnerCardheight = Cardheight - Cardheight * 0.14;
  const InnerGridblockheight = InnerCardheight - InnerCardheight * 0.001;
  const [SegmentData, SetSegmentData] = useState([]);
  var NSVData = [
    { Name: "NSV", Value: 5200000000.2, vsPlan: 0.015, vsLY: 0.015 },
  ];
  var MACData = [{ Name: "MAC", Value: 45.4, vsPlan: 0, vsLY: -0.02 }];
  var RSVData = [{ Value: 0.021, CategoryYTD: -0.019 }];
  var ShareData = [{ Value: 13.6, ShareYTD: -200 }];


  var SlideYTDData = [{Ships:513700000, Ships_vsPlan:-10100000.0000, Pos:499400000, Pos_vsPlan:0}]
  var SlideYTGData = [{Field_Forecast:520000000, Field_Forecast_to_Plan:-20100000.0, Demand_Rev:500000000,Demand_Rev_to_Plan:-40100000.0}]
  // Callback function to receive data from the child
   const [filtersObj, setFiltersObj] = useState(null);
  const handleDataFromChild = (data) => {
    let modelObj = { ...data };
    modelObj["Year"] = DefaultYear;
    modelObj["vsMetric"] = "ly";
    modelObj["PrimaryFilter"] = "";

    setFiltersObj(modelObj);
  };
  useEffect(() => {

    if(FMetricTab === "Forecast Accurancy")
      setMetricTab("Gsv");
    else{
      setMetricTab("ABS");
      setDefaultVS("Vs LY")
    }
  },[FMetricTab])
 
  useEffect(() => {
      if (filtersObj) {
        SetLoader(true);
        APIService.callApi(
          "/api/AllData/GetAllData",
          "POST",
          filtersObj
        ).then((res) => {
          if (!res.Error) {
            console.log(res.Data);
            setScreenData(res.Data);
            SetLoader(false);
          } else {
            setError(res.Error.message);
            SetLoader(false);
          }
        });
      }
    }, [filtersObj]);
  function ShowHideFilterToggle(type) {
    debugger;
    setFiltertype(!type);
  }
  const GridRecordSettingsChg = (type) => {
    setGridRecordSetting({
      ...GridRecordSettings,
      ...{ [type]: !GridRecordSettings[type] },
    });
  };
  function handleInputChange(keyName, value) {
    if (keyName === "CBMTab") {
      setCBMTab(value);
    } else if (keyName === "DefaultVS") {
      setDefaultVS(value);
    } else if (keyName === "MetricTab") {
      setMetricTab(value);
    } else if (keyName === "FMetricTab") {
      setFMetricTab(value);
    } else if (keyName === "ChartMetricTab") {
      setChartMetricTab(value);
    } else if (keyName === "DefaultYear") {
      setDefaultYear(value);
      setFiltersObj({ ...filtersObj, ...{ Year: value } });
    }
  }
  const LegendItemClickEvent = useCallback ((obj,flag=false) => {
    if (!flag)
   setchartLegendstatus({...chartLegendstatus,...{[obj] : !chartLegendstatus[obj]}})
    else  setchartLegendstatus1({...chartLegendstatus1,...{[obj] : !chartLegendstatus1[obj]}})
  },[chartLegendstatus,chartLegendstatus1]);
  // const LegendItemClickEvent1 = useCallback ((obj) => {
  //   setchartLegendstatus1({...chartLegendstatus1,...{[obj] : !chartLegendstatus1[obj]}})
  //  },[chartLegendstatus1]);
  return (
    <>
      <div className="container-fluid screenlayout AllData-Screen">
        <Toplitemenu />
        <div ref={_element} className="pad-top-3 screenbodylayout">
          <Filterpanel
           
            Filtertype={Filtertype}
            sendDataToParent={handleDataFromChild}
          />
           {loader ? (
                      <ScreenLoader />
                    ) :
          <div
            className={`${
              Filtertype === true ? "wholescreen-left" : "wholescreen-noleft"
            } wholescreen`}
          >
            <div className="row">
              <div className="col-4">
                <h2 className="screenhead no-padd-bottom no-mar-bot">
                  <AiFillControl
                    className="ctrlbtn"
                    onClick={() => ShowHideFilterToggle(Filtertype)}
                  />{" "}
                  Canada Consumption
                </h2>
              </div>
              <div style={{display:'flex',flexDirection:'row-reverse'}} className="col-8">
                <div className="pull-right">
                  <i className="updatedon1">Ytd thru Period {DefaultYear=== 2025 ? "2": "13"}{" "} </i>
                </div>
               
                <div
                  className="pull-right btn-group card-radio-wite-screen"
                  role="group"
                  style={{ marginRight: "1vh",marginBottom:'5px' }}
                >
                 
                  <button
                    className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                      DefaultYear === 2024
                        ? "btn-mars-seleted"
                        : "btn-mars-deselected"
                    }`}
                    onClick={() => handleInputChange("DefaultYear", 2024)}
                  >
                    {2024}
                  </button>
                  <button
                    className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                      DefaultYear === 2025
                        ? "btn-mars-seleted"
                        : "btn-mars-deselected"
                    }`}
                    onClick={() => handleInputChange("DefaultYear", 2025)}
                  >
                    {2025}
                  </button>
                </div>
                <div className="breadcrumb-block pull-right">
                    {/* <Tooltip anchorElement="target" position="bottom"> */}
                      <label>Filtered to : </label>
                      <u
                        title={
                          filtersObj.Segment.length > 0
                            ? `Selected Segments: ${filtersObj.Segment}`
                            : ""
                        }
                      >
                        {filtersObj.Segment.length > 0
                          ? filtersObj.Segment.length > 12
                            ? filtersObj.Segment.slice(0, 12) + "..."
                            : filtersObj.Segment
                          : "All Segments"}
                      </u>
                      /
                      <u
                        title={
                          filtersObj.Account.length > 0
                            ? `Selected Accounts: ${filtersObj.Account}`
                            : ""
                        }
                      >
                        {filtersObj.Account.length > 0
                          ? filtersObj.Account.length > 12
                            ? filtersObj.Account.slice(0, 12) + "..."
                            : filtersObj.Account
                          : "All Accounts"}
                      </u>
                      /
                      <u
                        title={
                          filtersObj.Brand.length > 0
                            ? `Selected Brands:${filtersObj.Brand}`
                            : ""
                        }
                      >
                        {filtersObj.Brand.length > 0
                          ? filtersObj.Brand.length > 12
                            ? filtersObj.Brand.slice(0, 12) + "..."
                            : filtersObj.Brand
                          : "All Brands"}
                      </u>
                      /
                      <u
                        title={
                          filtersObj.PPG.length > 0
                            ? `Selected PPG: ${filtersObj.PPG}`
                            : ""
                        }
                      >
                        {filtersObj.PPG.length > 0
                          ? filtersObj.PPG.length > 12
                            ? filtersObj.PPG.slice(0,12) + "..."
                            : filtersObj.PPG
                          : "All PPGs"}
                      </u>
                    {/* </Tooltip> */}
                  </div>
              </div>
            </div>
            <div className="outerblock-none">
              
              <div
                className="row"
                id="innerbodyblock"
                style={{ height: Cardheight }}
                px
              >
                <div className="row no-margin no-padd">
                  
                  <div className="col-12 no-padd-left">
                    <div
                      className="panel panel-card boxes-outer"
                      style={{ height: InnerCardheight }}
                      px
                    >
                      <table
                        border={0}
                        style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}
                      >
                        <tr>
                          <td>
                            <h4 className="pull-left card-title">
                              <div
                              className="pull-right btn-group card-radio-default-screen"
                              role="group"
                              style={{ marginRight: "2vh" }}
                            >
                              {/* <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  FMetricTab === "Key Metrics"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("FMetricTab", "Key Metrics")
                                }
                              >
                                Key Metrics
                              </button>
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  FMetricTab === "Forecast Accurancy"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("FMetricTab", "Forecast Accurancy")
                                }
                              >
                                Forecast Accuracy
                              </button> */}
                              </div>
                            </h4>
                          </td>
                          <td style={{display:'flex',flexDirection:'row-reverse',marginTop:'1.4vh'}}>
                        
                           
                            {/* <div
                              className="pull-right btn-group card-radio-wite-screen"
                              role="group"
                              style={{ marginRight: "2vh" }}
                            > */}

{/* <button
className={`"btn btn-xs btn-primary btn-block btn-mars  ${
  MetricTab === "ABS"
    ? "btn-mars-seleted"
    : "btn-mars-deselected"
}`}
onClick={() =>
  handleInputChange("MetricTab", "ABS")
}
disabled={FMetricTab === "Forecast Accurancy" ? true : false}
style={{
  opacity : FMetricTab === "Forecast Accurancy" ? 0.5 : 1
}}
>
ABS
</button>
<button
className={`"btn btn-xs btn-primary btn-block btn-mars  ${
  MetricTab === "Diff"
    ? "btn-mars-seleted"
    : "btn-mars-deselected"
}`}
onClick={() =>
  handleInputChange("MetricTab", "Diff")
}
disabled={FMetricTab === "Forecast Accurancy" ? true : false}
style={{
  opacity : FMetricTab === "Forecast Accurancy" ? 0.5 : 1
}}
>
% Diff
</button>
<button
className={`"btn btn-xs btn-primary btn-block btn-mars  ${
  MetricTab === "BPS"
    ? "btn-mars-seleted"
    : "btn-mars-deselected"
}`}
onClick={() =>
  handleInputChange("MetricTab", "BPS")
}
disabled={FMetricTab === "Forecast Accurancy" ? true : false}
style={{
  opacity : FMetricTab === "Forecast Accurancy" ? 0.5 : 1
}}
>
BPS
</button> */}
{/* </div> */}

                              
                             
                            {/* <div
                              className="pull-right btn-group card-radio-wite-screen mar-right-05rem"
                              role="group"
                            >
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  DefaultVS === "Vs Plan"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("DefaultVS", "Vs Plan")
                                }
                                disabled={FMetricTab === "Forecast Accurancy" ? true : false}
style={{
  opacity : FMetricTab === "Forecast Accurancy" ? 0.5 : 1
}}
                              >
                                vs Plan
                              </button>
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  DefaultVS === "Vs LY"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("DefaultVS", "Vs LY")
                                }
                                disabled={FMetricTab === "Forecast Accurancy" ? true : false}
style={{
  opacity : FMetricTab === "Forecast Accurancy" ? 0.5 : 1
}}
                              >
                                vs LY
                              </button>
                            </div> */}

                          </td>
                        </tr>
                      </table>
                      
                      <div
                        className="gridblock"
                        style={{
                          height: InnerGridblockheight,
                          overflowY: "auto",
                          paddingRight: "2vh",
                        }}
                        px
                      >

                        {/* ------------------Sales $ Change Block----------------------- */}
          
          <div className="card">
          <div className="card-body GridLevel-body">
              <div className="row">
              <div style={{paddingRight:'-2px'}} className="col-12 no-padd-right" id="DevChart">
                <div className="row">
                  <div className="col"><h3 className="AllData-cardtitle pull-left">
                    {/* <span
                        title={
                          filtersObj.Segment.length > 0
                            ? `Selected Segments: ${filtersObj.Segment}`
                            : ""
                        }
                      >
                        {filtersObj.Segment.length > 0
                          ? filtersObj.Segment.length > 12
                            ? filtersObj.Segment.slice(0, 12) + "..."
                            : filtersObj.Segment
                          : "All Segments"}
                      </span>
                      ,
                      <span
                        title={
                          filtersObj.Account.length > 0
                            ? `Selected Accounts: ${filtersObj.Account}`
                            : ""
                        }
                      >
                        {filtersObj.Account.length > 0
                          ? filtersObj.Account.length > 12
                            ? filtersObj.Account.slice(0, 12) + "..."
                            : filtersObj.Account
                          : "All Accounts"}
                      </span>
                      ,
                      <span
                        title={
                          filtersObj.Brand.length > 0
                            ? `Selected Brands:${filtersObj.Brand}`
                            : ""
                        }
                      >
                        {filtersObj.Brand.length > 0
                          ? filtersObj.Brand.length > 12
                            ? filtersObj.Brand.slice(0, 12) + "..."
                            : filtersObj.Brand
                          : "All Brands"}
                      </span>
                      ,
                      <span
                        title={
                          filtersObj.PPG.length > 0
                            ? `Selected PPG: ${filtersObj.PPG}`
                            : ""
                        }
                      >
                        {filtersObj.PPG.length > 0
                          ? filtersObj.PPG.length > 12
                            ? filtersObj.PPG.slice(0,12) + "..."
                            : filtersObj.PPG
                          : "All PPGs"}
                      </span> */}
                      </h3></div>
                  <div className="col">
                  { FMetricTab === "Forecast Accurancy" ?
                  <></>:
                    <div className="pull-right btn-group card-radio-screen" role="group" style={{ marginTop:"-0.4rem"}}>
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  ChartMetricTab === "Gsv"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("ChartMetricTab", "Gsv")
                                }
                              >
                                GSV
                              </button>
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  ChartMetricTab === "Tonnes"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("ChartMetricTab", "Tonnes")
                                }
                              >
                                Tonnes
                              </button>
                              <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  ChartMetricTab === "Nsv"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("ChartMetricTab", "Nsv")
                                }
                              >
                                NSV
                              </button>
                              {/* <button
                                className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                                  ChartMetricTab === "SFA_Bias"
                                    ? "btn-mars-seleted"
                                    : "btn-mars-deselected"
                                }`}
                                onClick={() =>
                                  handleInputChange("ChartMetricTab", "SFA_Bias")
                                }
                              >
                                SFA/Bias
                              </button> */}
                            </div>
}
                            </div>
                </div>
                
              
              <div className="col-12"> 
                    <table>
                      <tr>
                        {/* <td><div className="vl2"></div></td> */}
                        <td><PeriodChart  Data={screenData["ChartsData"]} colorlist = {chartLegends} chartMetric = {ChartMetricTab} legendsStatus = {chartLegendstatus} filtersObj={filtersObj} LegendItemClickEvent = {LegendItemClickEvent}   filterType={Filtertype} chartRef={gridRef["chart2"]}/></td>
                      </tr>
                    </table>
                  </div>
              </div>
              
              </div>
              </div>
          </div>
          
  {["Segment", "Account", "Brand"].map((item, key) => {
                            return (
                              <>
                                {" "}
                                {
                                  FMetricTab === "Forecast Accurancy" ?
                                  <TableLevel
                                  //title="Account_&nbsp;"
                                  title={item}
                                  Type={item}
                                  FMetric = {FMetricTab}
                                  Data={screenData[`${item}Data`]}
                                  MetricTab={MetricTab}
                                  DefaultVS={DefaultVS}
                                  GridRecordSettings={GridRecordSettings[item]}
                                  GridRecordSettingsChg={GridRecordSettingsChg}
                                 // excelExport={excelExport}
                                  chartRef={gridRef[item]}
                                  filtersObj = {filtersObj}
                                />:
                                <TableLevel
                                  //title="Account_&nbsp;"
                                  title={item}
                                  Type={item}
                                  Data={screenData[`${item}Data`]}
                                  MetricTab={MetricTab}
                                  DefaultVS={DefaultVS}
                                  GridRecordSettings={GridRecordSettings[item]}
                                  GridRecordSettingsChg={GridRecordSettingsChg}
                                 // excelExport={excelExport}
                                  chartRef={gridRef[item]}
                                  filtersObj = {filtersObj}
                                />
 }
                                </>
                                )
 })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
}
