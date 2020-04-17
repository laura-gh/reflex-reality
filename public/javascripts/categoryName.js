const path = window.location.pathname;
const dispCat = document.querySelector(".displayCategory");

if (dispCat) {
  if (path.startsWith("/all/byty")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Lakások";
    } else {
      dispCat.innerHTML = "Byty";
    }
  } else if (path.startsWith("/all/rodinne-domy")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Családi házak";
    } else {
    dispCat.innerHTML = "Rodinné domy";
    }
  } else if (path.startsWith("/all/obchodne-priestory")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Üzlethelyiségek";
    } else {
    dispCat.innerHTML = "Obchodné priestory";
    }
  } else if (path.startsWith("/all/stavebne-pozemky")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Építkezési telkek";
    } else {
    dispCat.innerHTML = "Stavebné pozemky";
    }
  } else if (path.startsWith("/all/chaty-a-zahrady")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Nyaralók és kertek";
    } else {
    dispCat.innerHTML = "Chaty a záhrady";
    }
  } else if (path.startsWith("/all/orna-poda")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Szántóföldek";
    } else {
    dispCat.innerHTML = "Orná pôda";
    }
  } else if (path.startsWith("/all/garaze")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Garázsok";
    } else {
    dispCat.innerHTML = "Garáže";
    }
  } else if (path.startsWith("/all/prenajom")) {
    if(path.endsWith("hu")) {
      dispCat.innerHTML = "Bérbeadás";
    } else {
    dispCat.innerHTML = "Prenájom";
    }
  } else {
    dispCat.innerHTML = "Reflex-Reality";
  }
}