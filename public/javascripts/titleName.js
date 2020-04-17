const pathname = window.location.pathname;
const dispTitle = document.getElementById("displayTitle");
const navHome = document.getElementById("navHome");
const navByty = document.getElementById("navByty");
const navRod = document.getElementById("navRod");
const navObch = document.getElementById("navObch");
const navStav = document.getElementById("navStav");
const navChat = document.getElementById("navChat");
const navOrn = document.getElementById("navOrn");
const navGar = document.getElementById("navGar");
const navPre = document.getElementById("navPre");
const navProfil = document.getElementById("navProfil");
const navKont = document.getElementById("navKont");

if (pathname.startsWith("/all/byty")) {
  dispTitle.innerHTML = "Reflex-Reality | Byty";
  navByty.classList.add("active");
} else if (pathname.startsWith("/all/rodinne-domy")) {
  dispTitle.innerHTML = "Reflex-Reality | Rodinné domy";
  navRod.classList.add("active");
} else if (pathname.startsWith("/all/obchodne-priestory")) {
  dispTitle.innerHTML = "Reflex-Reality | Obchodné priestory";
  navObch.classList.add("active");
} else if (pathname.startsWith("/all/stavebne-pozemky")) {
  dispTitle.innerHTML = "Reflex-Reality | Stavebné pozemky";
  navStav.classList.add("active");
} else if (pathname.startsWith("/all/chaty-a-zahrady")) {
  dispTitle.innerHTML = "Reflex-Reality | Chaty a záhrady";
  navChat.classList.add("active");
} else if (pathname.startsWith("/all/orna-poda")) {
  dispTitle.innerHTML = "Reflex-Reality | Orná pôda";
  navOrn.classList.add("active");
} else if (pathname.startsWith("/all/garaze")) {
  dispTitle.innerHTML = "Reflex-Reality | Garáže";
  navGar.classList.add("active");
} else if (pathname.startsWith("/all/prenajom")) {
  dispTitle.innerHTML = "Reflex-Reality | Prenájom";
  navPre.classList.add("active");
} else if (pathname.startsWith("/users")) {
  dispTitle.innerHTML = "Reflex-Reality | Môj profil";
  navProfil.classList.add("active");
} else if (pathname.startsWith("/admin")) {
  dispTitle.innerHTML = "Reflex-Reality | Admin";
} else if (pathname.startsWith("/contact")) {
  dispTitle.innerHTML = "Reflex-Reality | Kontakt";
  navKont.classList.add("active");
} else {
  dispTitle.innerHTML = "Reflex-Reality";
}

if(pathname !== "/") {
  navHome.classList.remove("active");
}