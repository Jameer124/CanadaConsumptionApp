const domainshortName = import.meta.env.VITE_App_shortName;
export const useReact_App_link_domain = () => {
  const VITE_App_link_domain = import.meta.env.VITE_App_link_domain;
  return `${VITE_App_link_domain}`;
}
export const useDomainShortName = () => {
  const VITE_App_shortName = import.meta.env.VITE_App_shortName;
  return `${VITE_App_shortName}`;
}
export const useDomainName = () => {
  const VITE_App_domain = import.meta.env.VITE_App_domain;
  return `${VITE_App_domain}`;
}
export const useAPIDomainName = () => {
  const VITE_App_apidomain = import.meta.env.VITE_App_apidomain;
  return `${VITE_App_apidomain}`;
}
export const useBaseUrl = () => {
  //return "https://mars360.us/DCommSCAPI";
  //return "https://beta-petcare360.mars/ECommSCAPI";
  // return "http://localhost/DCommSCAPI";
  const VITE_App_baseURL = import.meta.env.VITE_App_baseURL;
  return `${VITE_App_baseURL}`;
}
export const setEtype = (Email) => {
  localStorage.setItem(`${domainshortName}` +"Etype", Email);
}
export const getEtype = () => {
  const EtypeStr = localStorage.getItem(`${domainshortName}` +"Etype");
    if(EtypeStr)
        return EtypeStr;
    else
        return "null";
}
export const setCalData = (CalData) => {
  localStorage.setItem(`${domainshortName}` +"calData", JSON.stringify(CalData));
}
export const  getCalData = () => {
  const CalDatastr = localStorage.getItem(`${domainshortName}` +"calData");
    if(CalDatastr)
        return JSON.parse(CalDatastr);
    else{
        //handleLogout();
        return undefined;
    }
}
export const getUser = () => {
    const userStr = localStorage.getItem(`${domainshortName}` +"user");
    if(userStr)
        return JSON.parse(userStr);
    else
        return null;
}





export const drawerWidthval = () => {
  return "17rem";
}



export const getMenuData = () => {
  debugger;
  const MenuData = localStorage.getItem(`${domainshortName}` +"MenuData");
 return MenuData.length>0 ? JSON.parse(MenuData):[];
}

export const setRetailerName = (RetailerName) => {
  localStorage.setItem(`${domainshortName}` +"RetailerName", RetailerName);
}
export const getRetailerName = () => {
  const RetailerNameStr = localStorage.getItem(`${domainshortName}` +"RetailerName");
    if(RetailerNameStr)
        return RetailerNameStr;
    else
        return "Total Ecom";
}
export const setRetailerDisplayName = (RetailerDisplayName) => {
  localStorage.setItem(`${domainshortName}` +"RetailerDisplayName", RetailerDisplayName);
}
export const getRetailerDisplayName = () => {
  const RetailerDisplayNameStr = localStorage.getItem(`${domainshortName}` +"RetailerDisplayName");
    if(RetailerDisplayNameStr)
        return RetailerDisplayNameStr;
    else
        return "Total Ecom";
}

export const getScreenName = () => {
  const ScreenNameStr = localStorage.getItem(`${domainshortName}` +"ScreenName");
    if(ScreenNameStr)
        return ScreenNameStr;
    else
        return "Summary";
}

export const getScreenNameRetailers = () => {
  const ScreenNameRetailers = localStorage.getItem(`${domainshortName}` +"ScreenNameRetailer");
    if(ScreenNameRetailers)
        return ScreenNameRetailers;
    else
        return "";
}

export const setScreenName = (ScreenName) => {
    localStorage.setItem(`${domainshortName}` +"ScreenName", ScreenName);
}

export const setScreenNameRetailer = (ScreenNameRetailer) => {
  localStorage.setItem(`${domainshortName}` +"ScreenNameRetailer", ScreenNameRetailer);
}

export const setYear = (yearObj) => {
    localStorage.setItem(`${domainshortName}yearFilters`, JSON.stringify(yearObj));
}

export const getYear = () => {
    if(localStorage.getItem(`${domainshortName}yearFilters`))
        return JSON.parse(localStorage.getItem(`${domainshortName}yearFilters`));
    else
        return null;
}

export const setCurrentYear = (year) => {
    localStorage.setItem(`${domainshortName}CurrentYear`, year);
}

