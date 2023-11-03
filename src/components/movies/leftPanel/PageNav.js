import TopPageNavItem from "./PageNavItem";
function PageNav() {
  console.log("MOVIES PAGENAV rendered");
  return (
    <div className="my-5 flex items-center justify-between divide-x rounded-xl bg-gradient-to-b from-cyan-400 to-sky-900 dark:from-slate-900 dark:to-sky-900 xs:p-2 md:p-4 lg:my-10">
      {/* <TopPageNavItem to={""}>Tüm Filmler</TopPageNavItem> */}
      <TopPageNavItem to={""}>Popüler Filmler</TopPageNavItem>
      <TopPageNavItem to={"trend"}>Trend Filmler</TopPageNavItem>
      {/* <TopPageNavItem to={"populer"}>Populer Filmler</TopPageNavItem> */}
      <TopPageNavItem to={"top_rated"}> En Çok Oylananlar</TopPageNavItem>
      <TopPageNavItem to={"upcoming"}>Yakında</TopPageNavItem>
    </div>
  );
}

export default PageNav;
