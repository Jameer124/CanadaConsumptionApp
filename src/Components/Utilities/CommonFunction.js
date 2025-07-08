import { drawDOM, exportImage } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import axios from "axios";
import { getRetailerName, getToken, setUserSession, useBaseUrl } from "./Common";
import { CommonFilters } from "../../FiltersConfig";

export const  arraybasedorvaluebasedfilter = (data, selectedaccounts, con)  => 
{
    var newmodel = [];
    if(typeof(selectedaccounts) == 'string')
        newmodel = data.filter(x => x[con].toString().toUpperCase() === selectedaccounts.toUpperCase());
    else
        newmodel = data.filter((item) => selectedaccounts.join("*").toLowerCase().split("*").includes(item[con].toString().toLowerCase()));

    
     return newmodel;
}

export const UpdatedWeek = () => {

  const Account = getRetailerName();
  const AuthorizeToken = getToken();
  const baseUrl = useBaseUrl();

  axios({
    method: "post",
    url: baseUrl + "/api/CommonFunctionsApi/GetUpdatedWeek?Account=" + Account,
    // data: Account,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + AuthorizeToken
    },
  })
  .then(res => {
    let UpdatedDateWeek = res.data.UpdatedDateWeek
    console.log(UpdatedDateWeek);
    localStorage.setItem("UpdatedDateWeek", UpdatedDateWeek.toString() );

    return UpdatedDateWeek.toString();
    
  })
  .catch(error => {
    let err = error + "in UpdatedWeek";
    return err;
  })
}


export const SalesTypeCode = (salesType) => {
  if(salesType === "Total Digital")
    return "TGS";
   else if(salesType === "Pick Up")
    return "PU";
    else
    return "DLY";
  
}

export const Format = (value, title) => {
  // eslint-disable-next-line default-case
  switch (title) {
    case "Dollars":
      return FormatLongNumber(value, 0, "$");
  }
}

export const  getDistinct = (array, group)  => 
  {
    
    var unique = {};
    var distinct = [];

    for (let val of array) 
    {
        var value = "";
        if(group === "FuzzyType" )
        value = val[group]
        else
        value = Captilize(val[group]);
       
    
        if (!unique[val[group]]) {
            distinct.push(value);
            unique[val[group]] = true;
        }
    };
    return distinct;
   
  }


export const stringformating = (drpname) => {
    var val = drpname;
    if (drpname.length > 0)
        val = drpname.join(',');
    return val;
}

export const Captilize = (Text) => {
  if (Text !== undefined) {
      return Text.toLocaleLowerCase().replace(/\b[a-z]/g, 
      function (letter) { return letter.toUpperCase(); });
  }
}

export const CapitalizeProperty = (Text) => {
  var CapitalizedText = Text;
  if (Text !== undefined) {
       CapitalizedText = Text.toLocaleLowerCase().replace(/\b[a-z]/g,
       function (letter) { 
        return letter.toUpperCase(); 
      });
  }
  
    if (CapitalizedText.length > 15) {
      CapitalizedText = CapitalizedText.substring(0, 20);
        return CapitalizedText + "...";
    } 
    else {
        return CapitalizedText;
    }
}

export const ArrayToString = (value) => {
  debugger;
  var val = value;
  if(Array.isArray(value)){
  if (value.length > 0){
    //  console.log(value);
      val = value.join(',');
  }
  else 
     val = "";
  }
  return val;
}