export const getCurrentYear = () => {
    if(localStorage.getItem(`${domainshortName}CurrentYear`))
        return localStorage.getItem(`${domainshortName}CurrentYear`);
    else
        return 0;
}


export const getgroupName = () => {
  const grpnNameStr = localStorage.getItem(`${domainshortName}` +"GroupName");
    if(grpnNameStr)
        return grpnNameStr;
    else
        return "EComm Scorecard";
}
export const setgroupName = (GroupName) => {
    localStorage.setItem(`${domainshortName}` +"GroupName", GroupName);
}
export const getToken = () => {
    return localStorage.getItem(`${domainshortName}` +"token") || null;
}

export const setUserSession = (token, user) => {
  debugger
    localStorage.setItem(`${domainshortName}` +"token", token);
    localStorage.setItem(`${domainshortName}` +"user", JSON.stringify(user));
    localStorage.setItem(`${domainshortName}` +"refreshToken_DComm", user.refresh_token);
}

export const removeUserSession = () => {
    localStorage.removeItem(`${domainshortName}` +"token");
    localStorage.removeItem(`${domainshortName}` +"user");
    localStorage.removeItem(`${domainshortName}` +"calData");
    localStorage.removeItem(`${domainshortName}` +"ScreenName");
    localStorage.removeItem(`${domainshortName}` +"GroupName");
    localStorage.removeItem(`${domainshortName}` +"RetailerName");
    localStorage.removeItem(`${domainshortName}` +"RetailerDisplayName");
    localStorage.removeItem(`${domainshortName}` +"refreshToken_DComm");
    localStorage.removeItem(`${domainshortName}` +"UpdatedDateWeek");
    localStorage.removeItem(`${domainshortName}` +"ScreenNameRetailer");
    localStorage.removeItem(`${domainshortName}` +"MenuData");
    localStorage.removeItem(`${domainshortName}` +"Etype");
}
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function convertrealnumber(value) {
  if (value.includes("m") == true) {
    value = value.replace("m", "").trim();
    value = value * 1000000;
    return value;
  }
  else if (value.includes("k") == true) {
    value = value.replace("k", "").trim();
    value = value * 1000;
    return value;
  }
  else {
  return value;
  }
  }
export const GetCalcValue = (value, decimal) => {
    var FixedPrecision = decimal;
    var vvval = 0;
    if (value !== null || value !== undefined) {
        if (value === 0) {
            return "-";
        }
        else if (value < 0) {
            // billions
            if (value >= -999999999999 && value <= -1000000000) {
                return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
            }
            // millions
            else if (value >= -999999999 && value <= -1000000) {
                vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
                return '-' + numberWithCommas(vvval) + 'M';
            }
            // thousands
            else if (value >= -999999 && value <= -1000) {
                vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
                return '-' + numberWithCommas(vvval) + 'K';
            }
            // hundreds
            else if (value <= -999) {
                return '-' + Math.abs(value.toFixed(FixedPrecision));
            }
            else{
                return value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
                    
        }
        else{
            // hundreds
            if (value <= 999) {
                return value.toFixed(FixedPrecision);
            }
            // thousands
            else if (value >= 1000 && value <= 999999) {
                vvval = (value / 1000).toFixed(FixedPrecision);
                return numberWithCommas(vvval) + 'K';
            }
            // millions to billions
            else if (value >= 1000000 && value <= 999999999999) {
                vvval = (value / 1000000).toFixed(FixedPrecision);
                return numberWithCommas(vvval) + 'M';
            }
            else{
                return  value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
        }
        
    }
    else{
        return "-";
    }
  
}
export const GetTileCalcValue = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;
  if (value !== null || value !== undefined) {
      if (value === 0) {
          return "--";
      }
      else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'M';
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'K';
          }
          // hundreds
          else if (value <= -999) {
              return '-' + Math.abs(value.toFixed(FixedPrecision));
          }
          else{
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
                  
      }
      else{
          // hundreds
          if (value <= 999) {
              return value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'K';
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'M';
          }
          else{
              return  value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
      }
      
  }
  else{
      return "--";
  }

}
export const GetQtyCalcValue = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;

  if (value !== null && value !== undefined ) {
      if (value === 0) {
          return "--";
      } else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return (
                  "-" + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + "b"
              );
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return "-" + numberWithCommas(vvval) + "m";
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return "-" + numberWithCommas(vvval) + "k";
          }
          // hundreds
          else if (value <= -999) {
              return "-" + Math.abs(value.toFixed(FixedPrecision));
          } else {
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
      } else {
          // hundreds
          if (value <= 999) {
              return value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + "k";
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + "m";
          } else {
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
      }
  } else {
      return " ";
  }
};

