import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConstructionIcon from '@mui/icons-material/Construction';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import StarIcon from '@mui/icons-material/Star';

export const SidebarData = [
    {
        title: "タイマー",
        icon: <AccessTimeIcon />,
        link: "/timer",
    },

    {
        title: "泊地修理",
        icon: <ConstructionIcon />,
        link: "/anchorage_recovery",
    },

    {
        title: "配置転換",
        icon: <FlightLandIcon />,
        link: "/change_layout",
    },

    {
        title: "ExtraContents",
        icon: <StarIcon />,
        link: "/extra",
    },
] 