import React from "react";
import { Outlet, RouteObject, createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderWP from "./components/HeaderWP";
import FooterWP from "./components/FooterWP";
import HomeWP from "./pages/HomeWP";
import Overview from "./pages/aboutus/Overview";
import Initiatives from "./pages/Initiatives";
import Classifieds from "./pages/Classifieds";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import PeopleBehind from "./pages/aboutus/PeopleBehind";
import KKMA_History from "./pages/aboutus/KKMA_History";
import SocialProjects from "./pages/Initiatives/SocialProjects";
import MagnetClub from "./pages/Initiatives/MagnetClub";
import MembershipInformation from "./pages/membership/MembershipInformation";
import MemberPrivileges from "./pages/membership/MemberPrivileges";
import ViewClassifieds from "./pages/classifieds/viewclassifieds";
import ClassifiedsCategories from "./pages/classifieds/viewcategories";
import QuickSearch from "./pages/classifieds/QuickSearch";
import AddPost from "./pages/classifieds/AddPost";
import UserLogin from "./pages/user/Login";
import UserDashboard from "./pages/user/Dashboard";
import NewsAndUpdates from "./pages/media/newsandupdates";
import EventsAndPrograms from "./pages/media/eventsprograms";
import ContactPage from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";

import AdminContacts from "./pages/admin/Contacts";
import AdminLayout from "./pages/admin/Layout";
import AdminNews from "./pages/admin/News";
import AdminEvents from "./pages/admin/EventsandPrograms";
import AdminMemberships from "./pages/admin/Memberships";
import AdminMembershipDetail from "./pages/admin/MembershipDetail";
import AdminClassifieds from "./pages/admin/Classifieds";
import EventDetail from "./pages/media/EventDetail";
import NewsDetail from "./pages/media/NewsDetail";
import CategoryNews from "./pages/media/CategoryNews";
import ArchiveNews from "./pages/media/ArchiveNews";
import Register from "./pages/membership/Register";

function Layout(): React.JSX.Element {
return (
<div className="app-root">
<HeaderWP />
<main>
<Outlet />
</main>
<FooterWP />
</div>
);
}

export default function App(): React.JSX.Element {
const routes: RouteObject[] = [
{
path: "/",
 element: <Layout />,
 children: [
{ index: true, element: <HomeWP /> },
{ path: "contact", element: <ContactPage /> },
{ path: "media/events-and-programs", element: <EventsAndPrograms /> },
{ path: "media/news-and-updates", element: <NewsAndUpdates /> },
{ path: "media/news-and-updates/:id", element: <NewsDetail /> },
{ path: "media/category/:categoryName", element: <CategoryNews /> },
{ path: "media/archive/:archiveKey", element: <ArchiveNews /> },
{ path: "media/events-and-programs/:id", element: <EventDetail /> },
{ path: "classifieds/quick-search", element: <QuickSearch /> },
{ path: "classifieds/view-categories", element: <ClassifiedsCategories /> },
{ path: "classifieds/view-classifieds", element: <ViewClassifieds /> },
{ path: "classifieds/add-post", element: <AddPost /> },
{ path: "user", element: <UserLogin /> },
{ path: "user/dashboard", element: <UserDashboard /> },
{ path: "membership/member-privileges", element: <MemberPrivileges /> },
{ path: "membership/membership-information", element: <MembershipInformation /> },
{ path: "membership/register", element: <Register /> },
{ path: "initiatives/magnet-club", element: <MagnetClub /> },
{ path: "initiatives/social-projects", element: <SocialProjects /> },
{ path: "about/overview", element: <Overview /> },
{ path: "about/people-behind", element: <PeopleBehind /> },
{ path: "about/kkma-history", element: <KKMA_History /> },
{ path: "initiatives", element: <Initiatives /> },
{ path: "classifieds", element: <Classifieds /> },
{ path: "media", element: <Media /> },
{ path: "contact", element: <Contact /> }
]
},
// Standalone admin login (no AdminLayout)
{ path: "/admin", element: <AdminLogin /> },
// Admin pages under AdminLayout
{
path: "/admin",
 element: <AdminLayout />,
 children: [
{ path: "contacts", element: <AdminContacts /> },
{ path: "classifieds", element: <AdminClassifieds /> },
{ path: "news", element: <AdminNews /> },
{ path: "events", element: <AdminEvents /> },
{ path: "memberships", element: <AdminMemberships /> },
{ path: "memberships/:id", element: <AdminMembershipDetail /> },
]
}
];

const router = createBrowserRouter(routes);
return <RouterProvider router={router} />;
}
