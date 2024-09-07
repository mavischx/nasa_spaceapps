"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { schedule, DaySchedule, ScheduleItem } from "./timeline.dto";
import {
    Timeline as MuiTimeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    timelineItemClasses,
} from "@mui/lab";
import { Paper, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Tooltip from "../general/tooltip"


const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const Itinerary: React.FC = () => {
    const router = useRouter();
    const startDate = new Date(2024, 9, 4);

    const sharedView = () => {
        return (
            <div className="relative z-10 py-[24px] TabletScreen:mx-[8.06%] DesktopScreen:mx-[8.06%]">
                <div>
                    {schedule.map((day: DaySchedule, dayIndex: number) => {
                        const dayDate = new Date(startDate);
                        dayDate.setDate(startDate.getDate() + dayIndex);
                        return (
                            <section key={dayIndex} id={`day-${dayIndex + 1}`} className="mb-16">
                                <div className='MobileScreen:hidden TabletScreen:hidden'>
                                    <div className="flex items-center mb-10">
                                        <Tooltip text="Back to Timeline">
                                            <IconButton
                                                variant="contained"
                                                size="large"
                                                color="primary"
                                                onClick={() => router.push("/#timeline")}
                                                className="mr-4 text-white hover:text-hackathone-font-rocket-red TabletScreen:hidden MobileScreen:hidden"
                                                edge="start"
                                                sx={{
                                                    width: '3.5rem',
                                                    height: '3.5rem',
                                                    fontSize: '5rem',
                                                    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                }}
                                                aria-label="back to home"
                                            >
                                                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="50" cy="50" r="50" fill="#EAFE07" />
                                                    <path d="M50 76L54.5825 71.4175L36.4475 53.25L76 53.25L76 46.75L36.4475 46.75L54.5825 28.5825L50 24L24 50L50 76Z" fill="black" />
                                                </svg>
                                            </IconButton>
                                        </Tooltip>
                                        <Typography
                                            variant="h3"
                                            component="h1"
                                            className="text-4xl font-hackathoneCabinetGrotesk font-bold text-hackathone-font-rocket-red text-start md:text-[3.5rem] MobileScreen:hidden"
                                        >
                                            {day.title}
                                            <span className='text-4xl text-white md:text-[32.99px]'>
                                                {" (" + formatDate(dayDate) + "'24)"}
                                            </span>
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            component="h1"
                                            className="text-3xl font-hackathoneCabinetGrotesk font-bold text-hackathone-font-rocket-red text-start DesktopScreen:hidden TabletScreen:hidden sm:text-[3.5rem] pl-4"
                                        >
                                            <span className='MobileScreen:whitespace-pre'>{" "}{day.title}</span>
                                            <span className='text-2xl text-white sm:text-[32.99px] MobileScreen:whitespace-pre'>
                                                {"\n (" + formatDate(dayDate) + "'24)"}
                                            </span>
                                        </Typography>

                                    </div>
                                    <MuiTimeline
                                        position="right"
                                        sx={{
                                            [`& .${timelineItemClasses.root}:before`]: {
                                                flex: 0,
                                                padding: 0,
                                            },
                                            [`& .${timelineItemClasses.root}`]: {
                                                padding: '0 0 0 1.5rem',
                                            },
                                        }}
                                    >
                                        {day.day.map((item: ScheduleItem, index: number) => (
                                            <TimelineItem
                                                key={index}
                                                className="cursor-pointer"
                                                tabIndex={0}
                                            >
                                                <TimelineSeparator>
                                                    <TimelineDot className="bg-hackathone-font-rocket-red" />
                                                    {index < day.day.length - 1 && (
                                                        <TimelineConnector
                                                            className="transition-all duration-500 ease-in-out"
                                                        />
                                                    )}
                                                </TimelineSeparator>
                                                <div className='w-[15rem] mx-[1rem] justify-center items-center text-center'>
                                                    <TimelineContent>
                                                        <Paper
                                                            elevation={3}
                                                            className="p-2 rounded-lg transition-all duration-500  ease-in-out w-[13rem] h-[3rem] "
                                                            style={{
                                                                backgroundColor: "rgb(234 254 7)",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                component="h1"
                                                                className="md:text-[1rem] text-[14px] font-extrabold text-black text-center whitespace-nowrap"
                                                                style={{
                                                                    backgroundColor: "rgb(234 254 7)",
                                                                }}
                                                            >
                                                                {item.time}
                                                            </Typography>
                                                        </Paper>
                                                    </TimelineContent>
                                                </div>
                                                <div className='translate-y-[-30%] w-[55%]'>
                                                    <TimelineContent>
                                                        <Paper
                                                            elevation={3}
                                                            className="relative flex-1 p-4 rounded-xl transition-all duration-500 ease-in-out my-[1.5rem]"
                                                            style={{
                                                                backgroundColor: "#1e1e1e",
                                                            }}
                                                        >

                                                            <Typography
                                                                variant="h6"
                                                                component="h1"
                                                                className="md:text-xl text-[14px] font-bold text-hackathone-font-rocket-red text-start lg:whitespace-nowrap"
                                                            >
                                                                {item.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                className="text-start text-white"
                                                            >
                                                                {item.content}
                                                            </Typography>
                                                        </Paper>
                                                    </TimelineContent>
                                                </div>

                                            </TimelineItem>
                                        ))}
                                    </MuiTimeline>
                                </div>
                                <div className='DesktopScreen:hidden'>
                                    <div className="flex flex-row items-center text-center justify-center TabletScreen:mb-10 mb-4">
                                        <div className='TabletScreen:w-[20%] TabletScreen:text-left MobileScreen:flex MobileScreen:flex-row MobileScreen:w-full MobileScreen:ml-[2rem]'>
                                            {/*Button Sizing for Tablet Screen*/}
                                            <IconButton
                                                variant="contained"
                                                size="medium"
                                                color="primary"
                                                onClick={() => router.push("/#timeline")}
                                                className="mr-4 object-left text-white hover:text-hackathone-font-rocket-red MobileScreen:hidden"
                                                edge="start"
                                                sx={{
                                                    width: '3.5rem',
                                                    height: '3.5rem',
                                                    fontSize: '5rem',
                                                    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                }}
                                                aria-label="back to home"
                                            >
                                                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="50" cy="50" r="50" fill="#EAFE07" />
                                                    <path d="M50 76L54.5825 71.4175L36.4475 53.25L76 53.25L76 46.75L36.4475 46.75L54.5825 28.5825L50 24L24 50L50 76Z" fill="black" />
                                                </svg>
                                            </IconButton>
                                            {/*Button Sizing for Mobile Screen*/}
                                            <IconButton
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => router.push("/#timeline")}
                                                className="object-left text-white hover:text-hackathone-font-rocket-red TabletScreen:hidden"
                                                edge="start"
                                                sx={{
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    fontSize: '2.5rem',
                                                    position: 'relative',
                                                    top: '0',
                                                    left: '-0.5rem',
                                                }}
                                                aria-label="back to home"
                                            >
                                                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="50" cy="50" r="50" fill="#EAFE07" />
                                                    <path d="M50 76L54.5825 71.4175L36.4475 53.25L76 53.25L76 46.75L36.4475 46.75L54.5825 28.5825L50 24L24 50L50 76Z" fill="black" />
                                                </svg>
                                            </IconButton>
                                            <Typography
                                                variant="h3"
                                                component="h1"
                                                className="text-3xl font-hackathoneCabinetGrotesk font-bold text-hackathone-font-rocket-red text-start TabletScreen:hidden sm:text-[3.5rem] pl-4"
                                            >
                                                <span className='MobileScreen:whitespace-pre'>{" "}{day.title}</span>
                                                <span className='text-2xl text-white sm:text-[32.99px] MobileScreen:whitespace-pre'>
                                                    {"\n (" + formatDate(dayDate) + "'24)"}
                                                </span>
                                            </Typography>  {/*Header for Mobile Screen*/}
                                        </div>
                                        <div className='TabletScreen:w-[90%] TabletScreen:flex TabletScreen:text-center TabletScreen:justify-center TabletScreen:items-center MobileScreen:hidden'>
                                            <Typography
                                                variant="h3"
                                                component="h1"
                                                className="text-3xl font-hackathoneCabinetGrotesk font-bold text-hackathone-font-rocket-red text-center TabletScreen:text-start sm:text-[3.5rem]"
                                            >
                                                {day.title}
                                                <span className='text-3xl text-white sm:text-[32.99px] MobileScreen:whitespace-pre'>
                                                    {"\n (" + formatDate(dayDate) + "'24)"}
                                                </span>
                                            </Typography>
                                        </div>

                                    </div>
                                    <MuiTimeline
                                        position="right"
                                        sx={{
                                            [`& .${timelineItemClasses.root}:before`]: {
                                                flex: 0,
                                                padding: 0,
                                            },
                                            [`& .${timelineItemClasses.root}`]: {
                                                padding: '0 0 0 1.5rem',
                                            },
                                        }}
                                    >
                                        {day.day.map((item: ScheduleItem, index: number) => (
                                            <TimelineItem
                                                key={index}
                                                className="cursor-pointer"
                                                tabIndex={0}
                                            >
                                                <TimelineSeparator>
                                                    <TimelineDot className="bg-hackathone-font-rocket-red" />
                                                    {index < day.day.length - 1 && (
                                                        <TimelineConnector
                                                            className="transition-all duration-500 ease-in-out"
                                                        />
                                                    )}
                                                </TimelineSeparator>
                                                <div className='mx-[1rem] justify-center items-center text-center space-x-4 w-full'>
                                                    <TimelineContent>
                                                        <Paper
                                                            elevation={3}
                                                            className="h-[2.5rem] TabletScreen:mx-[15%]  MobileScreen:w-[80%] MobileScreen:h-fit"
                                                            style={{
                                                                backgroundColor: "rgb(234 254 7)",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                component="h1"
                                                                className="p-2 rounded-lg md:text-[1rem] text-[14px] font-extrabold text-black text-center MobileScreen:text-start MobileScreen:pl-[1rem]"
                                                                style={{
                                                                    backgroundColor: "rgb(234 254 7)",
                                                                }}
                                                            >
                                                                {item.time}
                                                            </Typography>

                                                        </Paper>
                                                        <Paper
                                                            elevation={3}
                                                            className="relative flex-1 p-4 rounded-xl transition-all duration-500 ease-in-out my-[2.5rem] MobileScreen:mb-[2.5rem] MobileScreen:mt-[1rem]"
                                                            style={{
                                                                backgroundColor: "#1e1e1e",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                component="h1"
                                                                className="md:text-xl text-[18px] font-bold text-hackathone-font-rocket-red text-center MobileScreen:text-start lg:whitespace-nowrap"
                                                            >
                                                                {item.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                className="text-center MobileScreen:text-start text-white pt-[0.5rem]"
                                                            >
                                                                {item.content}
                                                            </Typography>
                                                        </Paper>
                                                    </TimelineContent>
                                                </div>
                                            </TimelineItem>
                                        ))}
                                    </MuiTimeline>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div >
        );
    };

    return (
        <section>
            {sharedView()}
        </section>
    );
};




export default Itinerary;
