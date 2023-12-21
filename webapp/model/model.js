"use-strict";



var fiveCrowns = {};

fiveCrowns.model = (function () {

    const maxPlayers = 6;

    // // Number of lines per ticket and numbers per line, to generate per ticket
    // // For methods LRU, Least, MRU & Most, the ticket lines need to be <= to tLayout lines.
    // const ticketLines = 12;
    // const lineNumbers = 6;

    // // Maximum number of balls in the draw
    // // If this changes, also change LRU list and Count list
    // const maxNumber = 40;

    // // Average expect prize value per division
    // const divPrize = [20, 35, 670, 8500, 717840];

    // // Array for LRU (& MRU) numbers
    // var lruList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

    // // Array for count of how many time each number is used
    // // Note, index 0 is not used
    // var countList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // var tickets = new Array;
    // var oTickets = {};
    // var draw = new Object;



    // /**
    //  * Add prize winnings and increment division wins
    //  */
    // function addWinnings(ticket, division) {
    //     ticket.winnings = ticket.winnings + divPrize[division];
    //     // Output winnings in currecny format
    //     ticket.winningsOutput = ticket.winnings.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD' });
    //     ticket.division[division] = ticket.division[division] + 1;
    //     ticket.div5 = ticket.division[0];
    //     ticket.div4 = ticket.division[1];
    //     ticket.div3 = ticket.division[2];
    //     ticket.div2 = ticket.division[3];
    //     ticket.div1 = ticket.division[4];
    // };


    // /**
    //  * Check line
    //  */
    // function checkLine(line, ticket) {

    //     var matches = 0;     // Number of matching numbers
    //     var bonus = false;   // Did we have the bonus number

    //     // Do we have the bonus number
    //     if (line.includes(draw.bonus)) {
    //         bonus = true;
    //     }
    //     // Loop through each number of the draw, do we have it
    //     for (let i = 0; i < draw.line.length; i++) {
    //         if (line.includes(draw.line[i])) {
    //             matches = matches + 1;
    //         }
    //     }

    //     // Check how much we won and which division
    //     if (matches == 3 && bonus == true) {
    //         addWinnings(ticket, 0);
    //     } else {
    //         if (matches == 4) {
    //             addWinnings(ticket, 1);
    //         } else {
    //             if (matches == 5) {
    //                 addWinnings(ticket, 2);
    //             } else {
    //                 if (matches == 5 && bonus == true) {
    //                     addWinnings(ticket, 3);
    //                 } else {
    //                     if (matches == 6) {
    //                         addWinnings(ticket, 4);
    //                     }
    //                 }
    //             }
    //         }
    //     };

    // };


    // /**
    //  * Check ticket
    //  */
    // function checkTicket(ticket) {
    //     for (let line = 0; line < ticket.lines.length; line++) {
    //         checkLine(ticket.lines[line], ticket);
    //     }
    // };


    // /**
    //  * Generate bonus ball
    //  */
    // function generateBonus(line) {

    //     var bonus = 0;

    //     while (bonus == 0) {   // Generate bonus number that is unique
    //         // Generate a number
    //         var newNumber = Math.floor((Math.random() * fiveCrowns.model.getMaxNumber())) + 1;
    //         // Now check for a duplicate in previous numbers
    //         if (line.includes(newNumber)) {
    //             continue;
    //         }
    //         bonus = newNumber;
    //     }
    //     return bonus;
    // };


    // /**
    //  * Update the Least Recently Used list
    //  */
    // function updateLruList(line, bonus) {

    //     // When a number is drawn, move it to the back of the list
    //     // 1) Find number in list
    //     // 2) Shuffle forward all subsequent numbers
    //     // 3) Place number at end of list 
    //     for (let i = 0; i < line.length; i++) {
    //         let num = line[i];
    //         let pos = lruList.indexOf(num);
    //         lruList.splice(pos, 1);
    //         lruList.push(num);
    //     }
    //     // Repeat for the bonus ball
    //     let pos = lruList.indexOf(bonus);
    //     lruList.splice(pos, 1);
    //     lruList.push(bonus);

    // };



    // /**
    //  * Update the count of numbers used
    //  */
    // function updateCountList(line, bonus) {

    //     // Note, index 0 is not used
    //     for (let i = 0; i < line.length; i++) {
    //         countList[line[i]] = countList[line[i]] + 1;
    //     }
    //     // Also add the bonus ball
    //     countList[bonus] = countList[bonus] + 1;

    // };



    // return {


    //     /**
    //      * Get tLayout
    //      */
    //     getLayout: function () {
    //         return tLayout;
    //     },


    //     /**
    //      * Get ticket lines
    //      */
    //     getTicketLines: function () {
    //         return ticketLines;
    //     },


    //     /**
    //      * Get line numbers
    //      */
    //     getLineNumbers: function () {
    //         return lineNumbers;
    //     },


    //     /**
    //      * Get largest number
    //      */
    //     getMaxNumber: function () {
    //         return maxNumber;
    //     },


    //     /**
    //      * Get LRU List
    //      */
    //     getLruList: function () {
    //         return lruList;
    //     },


    //     /**
    //      * Get Count List
    //      */
    //     getCountList: function () {
    //         return countList;
    //     },


    //     /**
    //      * Get Tickets
    //      */
    //     getTickets: function () {
    //         return tickets;
    //     },



    //     /**
    //      * Generate line (random)
    //      */
    //     generateRandomLine: function () {

    //         var line = new Array;
    //         var cIndex = 0;       // current index
    //         while (cIndex < fiveCrowns.model.getLineNumbers()) {   // Loop until we have all numbers
    //             // Generate a number
    //             var newNumber = Math.floor((Math.random() * fiveCrowns.model.getMaxNumber())) + 1;
    //             // Now check for a duplicate in previous numbers
    //             if (line.includes(newNumber)) {
    //                 continue;
    //             };
    //             line[cIndex] = newNumber;
    //             cIndex = cIndex + 1;
    //         }

    //         return line;
    //     },



    //     /**
    //      * Generate result (random)
    //      */
    //     generateResult: function () {
    //         var line = fiveCrowns.model.generateRandomLine();
    //         var bonus = generateBonus(line);
    //         updateLruList(line, bonus);
    //         updateCountList(line, bonus);
    //         line.sort(function (a, b) { return a - b });
    //         draw = { line, bonus };
    //         return draw;
    //     },



    //     /**
    //      * Check all tickets
    //      */
    //     generateTickets: function () {
    //         for (let i = 0; i < tickets.length; i++) {
    //             tickets[i].generateTicket();
    //         }
    //     },



    //     /**
    //      * Check all tickets
    //      */
    //     checkTickets: function () {
    //         for (let i = 0; i < tickets.length; i++) {
    //             checkTicket(tickets[i]);
    //         }
    //     },



    //     /**
    //      * Create new ticket
    //      */
    //     newTicket: function (ticketType) {
    //         let ticketNumber = tickets.length;
    //         tickets[ticketNumber] = new fiveCrowns.ticket.newTicket(ticketType);
    //         return tickets[ticketNumber];
    //     },



    //     /**
    //      * Create new tickets
    //      */
    //     newTickets: function () {
    //         // Create new tickets
    //         var mTest1 = fiveCrowns.model.newTicket('LuckyDip');
    //         var mTest2 = fiveCrowns.model.newTicket('Same');
    //         var mTest3 = fiveCrowns.model.newTicket('LRU');
    //         var mTest4 = fiveCrowns.model.newTicket('Least');
    //         var mTest5 = fiveCrowns.model.newTicket('MRU');
    //         var mTest6 = fiveCrowns.model.newTicket('Most');
    //     },


    //     /**
    //      * Clear all tickets
    //      */
    //     clearTickets: function () {
    //         let tickets = fiveCrowns.model.getTickets();
    //         for (let i = 0; i < tickets.length; i++) {
    //             tickets[i].clearTicket();
    //         };
    //     },



    //     /**
    //      * Set model for table
    //      */
    //     setModel: function (oModel) {
    //         oTickets = oModel;
    //     },


    //     /**
    //      * Get model for table
    //      */
    //     getModel: function () {
    //         return oTickets;
    //     },


    //     /**
    //      * Run the draw
    //      */
    //     runSimulation: function (drawCount) {
    //         // Perform a number of draws
    //         for (let drawNum = 0; drawNum < drawCount; drawNum++) {
    //             fiveCrowns.model.generateTickets();
    //             fiveCrowns.model.generateResult();
    //             fiveCrowns.model.checkTickets();
    //         }
    //     },




    };

}());

