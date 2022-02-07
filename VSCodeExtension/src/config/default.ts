export const defaultConfig = {
    host: 'https://api.nobelprize.org/2.1/',
    hostPathNobelPrizes: 'nobelPrize/',
    hostPathLaureateById: 'laureate/',
    firstNobelYear: 1901,
    nobelDay: 10,
    nobelMonth: 12,
    fetchRetries: 3,
    fields: ['chemistry', 'economy', 'litreture', 'peace', 'physics', 'medicine'],
    loggerMaxBufferSize: 15,
};
