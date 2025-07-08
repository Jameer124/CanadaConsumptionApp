import React, { useState, useEffect } from "react";
import "../../../../src/Filterpanel.css";
import Toplitemenu from "../../MenuItem/Toplitemenu";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { CommonFilters } from "../../../FiltersConfig";
import { filterBy } from "@progress/kendo-data-query";
import APIService from "../../../Axios/useApi";
import { setYear, setCurrentYear } from "../../Utilities/Common";
import {
  Captilize,
  arraybasedorvaluebasedfilter,
  getDistinct,
  stringformating,
} from "../../Utilities/CommonFunction";
const Filterpanel = (props) => {
  const [filterType, setFilterType] = useState("Total Business");
  const refArray = React.useRef([]);
  const [state, setState] = useState(null);
  const [filtersDt, setfiltersDt] = useState(null);
  const [filtersObj, setFiltersObj] = useState(null);
  const [InitialState, setInitialState] = useState({});
  const [applyFiltersBtn, setapplyFiltersBtn] = useState(false);
  const [loader, SetLoader] = useState(true);
  const data = [
    { text: "Amazon", value: 1 },
    { text: "Walmart", value: 2 },
    { text: "Chewy", value: 3 },
    { text: "Petco", value: 4 },
  ];
  function ClearFilters() {
    SetLoader(true);
    setFiltersObj(getJsonDatafilter(InitialState));
    setState(InitialState);
    setFilterType("Total Business");
  }

  const OnFilterSearch = (e, flag = false) => {
    e.filter.operator = "contains";

    var filteredState = {};

    for (let item of CommonFilters) {
      if (item.id === e.target.props.id) {
        filteredState[item.Name + "Dt"] = filterBy(
          state[item.Name + "DummyDt"].slice(),

          e.filter
        );

        break;
      }
    }

    if (flag) {
      return filteredState;
    } else {
      setState({ ...state, ...filteredState });
    }
  };
  const onDropdownClose = (e) => {
    e.filter = {
      field: undefined,
      ignoreCase: true,
      operator: "contains",
      value: "",
    };

    e.target.state.text = "";
    OnFilterSearch(e);
  };

  const OnStaticChangeFilter = (e) => {
    var newData = {};

    var searchData = {};

    if (e.target.state) {
      e.target.state.text = "";

      searchData = OnFilterSearch(e, true);

      for (let item of CommonFilters) {
        if (item.id === e.target.props.id) {
          newData[item.Name + "Val"] = e.target.value;

          break;
        }
      }

      setState({ ...state, ...searchData, ...newData });
    } else {
      for (let item of CommonFilters) {
        if (item.Type === "RadioType") {
          if (item.Name === e.syntheticEvent.currentTarget.name) {
            newData[item.Name + "Val"] = e.value;

            break;
          }
        }
      }

      setState({ ...state, ...newData });
    }
    setapplyFiltersBtn(true);
  };
  const OnDynamicChangeFilter = (e, flag = false) => {
    var searchData = {};

    var selectedId = "";

    var selectedVals;

    if (!flag) {
      e.filter = {
        field: undefined,

        ignoreCase: true,

        operator: "contains",

        value: "",
      };

      e.target.state.text = "";

      searchData = OnFilterSearch(e, true);

      selectedId = e.target.props.id;

      selectedVals = e.target.value;
      setapplyFiltersBtn(true);
    } else {
      selectedId = e.props.id;

      selectedVals = e.props.value;
    }

    var selectedOrder = CommonFilters.filter((x) => x.id === selectedId)[0]
      .cascadingorder;

    let modelDt = filtersDt;

    // var cascadingOrder =ExploreFilters.filter(x => x.cascadingOrder === 1)[0].cascadingOrder;

    var newState = {};

    for (let item of CommonFilters) {
      if (item.cascadingorder > 0) {
        if (item.IsLastHiraracy) {
          if (item.cascadingorder === selectedOrder) {
            // newState[item.Name + "Val"] = e.target.value;

            newState[item.Name + "Val"] = selectedVals;
          } else {
            newState[item.Name + "Val"] = state[item.Name + "Val"];
          }

          newState = { ...newState, ...setValues(selectedOrder, modelDt) };
        } else {
          var selectedValues = [];

          if (item.cascadingorder === selectedOrder) {
            // selectedValues = e.target.value === "All" ? "" : e.target.value;

            selectedValues = selectedVals === "All" ? "" : selectedVals;
          } else {
            selectedValues =
              state[item.Name + "Val"] === "All"
                ? ""
                : state[item.Name + "Val"];
          }

          if (selectedValues.length > 0) {
            // && item.cascadingOrder <= selectedOrder

            if (
              arraybasedorvaluebasedfilter(
                modelDt,

                selectedValues,

                item.ColumnMetric
              ).length > 0
            )
              modelDt = arraybasedorvaluebasedfilter(
                modelDt,

                selectedValues,

                item.ColumnMetric
              );
          }

          if (item.cascadingorder === selectedOrder) {
            newState[item.Name + "Val"] =
              selectedValues === "" ? "All" : selectedValues;

            newState = { ...newState, ...setValues(selectedOrder, modelDt) };
          }

          for (let val of CommonFilters) {
            if (
              val.cascadingorder > 0 &&
              val.cascadingorder > item.cascadingorder
            ) {
              //val.cascadingOrder !== cascadingOrder

              newState[val.Name + "Dt"] = getDistinct(
                modelDt,

                val.ColumnMetric
              );

              newState[val.Name + "DummyDt"] = getDistinct(
                modelDt,

                val.ColumnMetric
              );

              break;
            }
          }
        }
      }
    }

    // if (flag) {

    //   setInitialState({ ...state, ...searchData, ...newState });

    // }

    setState({ ...state, ...searchData, ...newState });
  };
  const setValues = (order, data) => {
    var obj = {};

    for (let item of CommonFilters) {
      if (item.cascadingorder > 0 && item.cascadingorder === order) {
        // obj[item.Name + "Val"] = selectedValue;

        for (let val of CommonFilters) {
          if (val.cascadingorder > 0 && val.cascadingorder > order) {
            obj[val.Name + "Val"] = getSelectedList(
              state[val.Name + "Val"],

              data,

              val.ColumnMetric,

              val.IsDefaultSelected
            );
          }
        }

        break;
      }
    }

    return obj;
  };
  useEffect(() => {
    APIService.callApi("/api/TotalBusiness/GetFiltersData", "GET").then(
      (res) => {
        if (!res.Error) {
          var ert = {};
          setYear(res.Data.DataUpdatedInfo);
          setCurrentYear(
            res.Data.DataUpdatedInfo
              ? Object.keys(res.Data.DataUpdatedInfo)[1]
              : 0
          );
          setfiltersDt(res.Data.FiltersData);
          console.log(res.Data.FiltersData, "filtersDt");

          for (let valt of CommonFilters) {
            ert[valt.Name + "Dt"] = valt.filterArray;

            ert[valt.Name + "DummyDt"] = valt.filterArray;

            ert[valt.Name + "Val"] = valt.setValue;
          }
          // if (location.state !== undefined) {
          //   ert = { ...ert, ...location.state.Obj };
          //   history.replace("/Explore/Explore", { Obj: {} });
          // }
          // if (
          //   location.state !== undefined &&
          //   Object.keys(location.state.Obj).length > 0
          // ) {
          //   ert = { ...ert, ...location.state.Obj };
          //   history.replace("/Explore/Explore", { Obj: {} });
          // }
          // console.log(getExploreObj());
          // if (Object.keys(getExploreObj()).length > 0) {
          //   // alert("hi");
          //   ert = { ...ert, ...getExploreObj() };
          //   console.log(ert);
          //   setExploreObj({});
          // }
          if (false) {
          } else {
            // var filtersModel =
            //   response.data.FiltersRowText.length > 0
            //     ? JSON.parse(response.data.FiltersRowText)
            //     : {};
            var filtersModel = {};
            var model = {};
            for (let valt of CommonFilters) {
              model[valt.Name + "Dt"] = valt.filterArray;

              model[valt.Name + "DummyDt"] = valt.filterArray;

              model[valt.Name + "Val"] =
                Object.keys(filtersModel).length > 0 &&
                filtersModel.hasOwnProperty(valt.Name)
                  ? valt.Type === "Dropdownlist"
                    ? filtersModel[valt.Name]
                    : filtersModel[valt.Name].length > 0
                    ? filtersModel[valt.Name].split(",")
                    : []
                  : valt.setValue;
            }
            ert = { ...ert, ...model };
          }

          if (
            CommonFilters.filter((x) => x.IsDefaultOnchange === 1).length > 0
          ) {
            for (let br of CommonFilters) {
              if (
                (br.IsDefaultAll || br.IsDefaultSelected) &&
                br.DataFilling === "Dynamic" &&
                !br.IsDefaultOnchange
              ) {
                ert[br.Name + "Dt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                ert[br.Name + "DummyDt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                if (!br.IsDefaultValue && br.IsDefaultSelected) {
                  ert[br.Name + "Val"] =
                    br.Type === "Dropdownlist"
                      ? getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]
                      : [getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]];
                }
              }
            }

            for (let br of CommonFilters) {
              if (br.IsDefaultOnchange && br.DataFilling === "Dynamic") {
                ert[br.Name + "Dt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                ert[br.Name + "DummyDt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                if (ert[br.Name + "Val"].length === 0) {
                  ert[br.Name + "Val"] =
                    br.Type === "Dropdownlist"
                      ? getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]
                      : [getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]];
                }

                //Trigger event

                setState(ert);
                refArray.current[1].props.onChange(
                  refArray.current[1],

                  true
                );

                // setfiltersstate(true);

                var intialObj = { ...ert };

                for (let valt of CommonFilters) {
                  intialObj[valt.Name + "Val"] = valt.setValue;
                }

                setInitialState(intialObj);
                setFiltersObj(getJsonDatafilter(ert));

                //setInitialState(ert);

                break;
              }
            }
          } else {
            for (let br of CommonFilters) {
              if (
                (br.IsDefaultAll || br.IsDefaultSelected) &&
                br.DataFilling === "Dynamic"
              ) {
                ert[br.Name + "Dt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                ert[br.Name + "DummyDt"] = getDistinct(
                  res.Data.FiltersData,

                  br.ColumnMetric
                );

                if (br.IsDefaultSelected) {
                  ert[br.Name + "Val"] =
                    br.Type === "Dropdownlist"
                      ? getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]
                      : [getDistinct(res.Data.FiltersData, br.ColumnMetric)[0]];
                }
              }
            }

            setState(ert);
            // for (let valt of ExploreFilters) {

            //     if(Object.keys(filtersModel).length > 0 &&
            //     filtersModel.hasOwnProperty(valt.Name))
            //     {
            //       if(valt.Type === "Dropdownlist")
            //       {
            //         if( filtersModel[valt.Name] !== null && filtersModel[valt.Name] !== "")
            //         {

            //           refArray.current[valt.RefNo].props.onChange(refArray.current[valt.RefNo], true);
            //           break;
            //         }

            //       }
            //       else{
            //         if(filtersModel[valt.Name] !== null && filtersModel[valt.Name] !== "" && filtersModel[valt.Name].length > 0){
            //           refArray.current[valt.RefNo].props.onChange(refArray.current[valt.RefNo], true);
            //           break;
            //         }
            //       }

            //     }

            // }

            // refArray.current[1].props.onChange(
            //   refArray.current[1],

            //   true
            // );

            // setfiltersstate(true);

            var intialObj1 = { ...ert };

            for (let valt of CommonFilters) {
              intialObj1[valt.Name + "Val"] = valt.setValue;
            }

            setInitialState(intialObj1);

            setFiltersObj(getJsonDatafilter(ert));

            // setfiltersstate(true);

            // setInitialState(ert);
          }
        } else {
        }
      }
    );
  }, []);

  useEffect(() => {
    if (filtersObj) {
      props.sendDataToParent(filtersObj);
    }
  }, [filtersObj]);

  const getJsonDatafilter = (rawmodel) => {
    var model = {};

    for (let br of CommonFilters) {
      if (br.IsParameter) {
        if (br.Type === "Multiselectlist")
          model[br.Name] =
            rawmodel[br.Name + "Val"].length > 0
              ? stringformating(rawmodel[br.Name + "Val"])
              : "";
        else if (br.Type === "RadioType")
          model[br.Name] = rawmodel[br.Name + "Val"];
        else {
          if (rawmodel[br.Name + "Val"] === "All") model[br.Name] = "";
          else model[br.Name] = rawmodel[br.Name + "Val"];
        }
      }
    }

    return model;
  };

  const handleInputChange = (keyname, value) => {
    setFilterType(value);
  };
  const handleChange = (event) => {
    setSelectedItems(event.target.value);
  };
  const handleUpdate = () => {
    // props.sendDataToParent(AllData);
    setapplyFiltersBtn(false);
    setFiltersObj(getJsonDatafilter(state));
  };

  const getSelectedList = (selectedVal, data, con, isdefaultSelected) => {
    var newlist = [];

    if (typeof selectedVal === "string") {
      if (
        data.filter((x) => x[con].toLowerCase() === selectedVal.toLowerCase())
          .length > 0
      ) {
        newlist = Captilize(selectedVal);
      }
      // else if(isdefaultSelected && data.length > 0)
      // {
      //
      //     newlist = Captilize(data.filter((x) => x[con])[0][con]);
      // }
      // else
      //    newlist = "All";
      else {
        if (isdefaultSelected && data.length > 0)
          newlist = Captilize(data.filter((x) => x[con])[0][con]);
      }
    } else {
      for (let val of selectedVal) {
        if (
          data.filter((x) => x[con].toLowerCase() === val.toLowerCase())
            .length > 0
        ) {
          newlist.push(Captilize(val));
        } else {
          if (isdefaultSelected && data.length > 0)
            newlist = [Captilize(data.filter((x) => x[con])[0][con])];
        }
      }
    }

    return newlist;
  };

  return (
    <>
      <div
        className={`${
          props.Filtertype === true ? "" : "hideblock"
        } left-filtpanel`}
      >
        <div className="toplevel">
          <div className="col-12">
            <h3>Filters</h3>
          </div>
          <div className="col-12">
            <label>Data</label>
            <div className="btn-group card-radio" role="group">
              <>
                <button
                  className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                    filterType === "Total Business"
                      ? "btn-mars-seleted"
                      : "btn-mars-deselected"
                  }`}
                  onClick={() =>
                    handleInputChange("ScreenType", "Total Business")
                  }
                >
                  {"Total Bus."}
                </button>
              </>
              <>
                <button
                  className={`"btn btn-xs btn-primary btn-block btn-mars  ${
                    filterType === "eCommerce"
                      ? "btn-mars-seleted"
                      : "btn-mars-deselected"
                  }`}
                  onClick={() => handleInputChange("ScreenType", "eCommerce")}
                >
                  {"Ecomm Only"}
                </button>
              </>
            </div>
          </div>

          {filtersDt &&
            state &&
            CommonFilters.map(
              // eslint-disable-next-line array-callback-return

              (val, index) => {
                if (val.Type === "Multiselectlist") {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-12">
                        <label> {val.DisplayName}</label>

                        {val.IsDefaultAll ? (
                          <MultiSelect
                            id={val.id}
                            data={state[val.Name + "Dt"]}
                            ref={(ref) => {
                              refArray.current[val.RefNo] = ref; // took this from your guide's example.
                            }}
                            filterable={val.IsFilterable ? true : false}
                            onFilterChange={
                              val.IsFilterable ? OnFilterSearch : null
                            }
                            style={{
                              width: "100%",
                              alignItems: "center",
                            }}
                            onChange={
                              val.DataFilling === "Static"
                                ? OnStaticChangeFilter
                                : OnDynamicChangeFilter
                            }
                            placeholder="All"
                            autoClose={false}
                            onClose={onDropdownClose}
                            value={state[val.Name + "Val"]}
                            popupSettings={{
                              animate: false,
                              className: "multiselectItem",
                            }}
                            tags={
                              state[val.Name + "Val"].length > 0
                                ? [
                                    {
                                      text: `${
                                        state[val.Name + "Val"].length
                                      } Items`,

                                      data: [...state[val.Name + "Val"]],
                                    },
                                  ]
                                : []
                            }
                          ></MultiSelect>
                        ) : (
                          <MultiSelect
                            autoClose={false}
                            id={val.id}
                            data={state[val.Name + "Dt"]}
                            ref={(ref) => {
                              refArray.current[val.RefNo] = ref; // took this from your guide's example.
                            }}
                            filterable={val.IsFilterable ? true : false}
                            onFilterChange={
                              val.IsFilterable ? OnFilterSearch : null
                            }
                            onChange={
                              val.DataFilling === "Static"
                                ? OnStaticChangeFilter
                                : OnDynamicChangeFilter
                            }
                            onClose={onDropdownClose}
                            tags={
                              state[val.Name + "Val"].length > 0
                                ? [
                                    {
                                      text: `${
                                        state[val.Name + "Val"].length
                                      } Items`,

                                      data: [...state[val.Name + "Val"]],
                                    },
                                  ]
                                : []
                            }
                            style={{
                              width: "100%",
                              alignItems: "center",
                            }}
                            placeholder="All"
                            value={state[val.Name + "Val"]}
                            popupSettings={{
                              animate: false,
                              className: "multiselectItem",
                            }}
                          ></MultiSelect>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }
              }
            )}
          <div className="col-12">
            <button
              className={`btn update-btn ${
                applyFiltersBtn ? "pulse-button" : ""
              }`}
              onClick={() => handleUpdate()}
            >
              Update Dashboard
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textDecoration: "underline",
              cursor:'pointer'
            }}
          >
            <p className="Clear-text" onClick={ClearFilters}>
              Clear All
            </p>
          </div>
        </div>
        <div className="col-12 bot-fixed">
          <label>Save Current Filters as View:</label>
          <div className="row">
            <div className="col-8">
              <input type="text" className="viewfield form-control" />
            </div>
            <div className="col-4 no-padd-left">
              <button className="btn btn-save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filterpanel;
