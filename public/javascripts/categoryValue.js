const selValue = document.getElementById("selVal").value;
if (selValue) {
  if(selValue === "byty") {
    document.getElementById("bytyOpt").selected = "true";
  } else if(selValue === "rodinne-domy") {
    document.getElementById("rodOpt").selected = "true";
  } else if(selValue === "obchodne-priestory") {
    document.getElementById("obchOpt").selected = "true";
  } else if(selValue === "stavebne-pozemky") {
    document.getElementById("stavOpt").selected = "true";
  } else if(selValue === "chaty-a-zahrady") {
    document.getElementById("chatOpt").selected = "true";
  } else if(selValue === "orna-poda") {
    document.getElementById("ornOpt").selected = "true";
  } else if(selValue === "garaze") {
    document.getElementById("garOpt").selected = "true";
  } else if(selValue === "prenajom") {
    document.getElementById("preOpt").selected = "true";
  }
}