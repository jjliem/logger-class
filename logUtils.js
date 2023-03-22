const fs = require('fs');
const path = require('path');
const dateUtils = require('../utils/dateUtils.js');

// ex. let createLogger = new Logger("create");
class Logger 
{
    constructor(type)
    {
        this.logFile = null;
        this.type = type;
        this.dirPath = `./output/${this.type}_logs/`;
        this.todaysFileDate = null;
    }

    // methods

    // get today's file date, check if log folder exists
    init()
    {
        // get today's file date
        this.todaysFileDate = dateUtils.getTodaysFileDate();

        // check if folder exists, else make one
        if (! fs.existsSync(this.dirPath))
        {
            fs.mkdirSync(this.dirPath, {recursive: true});
        }

        // assemble filename and create write stream
        const fileName = `${this.todaysFileDate}_${this.type}_log.txt`;
        this.logFile = fs.createWriteStream(this.dirPath+fileName, {flags: 'a'}); // a = append not overwrite

        // handle error with stream
        this.logFile.on('error', (err) => {
            console.error(`${this.type} logger error: `, err);
        })
    }

    endWriteStream()
    {
        if (this.logFile != null)
            this.logFile.end();
    }

    // save to txt and output at the same time
    write(msg)
    {
        let ts = dateUtils.getHHMMSS();
        
        let newMsg = {ts, ...msg};   // put timestamp first

        this.save_to_txt(newMsg);   
    }

    // read log of a file from a specific date within 2 weeks
    read(type, daysAgo = 0)
    {
        // get date for filename
        let date_str = dateUtils.getDateXDaysAgo(daysAgo);

        if (type == undefined)
        {
            devlog("Logger.read: log has not been created for today");
        }

        let output = {};
        let path = "";

        try
        {
            let path = `./output/${type}_logs/${date_str}_${type}_log.txt`;
            console.log("readLog path: " + path);

            // read data from txt file
            output = fs.readFileSync(path, {encoding: 'utf-8'});

            // replace backslash quote with single tick
            output = output.replace(/\\"/g, "'");

            // remove last comma
            output = output.replace(/,\s*$/, "");

            // add brackets so it can be parsed
            output = "[" + output + "]";
        }
        catch(e)
        {
            output = '{"error while reading logs": "' + e.message + '"}';
        }

        // parse from string to array of objects
        return JSON.parse(output);
    }

    // save output to txt file
    save_to_txt(msg)
    {   
        // convert msg to str
        let str = typeof msg == "object" ? JSON.stringify(msg) : msg

        // check if day has changed since last used
        if (this.todaysFileDate === null || this.todaysFileDate != dateUtils.getTodaysFileDate())
        {
            // end previous day's write stream
            if (this.logFile != null)
                this.logFile.end;

            // reinitialize
            this.init();
        }

        this.logFile.write(`${str},\n`, 'utf8');
    }

    // delete logs older than 2 weeks
    delete_old_logs()
    {
        console.log("delete_old_logs: ", this.dirPath);

        const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

        fs.readdir(this.dirPath, (err, files) => 
        {
            if (err){
                console.error(`Error while reading ${dirPath}: `, err);
                return;
            }

            files.forEach((file) => 
            {
                const filePath = path.join(this.dirPath, file);

                fs.stat(filePath, (err, stats) => 
                {
                    if (err){
                        console.error(`Error while reading ${file} file stats: `, err);
                        return;
                    }

                    if (stats.isFile() && stats.mtime < twoWeeksAgo){
                        fs.unlink(filePath, (err) => {
                            if (err){
                                console.error(`Error while deleting ${file}: `, err);
                            } else {
                                devlog('Deleted old log file: ', filePath);
                            }
                        });
                    }
                });
            });
        });
    }
}

module.exports = {Logger}
