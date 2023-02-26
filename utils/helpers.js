const dayjs = require('dayjs');

module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
      },
      format_date: (date) => {
        return dayjs(date).format("mm/dd/yyyy");
      },
}