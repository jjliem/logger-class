// dateUtils

const BEGINNING_OF_TIME = "2016-01-01";
const END_OF_TIME = "2050-12-31";

const BEGINNING_OF_DATETIME = "2010-01-01T05:00";
const END_OF_DATETIME = "2050-12-31T04:00";


// HH:MM:SS
function getHHMMSS()
{
    let date_ob = new Date();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);

    // current milliseconds
    let milliseconds = ("00" + date_ob.getMilliseconds()).slice(-3);

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// YYYY_MM_DD
function getTodaysFileDate()
{
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return year + "_" + month + "_" + date;
}

// MM/DD/YYYY
function getTodaysDate()
{
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return month + "/" + day + "/" + year;
}

// YYYY-MM-DD HH:MM:SS
function getDateTime()
{
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

// YYYY_MM_DD
function getDateXDaysAgo(numOfDays, date_ob = new Date()) 
{
    const dateDaysAgo = new Date(date_ob.getTime());
  
    dateDaysAgo.setDate(date_ob.getDate() - numOfDays);

    let date = ("0" + dateDaysAgo.getDate()).slice(-2);

    // current month
    let month = ("0" + (dateDaysAgo.getMonth() + 1)).slice(-2);

    // current year
    let year = dateDaysAgo.getFullYear();
  
    return year + "_" + month + "_" + date;
  }

// if today is Jan 01, returns 01
function getTodaysDay()
{
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    return date;
}

// if today is 2022-12-01 returns 2021-12-01
function getLastYearsDate()
{
    let date_ob = new Date();

    // adjust 0 before single digit days
    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return (year - 1) + "-" + month + "-" + day;
}

//for removing old tickets, go back 13 months
function getLastYearsDateMinusMonth()
{
    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() - 30);   // back up one more month

    // adjust 0 before single digit days
    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return (year - 1) + "-" + month + "-" + day;
}

//for removing old tickets, go back 13 months
function getLastMonthsDate()
{
    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() - 28);   // back up one month

    // adjust 0 before single digit days
    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return year + "-" + month + "-" + day;
}


// d1 = file date, d2 = delete day
function isBeforeDeleteDay(d1, d2)
{
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) 
    {
        return true;
    } 
    else if (date1 > date2) 
    {
        return false;
    } 
    else 
    {
        return false;
    }
};

// from an ISO UTC time string,
// convert to local ISO time string
//
function convertUTCtoLocal(utc)
{
    let dt = new Date(utc);
    let off = dt.getTimezoneOffset() * 60000;
    let newdt = new Date(dt - off).toISOString().substr(0,23);
    return newdt;
}

module.exports = {
    BEGINNING_OF_TIME, END_OF_TIME,
    getHHMMSS, getDateTime, getDateXDaysAgo, getTodaysDate, getTodaysFileDate, getTodaysDay, 
    getLastMonthsDate, getLastYearsDate, getLastYearsDateMinusMonth, isBeforeDeleteDay, convertUTCtoLocal }