export const GetgapTileCalcValue = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;
  if (value !== null || value !== undefined) {
      if (value === 0) {
          return "--";
      }
      else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'M';
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'K';
          }
          // hundreds
          else if (value <= -999) {
              return '-' + Math.abs(value.toFixed(FixedPrecision));
          }
          else{
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
                  
      }
      else{
          // hundreds
          if (value <= 999) {
              return "+"+value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return "+"+numberWithCommas(vvval) + 'K';
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return "+"+numberWithCommas(vvval) + 'M';
          }
          else{
              return  value !== undefined ? "+"+value.toFixed(FixedPrecision) : 0;
          }
      }
      
  }
  else{
      return "--";
  }

}
export const GetdollarCalcValuewithoutSymbols = (value, decimal,tobillionOnly = false) => {
    var FixedPrecision = decimal;
    var vvval = 0;
    if (value !== null || value !== undefined) {
        if (value === 0) {
            return " ";
        }
        else if (value < 0) {
            // billions
            if (value >= -999999999999 && value <= -1000000000) {
                return  Math.abs((value / 1000000000).toFixed(FixedPrecision)) ;
            }
            // millions
            else if (value >= -999999999 && value <= -1000000) {
                vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
                return  numberWithCommas(vvval) ;
            }
            // thousands
            else if (value >= -999999 && value <= -1000) {
                vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
                return  numberWithCommas(vvval) ;
            }
            // hundreds
            else if (value <= -999) {
                return   Math.abs(value.toFixed(FixedPrecision));
            }
            else{
                return value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
                    
        }
        else{
            // hundreds
            if (value <= 999) {
                return value.toFixed(FixedPrecision);
            }
            // thousands
            else if (value >= 1000 && value <= 999999) {
                vvval = (value / 1000).toFixed(FixedPrecision);
                return numberWithCommas(vvval) ;
            }
            //millions to billions
            else if(tobillionOnly && value >= 1000000){
              vvval = (value / 1000000000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) ;
            }
          
            else if (value >= 1000000 && value <= 999999999) {
                vvval = (value / 1000000).toFixed(FixedPrecision);
                return numberWithCommas(vvval) ;
            }
              // millions
              //   else if (value >= 1000000 ) {
              //     vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              //     return '$' + numberWithCommas(vvval) + 'M';
              // }
              // billions
              else if (value >= 1000000000 && value <= 999999999999) {
                vvval = Math.abs((value / 1000000000).toFixed(FixedPrecision));
                return  numberWithCommas(vvval) ;
            }
            else{
                return  value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
        }
        
    }
    else{
        return "";
    }
  
  }
  export const GetdollarCalcValue = (value, decimal, tobillionOnly = false) => {
    var FixedPrecision = decimal;
    var vvval = 0;

    // Ensure value is valid
    if (value !== null && value !== undefined && !isNaN(value)) {
        if (value === 0) {
            return " "; // Handle zero case
        }
        
        if (value < 0) {
            // Handle negative values
            if (value >= -999999999999 && value <= -1000000000) {
                return '-$' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B'; // Billions
            } else if (value >= -999999999 && value <= -1000000) {
                vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
                return '-$' + numberWithCommas(vvval) + 'M'; // Millions
            } else if (value >= -999999 && value <= -1000) {
                vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
                return '-$' + numberWithCommas(vvval) + 'K'; // Thousands
            } else if (value <= -999) {
                return '-$' + Math.abs(value.toFixed(FixedPrecision)); // Hundreds
            } else {
                return value !== undefined ? '$' + value.toFixed(FixedPrecision) : '$0'; // Default case
            }
        } else {
            // Handle positive values
            if (value <= 999) {
                return '$' + value.toFixed(FixedPrecision); // Hundreds
            } else if (value >= 1000 && value <= 999999) {
                vvval = (value / 1000).toFixed(FixedPrecision);
                return '$' + numberWithCommas(vvval) + 'K'; // Thousands
            } else if (value >= 1000000 && value < 1000000000) {
                // Millions (non-billion values)
                vvval = (value / 1000000).toFixed(FixedPrecision);
                return '$' + numberWithCommas(vvval) + 'M'; // Millions
            } else if (tobillionOnly && value >= 1000000000) {
                // Handle Billion-only scenario
                vvval = (value / 1000000000).toFixed(FixedPrecision);
                return '$' + numberWithCommas(vvval) + 'B'; // Billions only
            } else if (value >= 1000000000 && value <= 999999999999) {
                vvval = (value / 1000000000).toFixed(FixedPrecision);
                return '$' + numberWithCommas(vvval) + 'B'; // Billions
            } else {
                return value !== undefined ? '$' + value.toFixed(FixedPrecision) : '$0'; // Default case for large values
            }
        }
    } else {
        return ""; // Return empty string for invalid values
    }
};

export const GetTiledollarCalcValue = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;
  if (value !== null || value !== undefined) {
      if (value === 0) {
          return "--";
      }
      else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return '-$' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return '-$' + numberWithCommas(vvval) + 'M';
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return '-$' + numberWithCommas(vvval) + 'K';
          }
          // hundreds
          else if (value <= -999) {
              return '-$' + Math.abs(value.toFixed(FixedPrecision));
          }
          else{
              return value !== undefined ? '$' +value.toFixed(FixedPrecision) : '$' +0;
          }
                  
      }
      else{
          // hundreds
          if (value <= 999) {
              return '$' +value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return '$' +numberWithCommas(vvval) + 'K';
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return '$' +numberWithCommas(vvval) + 'M';
          }
          else{
              return  value !== undefined ? '$' +value.toFixed(FixedPrecision) : '$' +0;
          }
      }
      
  }
  else{
      return "--";
  }

}
export const GetCalcValueAxis = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;
  if (value !== null || value !== undefined) {
      if (value === 0 || value === 0.0 || value === 0.00) {
          return "";
      }
      else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'M';
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'K';
          }
          // hundreds
          else if (value <= -999) {
              return '-' + Math.abs(value.toFixed(FixedPrecision));
          }
          else{
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
                  
      }
      else{
          // hundreds
          if (value <= 999) {
              return value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'K';
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'M';
          }
          else{
              return  value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
      }
      
  }
  else{
      return "";
  }

}
export const GetCalcPercentage = (value, decimal) => {
  
  if (value !== null || value !== undefined) {
    var getval = (value * 100).toFixed(decimal);
    if(getval <= 0){
      return (value * 100).toFixed(decimal)+"%";
    }
    else{
      return   (value * 100).toFixed(decimal)+"%";
    }
    
  }
  else{
    return "";
  }
}
export const GetCalcPerwitharrow = (value, decimal) => {
  
  if (value !== null || value !== undefined) {
    var getval = (value * 100).toFixed(decimal);
    if(getval <= 0){
      return Math.abs((value * 100)).toFixed(decimal)+"%";
    }
    else{
      return (value * 100).toFixed(decimal)+"%";
    }
    
  }
  else{
    return "";
  }
}
export const GetTileCalcPercentage = (value, decimal) => {
  
  if (value !== null || value !== undefined) {
    var getval = (value * 100).toFixed(decimal);
    if(getval === "0" || getval === "0.0" ){
      return "--";
    }
    else{
      return (value * 100).toFixed(decimal)+"%";
    }
    
  }
  else{
    return "--";
  }
}
export const GetgapTileCalcPercentage = (value, decimal) => {
  if (value !== null || value !== undefined) {
    var getval = (value * 100).toFixed(decimal);
    if(getval < 0){
      return getval+"%";
    }
    else{
      return "+"+getval+"%";
    }
  }
  else{
    return "--";
  }
}
export const GetgapTileFlatPer = (value, decimal) => {
  if (value !== null || value !== undefined) {
    var getval = (value).toFixed(decimal);
    if(getval < 0){
      return getval+"%";
    }
    else{
      return "+"+getval+"%";
    }
  }
  else{
    return "--";
  }
}
export const GetTileFlatPer = (value, decimal) => {
  
  if (value !== null || value !== undefined) {
    var getval = (value).toFixed(decimal);
    if(getval === "0" || getval === "0.0" ){
      return "--";
    }
    else{
      return (value).toFixed(decimal)+"%";
    }
    
  }
  else{
    return "--";
  }
}

