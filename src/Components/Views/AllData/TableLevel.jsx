import { GridColumn as Column, Grid } from "@progress/kendo-react-grid";
import React, { useEffect, useState,useImperativeHandle } from "react";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";
import downloadIcon from '../../../assets/icons/download-Icon.png';

import { LuDownload } from "react-icons/lu";
// import { useHistory } from "react-router-dom";
import { getCalData,GetdollarCalcValue,Captilize,GetQtyCalcValue } from "../../Utilities/Common";
import ScreenLoader from "../../Utilities/Loading";
import { useInternationalization } from "@progress/kendo-react-intl";
import {excelExport} from "../../Utilities/CommonFunction";
import { ExcelExport, ExcelExportColumn, ExcelExportColumnGroup } from "@progress/kendo-react-excel-export";
const TableLevel = (props) => {
  // debugger;
  console.log("props.Data",props.Data)
  const intl = useInternationalization();
  const [GridDataa, SetGridDataa] = useState([]);
  const [MetricType, SetMetricType] = useState("");
  const [SFAMetricVal, SetSFAMetricVal] = useState("Field");
  const [loader, SetLoader] = useState(true);
  
  useEffect(() => {
    console.log("Props.Data",props.Data)
    SetGridDataa(props.Data);
    SetMetricType(props.Type);
    SetLoader(false);

  }, [props]);

  
  const SFAChange = (val) => {
    SetSFAMetricVal(val)
  }
  const onHeaderCell = (props) => {
   
    return (
      (props.title.split("_")[0] === "SFA") ?
      <label>
      <div className="header-right">{props.title.split("_")[0]}</div>
     
        <div className="header-right sub-label">
          <span className="SFAMetricText" style={{fontWeight : SFAMetricVal === "Field" ? 800 : 100}}  onClick={() => SFAChange("Field")}>Field</span>|<span onClick={() => SFAChange("Rev")} style={{fontWeight : SFAMetricVal === "Rev" ? 800 : 100}} className="SFAMetricText">Rev</span> 
        </div>
    
    </label>
      :
      <label>
        <div className="header-right">{props.title.split("_")[0]}</div>
        {props.title.split("_")[1] ? (
          <div className="header-right sub-label">
            {props.title.split("_")[1]}
          </div>
        ) : (
          <div className="header-right sub-label">&nbsp;</div>
        )}
      </label>
    );
  };
  const StringCell = (props) => {
    if (props.field === "") {
      return (
        <td className={`no-padd border-bot higligt-color text-align-left`}>
          <label>
            <button className="btn btn-arrow">
              <FaArrowRight />
            </button>
          </label>
        </td>
      );
    } else {
      return (
        <td className={`border-bot higligt-color text-align-left`}>
          <label title={props.dataItem[props.field]} className="ellipsis" >
            {/* {props.dataItem[props.field].length > 15
              ? props.dataItem[props.field].slice(0, 14) + "..."
              : props.dataItem[props.field]} */}
            <span> {Captilize(props.dataItem[props.field])}</span>

          </label>
        </td>
      );
    }
  };
  const NumberCell = (cellprops) => {
    console.log("cellprops",cellprops)
    if(cellprops.dataItem[cellprops.field] == 0 || cellprops.dataItem[cellprops.field] == null){
      return (
        <td className={`border-bot text-align-right`}>
            <label className={`metVal ${cellprops.dataItem[cellprops.field] < 0 ? "redcolor" : ""}`}>
            {"-"}
        </label>{" "}
          </td>
      );
    }
    else if(props.MetricTab==="ABS" ){ 
          console.log("Data",cellprops.dataItem)
          return(<td className={`border-bot text-align-right`}>
            <label className="metarrow">
              {cellprops.dataItem[cellprops.field]>=0?<FaArrowUp />:<FaArrowDown  color="red" />}
            </label>
            <label className={`metVal ${cellprops.dataItem[cellprops.field] < 0 ? "redcolor" : ""}`}>

            {
                cellprops.format === "c0" ?
                 GetdollarCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)
                :
                cellprops.format === "q0" ?
                  GetQtyCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)   : 
              intl.formatNumber(
                Math.abs(cellprops.dataItem[cellprops.field]),
                cellprops.format
              )
             
              }
            </label>{" "}
            {/* <label className="metlabel">{props.MetricTab}</label> */}
          </td>)
        }
   else if (cellprops.dataItem[cellprops.field] < 0) {
      return (
        <td className={`border-bot text-align-right redcolor`}>
          <label className="metarrow">
            <FaArrowDown />
          </label>
          <label className={`metVal ${cellprops.dataItem[cellprops.field] < 0 ? "redcolor" : ""}`}>
          {
              cellprops.format === "c0" ?
               GetdollarCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)
              :
               (cellprops.format === "q0" ?
             GetQtyCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)   : 
            intl.formatNumber(
              Math.abs(cellprops.dataItem[cellprops.field]),
              cellprops.format
            ))
            
            }
          </label>{" "}
          {/* <label className="metlabel">{props.MetricTab}</label> */}
        </td>
      );
    } else {
      return (
        <td className={`border-bot text-align-right`}>
          <label className="metarrow">
            <FaArrowUp />
          </label>
          <label className={`metVal ${cellprops.dataItem[cellprops.field] < 0 ? "redcolor" : ""}`}>
          {
              cellprops.format === "c0" ?
               GetdollarCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)
              :
              (cellprops.format === "q0" ?
                GetQtyCalcValue(Math.abs(cellprops.dataItem[cellprops.field]),1)
                :
            intl.formatNumber(
              Math.abs(cellprops.dataItem[cellprops.field]),
              cellprops.format
            ))
            
            }
          </label>{" "}
          {/* <label className="metlabel">{props.MetricTab}</label> */}
        </td>
      );
    }
  };
  const rowRender = (trElement, props) => {
    if (!trElement) return trElement; // Ensure it's a valid element

    const customClass = props.dataIndex === 0 ? "first-row" : ""; // Apply class based on index
    const newProps = {
      ...trElement.props,
      className: `${trElement.props.className || ""} ${customClass}`,
    };

    return <tr {...newProps}>{trElement.props.children}</tr>;
  };
  const ExcelExportEvent = () => {
    excelExport(props.chartRef, props.chartRef.current, props.filtersObj);
    //props.excelExport(props.chartRef, props.chartRef.current);
  }
  const ClickSellBtn = (type) => {
    props.GridRecordSettingsChg(type);
  };
  const CustomHeaderCell = (props) => {
    return ( 
      <>
        <label style={{ textAlign: "center", position:"absolute",width:"100%", margin:"auto" }}>
          <span style={{background:"#FFF", paddingLeft:"1%", paddingRight:"1%", fontSize: "0.8rem",
    fontWeight: 100}}>{props.title}</span>
        </label>
        <label className="left-bar" style={{ width:"50%" }}>&nbsp;</label>
        <label className="right-bar" style={{ width:"50%" }}>&nbsp;</label>
      </>
    );
  };
  if (loader === false) {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 no-padd">
                <Grid
                  data={GridDataa.filter(x => x.YTGField > 0).slice(
                    0,
                    props.GridRecordSettings ? 6 : GridDataa.length
                  )}
                  rowRender={rowRender}
                >
                  <Column
                    //title="Segment_&nbsp;"
                    title={`${props.title}`}
                    field={"Attribute"}
                    width="180px"
                    cell={StringCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-left"}
                  />
                  {/* <Column
                    title=""
                    subtitle=""
                    field=""
                    width="25px"
                    cell={StringCell}
                    headerClassName={"header-center"}
                  /> */}
                  {/* <Column title="Financials YTD" headerCell={CustomHeaderCell} headerClassName={"group-header"}> */}
                  <Column
                    title={`NSV_${props.DefaultVS}`}
                    field={`Nsv_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    // field = "NsvVsPlanBPS"
                    //width="160px"
                    cell={NumberCell}
                    //  width="100px"
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    format={props.MetricTab === "BPS" ? "N0" : (props.MetricTab === "ABS" ? "c0" : "p1")}
                  />
                   <Column
                    title={`Tonnes_${props.DefaultVS}`}
                    field={`Tonnes_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    // field = "NsvVsPlanBPS"
                    //width="160px"
                    cell={NumberCell}
                    //  width="100px"
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    format={props.MetricTab === "BPS" ? "N0" : (props.MetricTab === "ABS" ? "c0" : "p1")}
                  />
                   <Column
                    title={`Trade_${props.DefaultVS}`}
                    field={`Trade_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    // field = "NsvVsPlanBPS"
                    //width="160px"
                    cell={NumberCell}
                    //  width="100px"
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    format={props.MetricTab === "BPS" ? "N0" : (props.MetricTab === "ABS" ? "c0" : "p1")}
                  />
                  <Column
                    // title="MAC_vs Plan"
                    title={`MAC_${props.DefaultVS}`}
                    field={`Mac_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    //  width="100px"
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    format={props.MetricTab === "BPS" ? "N0" :(props.MetricTab === "ABS" ? "n1": "n1")}
                  />
                  {/* </Column> */}
                 
                 
                 
                 
                   {/* <Column title="Market YTD" headerCell={CustomHeaderCell} headerClassName={"group-header"}> */}
                  <Column
                    title="RSV_"
                    //field="RsvVsLy"
                    field={`Rsv_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    //  width="100px"
                    format={props.MetricTab === "BPS" ? "n0" :  (props.MetricTab === "ABS" ? "c0" : "p1")}
                  />
                  <Column
                    title="Share_"
                    field={`Shr_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    // width="100px"
                    //format={props.MetricTab === "BPS" ? "N0": "p1"}
                    format={props.MetricTab === "BPS" ||  props.MetricTab === "ABS" ? "N1" : "N1"}
                  />
                   <Column
                    title="Lbs_"
                    field={`Lbs_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    // width="100px"
                    //format={props.MetricTab === "BPS" ? "N0": "p1"}
                    format={props.MetricTab === "BPS"  ?  "N0" : ( props.MetricTab === "ABS" ? "q0" :  "p1")}
                  />
                   <Column
                    title="Lbs Shr_"
                    field={`LbsShr_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    // width="100px"
                    //format={props.MetricTab === "BPS" ? "N0": "p1"}
                    format={props.MetricTab === "BPS" ||  props.MetricTab === "ABS" ? "N1" : "N1"}
                  />
                  {/* </Column> */}
                  <Column
                    title="CSL_"
                    //field="RsvVsLy"
                    field={`Csl_${props.DefaultVS.replace(/ +/g, "")}_${
                      props.MetricTab
                    }`}
                    cell={NumberCell}
                    headerCell={onHeaderCell}
                    headerClassName={"header-right"}
                    //  width="100px"
                    format={props.MetricTab === "BPS" ? "n0" : "p1"}
                  />
                </Grid>
              </div>
              <div className="col-12 no-padd">
                <button
                  className="btn btn-default btn-seeall-alldata pull-left"
                  onClick={(e) => ClickSellBtn(props.Type)}
                >
                  {props.GridRecordSettings ? "See All" : "Top 5"}
                </button>
                <img alt="download"  onClick={ExcelExportEvent} className="btn-img-grid-download pull-right" src={downloadIcon} />
                  <ExcelExport data={props.Data} fileName={`${props.title} Grid`} ref={props.chartRef}>
                    
                    <ExcelExportColumn field={"Attribute"} title={props.title} cellOptions={{
                      format: "",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    
                    <ExcelExportColumn title="Nsv VsPlan ABS" field="Nsv_VsPlan_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Tonnes VsPlan ABS" field="Tonnes_VsPlan_ABS"
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}  />
                    <ExcelExportColumn title="Trade VsPlan ABS" field="Trade_VsPlan_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsPlan ABS" field="Mac_VsPlan_ABS" 
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                  
                    <ExcelExportColumn title="Rsv VsPlan ABS" field="Rsv_VsPlan_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsPlan ABS" field="Shr_VsPlan_ABS"
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsPlan ABS" field="Lbs_VsPlan_ABS"
                     cellOptions={{
                      format: "#,##0;[Red](#,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShare VsPlan ABS" field="LbsShr_VsPlan_ABS" 
                    cellOptions={{
                      format: "#,##0.0;[Red](#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Nsv VsPlan Diff" field="Nsv_VsPlan_Diff"
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Tonnes VsPlan Diff" field="Tonnes_VsPlan_Diff"
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Trade VsPlan Diff" field="Trade_VsPlan_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsPlan Diff" field="Mac_VsPlan_Diff"
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                     <ExcelExportColumn title="Rsv VsPlan Diff" field="Rsv_VsPlan_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsPlan Diff" field="Shr_VsPlan_Diff"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsPlan Diff" field="Lbs_VsPlan_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShr VsPlan Diff" field="LbsShr_VsPlan_Diff"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />

                    <ExcelExportColumn title="Nsv VsPlan BPS" field="Nsv_VsPlan_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Tonnes VsPlan BPS" field="Tonnes_VsPlan_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Trade VsPlan BPS" field="Trade_VsPlan_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsPlan BPS" field="Mac_VsPlan_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    
                    <ExcelExportColumn title="Rsv VsPlan BPS" field="Rsv_VsPlan_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsPlan BPS" field="Shr_VsPlan_BPS"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsPlan BPS" field="Lbs_VsPlan_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShr VsPlan BPS" field="LbsShr_VsPlan_BPS"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Nsv VsLY ABS" field="Nsv_VsLY_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Tonnes VsLY ABS" field="Tonnes_VsLY_ABS"
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}  />
                    <ExcelExportColumn title="Trade VsLY ABS" field="Trade_VsLY_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsLY ABS" field="Mac_VsLY_ABS" 
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                   
                    <ExcelExportColumn title="Rsv VsLY ABS" field="Rsv_VsLY_ABS" 
                    cellOptions={{
                      format: "$#,##0.0;[Red]($#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsLY ABS" field="Shr_VsLY_ABS"
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsLY ABS" field="Lbs_VsLY_ABS"
                     cellOptions={{
                      format: "#,##0;[Red](#,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShare VsLY ABS" field="LbsShr_VsLY_ABS" 
                    cellOptions={{
                      format: "#,##0.0;[Red](#,##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Nsv VsLY Diff" field="Nsv_VsLY_Diff"
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Tonnes VsLY Diff" field="Tonnes_VsLY_Diff"
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Trade VsLY Diff" field="Trade_VsLY_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsLY Diff" field="Mac_VsLY_Diff"
                    cellOptions={{
                      format: "##0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Csl" field="Csl_VsLY_Diff"
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                  
                    <ExcelExportColumn title="Rsv VsLY Diff" field="Rsv_VsLY_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsLY Diff" field="Shr_VsLY_Diff"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsLY Diff" field="Lbs_VsLY_Diff" 
                    cellOptions={{
                      format: "0.0%;[Red](0.0%)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShr VsLY Diff" field="LbsShr_VsLY_Diff"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />

                    <ExcelExportColumn title="Nsv VsLY BPS" field="Nsv_VsLY_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Tonnes VsLY BPS" field="Tonnes_VsLY_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Trade VsLY BPS" field="Trade_VsLY_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Mac VsLY BPS" field="Mac_VsLY_BPS"
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                   
                    <ExcelExportColumn title="Rsv VsLY BPS" field="Rsv_VsLY_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="Share VsLY BPS" field="Shr_VsLY_BPS"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                    <ExcelExportColumn title="Lbs VsLY BPS" field="Lbs_VsLY_BPS" 
                    cellOptions={{
                      format: "##,##0;[Red](##,##0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}/>
                    <ExcelExportColumn title="LbsShr VsLY BPS" field="LbsShr_VsLY_BPS"
                    cellOptions={{
                      format: "###0.0;[Red](##0.0)",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }}
                    headerCellOptions={{
                      textAlign: "center",
                      borderBottom: "10px",
                      borderLeft: "10px",
                      borderRight: "10px",
                      borderTop: "10px",
                    }} />
                  </ExcelExport>
                {/* <button className="btn btn-default btn-downlad pull-right" onClick={ExcelExportEvent}>
                  <LuDownload />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ScreenLoader />
      </>
    );
  }
};
export default React.memo(TableLevel);
