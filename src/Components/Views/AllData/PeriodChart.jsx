import { drawing, geometry } from "@progress/kendo-drawing";
import downloadIcon from '../../../assets/icons/download-Icon.png';
import {
  Chart, ChartArea, ChartCategoryAxis, ChartCategoryAxisItem, ChartLegend, ChartSeries, ChartSeriesItem, ChartTooltip, ChartValueAxis, ChartValueAxisItem
} from '@progress/kendo-react-charts';
import "hammerjs";
import * as React from "react";
import { useEffect, useState } from "react";
import {excelExport} from "../../Utilities/CommonFunction";
// import { useHistory } from "react-router-dom";
import { GetdollarCalcValue,Captilize, getCalData, useBaseUrl,GetQtyCalcValue }  from "../../Utilities/Common";
import ScreenLoader from "../../Utilities/Loading";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
const PeriodChart = (props) => {


  debugger
  const [error, setError] = useState(null);
  const [loader, SetLoader] = useState(true);
  // let history = useHistory();
  const caldata = getCalData();
  const getBaseUrl = useBaseUrl();
  const [ChartDataa, SetChartDataa] = useState([]);
  const [MetricType, SetMetricType] = useState("");
  const [CardTitle, SetCardTitle] = useState("");
  const [DataType, SetDataType] = useState("");
  useEffect(() => {
    if(props.Data !== undefined){
      SetChartDataa(props.Data.filter(x => Number(x.Period) !== props.filtersObj["Year"] - 1));
    }
    SetMetricType(props.Type);
    SetCardTitle(props.Title);
    SetDataType(props.DataType);
    SetLoader(false);
    
    //console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, props.Data);

 
  var stepval = 1;
  var ChartHeight = 230;
   var CumActualbar_min = 0;
    var CumActualbar_max = 0;
    if(props.Data){
      var DataRaw = [];
      DataRaw =  props.Data.map((item) => { 
        item[`${props.chartMetric}_Pos`] = ((item["Year"] === 2025 && item["PeriodNum"]  <= 2 ) || item["Year"] === 2024 ) ? (item[`${props.chartMetric}_Pos`] !== 0 ? item[`${props.chartMetric}_Pos`] : null) :  null;
        item[`${props.chartMetric}_Ytd`] = ((item["Year"] === 2025 && item["PeriodNum"]  <= 2 ) || item["Year"] === 2024 || Number(item["Period"]) === props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_Ytd`] :  null;
        item[`${props.chartMetric}_Ytg`] = ( Number(item["Period"]) === props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_Ytg`] :  null;
        item[`${props.chartMetric}_Plan`] = ( Number(item["Period"]) !== props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_Plan`] :  null;
        item[`${props.chartMetric}_Field`] = ( Number(item["Period"]) !== props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_Field`] :  null;
        item[`${props.chartMetric}_DemandRev`] = ( Number(item["Period"]) !== props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_DemandRev`] :  null;
        item[`${props.chartMetric}_Ly`] = ( Number(item["Period"]) !== props.filtersObj["Year"] - 1) ? item[`${props.chartMetric}_Ly`] :  null;

        return item;
      });
      console.log(DataRaw,"Data");
      //DataRaw.push(props.Data.filter(x => Number(x.Period) === props.filtersObj["Year"] - 1))
    if(props.chartMetric === "Nsv"){
      var CumActualbar_min1 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) ===  props.filtersObj["Year"] - 1).map(function (o) { return Math.min(o[`${props.chartMetric}_Ytd`], o[`${props.chartMetric}_Ytg`]);}) );
    var CumActualbar_min2 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Ytd`] !== null && x[`${props.chartMetric}_Ytd`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Ytd`]); }) );
    var CumActualbar_min3 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Ly`] !== null && x[`${props.chartMetric}_Ly`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Ly`]); }) );
    var CumActualbar_min4 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Field`] !== null && x[`${props.chartMetric}_Field`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Field`]); }) );
    var CumActualbar_min5 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Plan`] !== null && x[`${props.chartMetric}_Plan`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Plan`]); }) );
   
    CumActualbar_min = Math.min.apply(Math, [CumActualbar_min1,CumActualbar_min2,CumActualbar_min3,CumActualbar_min4,CumActualbar_min5]);

      CumActualbar_max = Math.max.apply(Math, DataRaw.map(function (o) { return Math.max(o[`${props.chartMetric}_Ytd`], o[`${props.chartMetric}_Ytg`],o[`${props.chartMetric}_Ly`],o[`${props.chartMetric}_Field`],o[`${props.chartMetric}_Plan`]); }));
    }
    else
    {
      //CumActualbar_min = Math.min.apply(Math, DataRaw.map(function (o) { return Math.min(o[`${props.chartMetric}_Ytd`], o[`${props.chartMetric}_Ytg`],o[`${props.chartMetric}_Ly`],o[`${props.chartMetric}_Field`],o[`${props.chartMetric}_Plan`],o[`${props.chartMetric}_DemandRev`],o[`${props.chartMetric}_Pos`]); }));
      var CumActualbar_min1 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) ===  props.filtersObj["Year"] - 1).map(function (o) { return Math.min(o[`${props.chartMetric}_Ytd`], o[`${props.chartMetric}_Ytg`]);}) );
      var CumActualbar_min2 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Ytd`] !== null && x[`${props.chartMetric}_Ytd`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Ytd`]); }) );
      var CumActualbar_min3 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Ly`] !== null && x[`${props.chartMetric}_Ly`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Ly`]); }) );
      var CumActualbar_min4 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Field`] !== null && x[`${props.chartMetric}_Field`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Field`]); }) );
      var CumActualbar_min5 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Plan`] !== null && x[`${props.chartMetric}_Plan`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_Plan`]); }) );
      var CumActualbar_min6 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_DemandRev`] !== null && x[`${props.chartMetric}_DemandRev`] > 0).map(function (o) { return Math.min(o[`${props.chartMetric}_DemandRev`]); }) );
      
      var CumActualbar_min7 = Math.min.apply(Math,DataRaw.filter(x => Number(x.Period) !==  props.filtersObj["Year"] - 1 && x[`${props.chartMetric}_Pos`] !== null  && x[`${props.chartMetric}_Pos`] > 0  ).map(function (o) { return Math.min(o[`${props.chartMetric}_Pos`]); }) );

      CumActualbar_min = Math.min.apply(Math, [CumActualbar_min1,CumActualbar_min2,CumActualbar_min3,CumActualbar_min4,CumActualbar_min5,CumActualbar_min6,CumActualbar_min7]);
      CumActualbar_max = Math.max.apply(Math, DataRaw.map(function (o) { return Math.max(o[`${props.chartMetric}_Ytd`], o[`${props.chartMetric}_Ytg`],o[`${props.chartMetric}_Ly`],o[`${props.chartMetric}_Field`],o[`${props.chartMetric}_Plan`],o[`${props.chartMetric}_DemandRev`],o[`${props.chartMetric}_Pos`]); }));
     
    }
    
    }
    
    var barMin = (CumActualbar_min - (CumActualbar_min * 0.05)) > 0 ? (CumActualbar_min - CumActualbar_min * 0.07) : (CumActualbar_min + (CumActualbar_min * 0.2));
    var barMax = (CumActualbar_max + (CumActualbar_max * 0.05)) > 0 ? (CumActualbar_max + CumActualbar_max * 0.05) : (CumActualbar_max - (CumActualbar_max * 0.15));
    var bar_interval = (barMax - barMin) / 7;
    console.log(CumActualbar_min,CumActualbar_max)
    function labelcatContent(e) {
     
        return e.value;
      
    }
  function labelContent (e){
    if(props.chartMetric === "Tonnes"){
      return GetQtyCalcValue(e.value,1);
    }
    else{
      return GetdollarCalcValue(e.value,1);
    }
   
  }
function gapType(e){
  if((e !== undefined && e.category === "LY")){
  return 1.5;
  }
  else{
    return 0.5;
  }
}
const valueNotes = {
  data: [{value: 0}],
  icon : {visible : false},
  line : {length : 400,color :"rgba(0,0,0,0.1)", width:1},
  position: "left"
};
function opacityType(e){
  if(e.category === "LY") {
    return 1;
  }
  else{
    return 1;
    //var getval = DataType === 'Period' ? (e.category.length === 2) ?  parseInt(e.category.replace("P0","")) : parseInt(e.category.replace("P","")) : (e.category.length === 2) ? parseInt(e.category.replace("Q0","")) : parseInt(e.category.replace("Q",""));
    //return DataType === 'Period'? (getval > caldata[0].Current_Period) ? 0.2 : 1 : (getval > caldata[0].Current_Qurater) ? 0.2 : 1;
  }
}
const categoryNotes = {
  data : [{value: 0.5}],
  line : {length : 93,dashType : "dot",color :"rgba(0,0,0,0.2)"},
  icon : {visible : false},
};
function createBar(e){
  let rect = e.rect;
  // console.log("bar");
  // console.log(e);
  let origin = rect.origin;
  let bottomRight = rect.bottomRight();
  let radiusX = rect.width() / 2;
  let radiusY = radiusX / 3;
  let path = new drawing.Path({
                    fill: {
                      color : e.series.color,
                      opacity: opacityType(e)
                    },
                    stroke: {
                        color: "none"
                    }
                });
                if (e.value !== 0 && e.value !== undefined){
    if (e.value >= 0){
    path.moveTo(origin.x, origin.y)
                .lineTo(origin.x, bottomRight.y)
                .lineTo(bottomRight.x,bottomRight.y)
                .lineTo(bottomRight.x, origin.y)
                .arc(0, 180, radiusX,radiusY,true);
    }
    else{
      path.moveTo(origin.x, origin.y)
      .lineTo(bottomRight.x, origin.y)
      .lineTo(bottomRight.x,bottomRight.y)
      .arc(0, 180, radiusX,radiusY);
    }
  }
  let group = new drawing.Group();
  group.append(path);
  return group;
}
function chartItemlegend(e) {
  debugger
  var color = e.options.markers.background;
  var labelColor = e.options.labels.color;
  var rect = new geometry.Rect([0, 0], [250, 250]);
  var layout = new drawing.Layout(rect, { spacing: 5, alignItems: "left",});
  var circleGeometry = new geometry.Circle([0, 10], 5);
  var circle = new drawing.Circle(circleGeometry, {
    stroke: { color: "none" },
    fill: { color: color }
  });
  var label = new drawing.Text(e.series.name, [0, 0], {
    fill: { color: labelColor }
  });
  var marker = circle;
  layout.append(marker, label);
  layout.reflow();
  return layout;
}
function labeltemplate(e){
  // if (MetricType === "MPC Sales" ){
  //   return GetdollarCalcValue(e.value,1);
  // }
  // else if (MetricType === "Qty" ){
  //   return GetCalcValue(e.value,0);
  // }
  // else if (MetricType === "Share_vsPlan"){
  //   return GetgapCalcValueAxis(e.value,1);
  // }
  // else {
  //     return (GetCalcValue(e.value,1) !== "-") ? GetCalcValue(e.value,1) +"%" : "0%";
  // }
  if(props.chartMetric === "Tonnes"){
    return GetQtyCalcValue(e.value,1);
  }
  else{
    return GetdollarCalcValue(e.value,1);
  }
 
}
function defaultTooltipRender (e){
  // if (MetricType === "MPC Sales" ){
  //     return GetdollarCalcValue(e.point.value,1);
  // }
  // else if (MetricType === "Qty" ){
  //   return (GetCalcValue(e.point.value,1) !== "-") ? GetCalcValue(e.point.value,1) : "0";
  // }
  // else if (MetricType === "%" ){
  //   return (GetCalcValue(e.point.value,1) !== "-") ? GetCalcValue(e.point.value,1) +"%" : "0%";
  // }
  // else {
  //     return GetCalcPercentage(e.point.value,1);
  //   }

  return (<>
    Period : {e.point.category}<br/>
    {e.point.series.name} : {props.chartMetric === "Tonnes" ? GetQtyCalcValue(e.point.value,1) :  GetdollarCalcValue(e.point.value,1)}
    {/* Value : {props.chartsformats ? intl.formatNumber(e.point.dataItem[e.point.series.field], props.chartsformats[e.point.series.field]) : GetdollarCalcValue(e.point.dataItem[e.point.series.field])} */}
   </>
);

     
}
const ExcelExportEvent = () => {
  excelExport(props.chartRef, props.chartRef.current, props.filtersObj);
  //props.excelExport(props.chartRef, props.chartRef.current);
}
const onRender = (e) => {
  // You can add the class to the path elements here
 
  const paths = e.target.element.lastChild.querySelectorAll(".k-chart g path");

  paths.forEach(path => {
   // console.log(path.attributes);
    let attributecolor = path.attributes.fill.value !== "none" ? path.attributes.fill.value : path.attributes.stroke.value;

    if(Object.keys(props.colorlist).includes(attributecolor))
      path.classList.add(`${props.colorlist[attributecolor]}-path-class`);

   
  });
};
//const defaultTooltipRender = ({ point }) => (`${MetricType === "Develop" ? GetCalcValue(point.value,0) : (point.value*100).toFixed(0)+"%"}`);
function labelfill(e){ return e.series.color;}
function RenderChart(){
  return(
    <>
    <Chart onRender={onRender}>
        <ChartTooltip render={defaultTooltipRender}  />
        <ChartArea background="" margin={15} height={ChartHeight}/>
                    
        <ChartValueAxis>
        <ChartValueAxisItem majorGridLines= {{dashType: "dashDot"}} visible={false} line={false} name="leftaxis" labels={{ content: labelContent }} min={barMin} max={barMax} majorUnit={bar_interval} /> 
        <ChartValueAxisItem majorGridLines= {{dashType: "dashDot"}} visible={true}  line={false} name="rightaxis" labels={{ content: labelContent }} min={barMin} max={barMax} majorUnit={bar_interval} notes={valueNotes} /> 
        </ChartValueAxis>

        <ChartCategoryAxis>
           <ChartCategoryAxisItem
                                    majorGridLines={false}
                                    // line={true}
                                    name="categoryAxis"
                                    categories={ChartDataa.map((item) => {
                                      return item.Period;
                                    })}
                                    // crosshair={{
                                    //   color: "#0000A0",
                                    //   width: 2,
                                    //   visible: (props.Title === "ActFore_Plan"  && props.CBMTab === "Cumulative") || props.Title === "Growth_Share"  ? true :false
                                    // }}
                                    //labels={{ content: labelcatContent, step: props.Title === "ActFore_Plan"?  stepval : 10 }}
                                    axisCrossingValue={[0, 120]}
                                     //notes={categoryNotes}
                                   // plotBands={categoryPlotBands}
                                    labels={{ content: labelcatContent, 
                                      step:stepval,
                                     // step: props.Title === "ActFore_Plan"?   stepval : (ChartDataa.length < 6 ? 1 : (ChartDataa.length < 10 ? 2 : 10)) ,
                                     // rotation: "auto", 
                                      position: "start",
                                      margin: {
                                        left: 8,
                                        right: 8,
                                        top: 0,
                                        bottom: 0,
                                      },
                                    }}
                                    
                                  />
        {/* <ChartCategoryAxisItem  majorGridLines={true} line={true} categories={ChartDataa.Pd} 
                      labels={{  content: labelcatContent, step:stepval }}  axisCrossingValue={[0, 25]}  />   */}
        </ChartCategoryAxis>
        <ChartLegend visible={false} offsetX={20} position="bottom" orientation="horizontal" item={{ visual:chartItemlegend}} />
        
        <ChartSeries>
              <ChartSeriesItem gap={2}  labels={{visible: false, template: labeltemplate }} name="LY" axis="rightaxis"  visible={props.legendsStatus["LY"]}  border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="column"     field={`${props.chartMetric}_Ly`} color="#CED4DA" visual={createBar} />
              <ChartSeriesItem gap={2}  labels={{visible: false, template: labeltemplate }} name="YTD" axis="rightaxis" visible={props.legendsStatus["YTD"]}  border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="column"   field={`${props.chartMetric}_Field`}  color="#0000A0" visual={createBar} />

              <ChartSeriesItem gap={0.8}  labels={{visible: false, template: labeltemplate }} name="Field" axis="rightaxis" border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="line"  markers={{ visible: false }} style="smooth"  field={`${props.chartMetric}_Field`}  color="#FF7675" visible={props.legendsStatus["Field"]}  width={3} />
              <ChartSeriesItem gap={0.8}  labels={{visible: false, template: labeltemplate }} name="Plan" axis="rightaxis" border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="line"  markers={{ visible: false }} style="smooth"  field={`${props.chartMetric}_Plan`}   color="#636384" visible={props.legendsStatus["Plan"]} width={3} />
              <ChartSeriesItem gap={0.8}  labels={{visible: false, template: labeltemplate }} name="DemandRev" axis="rightaxis" border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="line"  markers={{ visible: false }} style="smooth" field={`${props.chartMetric}_DemandRev`} visible={props.chartMetric === "Nsv"? false:props.legendsStatus["DemandRev"]}   color="#FFA500" width={3} />
              <ChartSeriesItem gap={0.8}  labels={{visible: false, template: labeltemplate }} name="Pos" axis="rightaxis" border={{width:0 }} overlay={{ gradient: "none" }} tooltip={{ visible: true }} data={ChartDataa} type="line"  markers={{ visible: false }} style="smooth" field={`${props.chartMetric}_Pos`}  visible={props.chartMetric === "Nsv"? false: props.legendsStatus["Pos"]}  color="#00D7B9" width={3} />
        </ChartSeries>
    </Chart>
    <ExcelExport data={props.Data} ref={props.chartRef} fileName="Chart Data">
      <ExcelExportColumn title="Period" field="Period" 
      cellOptions={{
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
      }}
      width={"90px"} />    
      <ExcelExportColumn title="GSV YTG" field="Gsv_Ytg"
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"} />
      <ExcelExportColumn title="GSV LY" field="Gsv_Ly" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="GSV YTD" field="Gsv_Ytd"
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"} />
      <ExcelExportColumn title="GSV Field" field="Gsv_Field" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="GSV Plan" field="Gsv_Plan" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="GSV DemandRev" field="Gsv_DemandRev" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="GSV Pos" field="Gsv_Pos" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
 
      <ExcelExportColumn title="Tonnes YTG" field="Tonnes_Ytg" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes LY" field="Tonnes_Ly" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes YTD" field="Tonnes_Ytd" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes Field" field="Tonnes_Field" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes Plan" field="Tonnes_Plan" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes DemandRev" field="Tonnes_DemandRev" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="Tonnes Pos" field="Tonnes_Pos" 
      cellOptions={{
        format: "###,##0;[Red](###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="NSV YTG" field="Nsv_Ytg" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="NSV LY" field="Nsv_Ly" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="NSV YTD" field="Nsv_Ytd" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="NSV Field" field="Nsv_Field" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
      <ExcelExportColumn title="NSV Plan" field="Nsv_Plan"
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"} />
      <ExcelExportColumn title="NSV DemandRev" field="Nsv_DemandRev"
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"} />
      <ExcelExportColumn title="NSV Pos" field="Nsv_Pos" 
      cellOptions={{
        format: "$###,##0;[Red]($###,##0)",
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
      }}
      width={"90px"}/>
    </ExcelExport>
    {/* <h2 className="legendtext width-85per marleft-5per"><span className="bg-white">{caldata !== null ? caldata[0].Current_Year : ""}</span></h2> */}
    <div className="col-12">
    <img alt="download" onClick={ExcelExportEvent} className="btn-img-download pull-left" style={{left: "3vh",marginTop: "-0.8vh"}}  src={downloadIcon}/>
      <h3 className="bottomcardtitle">
        <span className="legendblock pull-right no-padd-right">
        <span  onClick={(e) => props.LegendItemClickEvent("LY")}><i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#CED4DA",opacity:props.legendsStatus["LY"]?1:0.25}}></i> LY</span>  &nbsp; 
        <span onClick={(e) => props.LegendItemClickEvent("YTD")}>  <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#0000A0",opacity:props.legendsStatus["YTD"]?1:0.25}}></i> YTD</span> &nbsp;

        <span onClick={(e) => props.LegendItemClickEvent("Field")}> <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#FF7675",opacity:props.legendsStatus["Field"]?1:0.25}}></i> Field</span> &nbsp;
        <span onClick={(e) => props.LegendItemClickEvent("Plan")}>  <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#636384",opacity:props.legendsStatus["Plan"]?1:0.25}}></i> Plan</span> &nbsp;
        {props.chartMetric === "Nsv"?
        <>
 <span >  <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#FFA500",opacity:0.25}}></i> Demand Rev</span> &nbsp;
 {/* <span > <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#00D7B9",opacity: 0.25}}></i> Consumption</span> */}
 </>
        :
        <>
        <span onClick={(e) => props.LegendItemClickEvent("DemandRev")}>  <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#FFA500",opacity:props.legendsStatus["DemandRev"]?1:0.25}}></i> Demand Rev</span> &nbsp;
        {/* <span onClick={(e) => props.LegendItemClickEvent("Pos")}> <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#00D7B9",opacity: props.legendsStatus["Pos"]?1:0.25}}></i> Consumption</span> */}
        </>
}
        
        </span>
        <span className="sep pull-right">&nbsp;</span>
        {/* <span className="legendblock pull-right no-padd-right">
         
            <span onClick={(e) => props.LegendItemClickEvent("LYYTD")}><i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#9370DB",opacity:props.legendsStatus["LYYTD"]?1:0.25}}></i>LY YTD RR</span> &nbsp; 
            <span onClick={(e) => props.LegendItemClickEvent("LYYTG")}> <i className="fa fa-circle color-blue" aria-hidden="true" style={{color:"#82C91E",opacity:props.legendsStatus["LYYTG"]?1:0.25}}></i> LY YTG RR</span> &nbsp;
           
       
        </span> */}
      </h3>
      </div>
              
    </>
  );
}
if(loader === false){
  return (
    <>
      { (ChartDataa.length !== 0) ? 
          <RenderChart />
       :  <div className="col-12 pad-left-5 pad-right-5 mar-top-1">
          <div className="cardnodata">
            <table><tr><td>No data available.</td></tr></table>
            </div>
          </div>
      }
      </>
  );
}
else {
  return (
    <>
    <ScreenLoader />
    </>
  );
}
}
export default React.memo(PeriodChart);