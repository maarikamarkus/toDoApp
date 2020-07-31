<template>
    <div>
        <div class="date">
            <!--<h1>{{date}}</h1>-->
            <div id="dayOfMonth">{{dayOfMonth}}</div>
            <div id="secondColumn">
                <div id="month">{{month}}</div>
                <div id="year">{{year}}</div>
            </div>
            <div id="dayOfWeek">{{dayOfWeek}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const date = new Date(Date.now());
        return {
            date: date.toDateString(),
            dayOfWeek: date.toLocaleString('et-EE', { weekday: 'long' }),
            dayOfMonth: date.getUTCDate(),
            month: date.toLocaleString('et-EE', { month: 'short' }),
            year: date.getFullYear(),
        };
    },
};
</script>

<style>
.date {
    height: 50px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
}

#dayOfMonth, #dayOfWeek, #secondColumn {
    display: inline-block;
}

#dayOfMonth {
    font-size: 41px;
    height: 100%;
    margin-right: 7px;
}

#month {
    font-size: 13px;
}

#dayOfWeek {
    margin-top: 13px;
    float: right;
}
</style>