export const  FormatLongNumber = (value, FixedPrecision, Format="") => {
    try {
    if (value === 0) {
        return Format + 0;
    }
    else if (value < 0) {
        // billions
        if (value >= -999999999999 && value <= -1000000000) {
            return "-" + Format + Math.abs((value / 1000000000).toFixed(1)) + 'b';
        }
        // millions
        else if (value >= -999999999 && value <= -1000000) {
            var vvval = Math.abs((value / 1000000).toFixed(1));
            return "-" + Format + numberWithCommas(vvval) + 'm';
        }
        // thousands
        else if (value >= -999999 && value <= -1000) {
            var vvval1 = Math.abs((value / 1000).toFixed(1));
            return "-" + Format + numberWithCommas(vvval1) + 'k';
        }
        // hundreds
        else if (value <= -999) {
            return "-" + Format + Math.abs(value.toFixed(FixedPrecision));
        }
        else{
            console.log("Negative ");
            return "-" + Format + ((value !== undefined) ? Math.abs(value.toFixed(FixedPrecision)) : 0);

        }
    }
    else {
        // hundreds
        if (value <= 999) {
            return Format + value.toFixed(FixedPrecision);
        }
        // thousands
        if (value >= 1000 && value <= 999999) {
            return Format + (value / 1000).toFixed(1) + ' k';
        }
        // millions
        else if (value >= 1000000 && value <= 999999999) {
            return Format + (value / 1000000).toFixed(1) + ' m';
        }
        else if (value >= 1000000000 && value <= 999999999999) {
            return Format + (value / 1000000000).toFixed(1) + 'b';
        }
        else{
            console.log("Postive ");
            return Format + ( (value !== undefined) ? value.toFixed(1) : 0);
        }
    }
}
catch(err) {
    console.log(value);
    console.log(err);
  }
}

export const numberWithCommas = (number) => {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export const exportElement = (element, options) => {
  debugger;
 
drawDOM(element, options)  
  .then((group) => {
    return exportImage(group);
  })
  .then((dataUri) => {
    saveAs(dataUri, element.id + ".jpg");

  });

}

export const GetRefreshToken = ()  => {
 
  const baseUrl = useBaseUrl();
                                                                                                          
  const authData = {
      
    'refresh_token': localStorage.getItem("refreshToken_Mars_GU"),
    'grant_type': 'refresh_token'
     
  };
  
  // ** START ** encoding data to support the below content type
  const encodeData = Object.keys(authData)
  .map((key, index) => `${key}=${encodeURIComponent(authData[key])}`)
  .join('&');
  // ** END **
 
  axios({
      method: "post",
      url: baseUrl +"/token",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
      },
      data: encodeData
  })
  .then(response => {
      console.log('response is', response);
      
      setUserSession(response.data.access_token, response.data);
     // history.push('/dashboard');
  })
  .catch(err => {
      console.log('error is', err);
      
  })

  
}

 export const excelExport = (component, e, filtersObj) => {
    const options = component.current.workbookOptions();
    console.log(options, "d", component);
    options.sheets[0].freezePane.rowSplit = 4;

    const rows = options.sheets[0].rows;

    var FilterHeaders = [];

    var FilterValues = [];

    var model = filtersObj;

    for (let item of CommonFilters) {
      FilterHeaders.push({
        value: item.Name,

        textAlign: "center",

        color: "black",

        bold: true,

        autoWidth: true,
      });

      FilterValues.push({
        value: model[item.ColumnMetric],

        textAlign: "center",

        color: "black",

        autoWidth: true,
      });
    }
    FilterHeaders.push({
      value: "Year",

      textAlign: "center",

      color: "black",

      bold: true,

      autoWidth: true,
    });

    FilterValues.push({
      value: model["Year"],

      textAlign: "center",

      color: "black",

      autoWidth: true,
    });

    rows.forEach((row) => {
      if (row.type === "header") {
        debugger;

        row.cells.forEach((cell, index) => {
          cell.background = "#fce4d6";

          cell.color = "black";
        });
      } else {
        row.cells.forEach((cell, index) => {});
      }
    });

    rows.splice(0, 0, { cells: FilterHeaders, type: "header", height: 30 });

    rows.splice(1, 0, { cells: FilterValues, type: "header", height: 30 });

    rows.splice(2, 0, { cells: [], type: "header", height: 30 });

    component.current.save(options);
  };