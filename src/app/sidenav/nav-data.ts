import { faHouse, faUser ,faChartSimple,faSignOut, faFemale} from '@fortawesome/free-solid-svg-icons';

export const navbarData = [
    {
        routeLink: 'dashboard',
        icon: faHouse,
        label: 'หน้าแรก'
    },
    // {
    //     routeLink: 'table',
    //     icon: faChartSimple,
    //     label: 'Table'
    // },
    {
        routeLink: 'patients',
        icon: faUser,
        label: 'ผู้ป่วย'
    },
    {
        routeLink: 'nurses',
        icon: faFemale,
        label: 'พยาบาล'
    },
    {
        routeLink: 'signout',
        icon: faSignOut,
        label: 'ออกจากระบบ'
    },
];