export const GetExcelFlatPer = (value, decimal) => {
  
  if (value !== null || value !== undefined) {
    var getval = (value).toFixed(decimal);
    if(getval === "0" || getval === "0.0" || getval === "0.00"){
      return " ";
    }
    else{
      return (value).toFixed(decimal)+"%";
    }
    
  }
  else{
    return " ";
  }
}

export const FormatediffValue = (value, isColor) => {
    var FixedPrecision = 1;
    var vval = 0;
    if (value !== null || value !== undefined) {
        if (value === 0) {
            return 0;
        }
        else if (value < 0) {
            // billions
            if (value >= -999999999999 && value <= -1000000000) {
                return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
            }
            // millions
            else if (value >= -999999999 && value <= -1000000) {
                vval = Math.abs((value / 1000000).toFixed(FixedPrecision));
                return '-' + numberWithCommas(vval) + 'M';
            }
            // thousands
            else if (value >= -999999 && value <= -1000) {
                vval = Math.abs((value / 1000).toFixed(FixedPrecision));
                return '-' + numberWithCommas(vval) + 'K';
            }
            // hundreds
            else if (value <= -999) {
                return '-' + Math.abs(value.toFixed(FixedPrecision));
            }
            else{
                return value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
                    
        }
        else{
            // hundreds
            if (value <= 999) {
                return '+' + value.toFixed(FixedPrecision);
            }
            // thousands
            else if (value >= 1000 && value <= 999999) {
                vval = (value / 1000).toFixed(FixedPrecision);
                return '+' + numberWithCommas(vval) + 'K';
            }
            // millions to billions
            else if (value >= 1000000 && value <= 999999999999) {
                vval = (value / 1000000).toFixed(FixedPrecision);
                return '+' + numberWithCommas(vval) + 'M';
            }
            else{
                return  value !== undefined ? value.toFixed(FixedPrecision) : 0;
            }
        }
        
    }
    else{
        return "-";
    }
  
}
export const GetgapCalcValueAxis = (value, decimal) => {
  var FixedPrecision = decimal;
  var vvval = 0;
  if (value !== null || value !== undefined) {
      if (value === 0) {
          return 0;
      }
      else if (value < 0) {
          // billions
          if (value >= -999999999999 && value <= -1000000000) {
              return '-' + Math.abs((value / 1000000000).toFixed(FixedPrecision)) + 'B';
          }
          // millions
          else if (value >= -999999999 && value <= -1000000) {
              vvval = Math.abs((value / 1000000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'M';
          }
          // thousands
          else if (value >= -999999 && value <= -1000) {
              vvval = Math.abs((value / 1000).toFixed(FixedPrecision));
              return '-' + numberWithCommas(vvval) + 'K';
          }
          // hundreds
          else if (value <= -999) {
              return '-' + Math.abs(value.toFixed(FixedPrecision));
          }
          else{
              return value !== undefined ? value.toFixed(FixedPrecision) : 0;
          }
                  
      }
      else{
          // hundreds
          if (value <= 999) {
              return "+"+value.toFixed(FixedPrecision);
          }
          // thousands
          else if (value >= 1000 && value <= 999999) {
              vvval = (value / 1000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'K';
          }
          // millions to billions
          else if (value >= 1000000 && value <= 999999999999) {
              vvval = (value / 1000000).toFixed(FixedPrecision);
              return numberWithCommas(vvval) + 'M';
          }
          else{
              return  value !== undefined ? "+"+value.toFixed(FixedPrecision) : 0;
          }
      }
      
  }
  else{
      return 0;
  }

}
export const Captilize = (Text) => {
    if (Text !== undefined) {
        return Text.toLocaleLowerCase().replace(/\b[a-z]/g, function (letter) { return letter.toUpperCase(); });
    }
}

export const countOccurrences = (yearsArray) => {
  const yearCount = {};

  // Count occurrences of each year
  yearsArray.forEach((year) => {
    if (yearCount[year]) {
      yearCount[year]++;
    } else {
      yearCount[year] = 1;
    }
  });

  // Convert the count object to an array of objects
  const resultArray = Object.keys(yearCount).map((year) => ({
    year: parseInt(year), // Convert year back to integer if needed
    count: yearCount[year],
  }));

  return resultArray;
};

export const ArrangeYearsForChart = (yearsCount, categoryAxisCount) => {
  const years = [];

  //   yearsCount = [{
  //     year: '2024',
  //     count: 13
  //   },
  //  ]
  yearsCount.forEach((year) => {
    let percent = (year.count / categoryAxisCount) * 100;
    years.push({
      year: year.year,
      count: percent < 15 ? "16%" : percent.toString() + "%",
      countPer: percent < 15 ? 16 : percent.toString(),
    });
  });
  return years;
};



