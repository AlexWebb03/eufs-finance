import Airtable from "airtable";

import { createTRPCRouter, publicProcedure } from "eufs-finance/server/api/trpc";
import { date, string } from "zod";

// Define the interface for a reimbursement
interface reimbursements{
    price: number;
    team: string;
    sub_team: string;
    date: string;
}


import { env } from "src/env.mjs"

import * as dotenv from 'dotenv';
dotenv.config();

const base = new Airtable({apiKey: env.AIRTABLE_API_KEY}).base(env.AIRTABLE_BASE_ID);


export const airtableRouter = createTRPCRouter({
  requests: publicProcedure
    .query( () => {
        //initialise an array to store reimbursements
        const rows: reimbursements[] = []; 
         
      base('Requests').select({
          view: "Table"
      }).eachPage((records, fetchNextPage) => {
          // This function (`page`) will get called for each page of records.
          const rows_in_page = records.map(record =>({
            price:record.get("Total") as number,
            team : record.get("Team") as string,
            sub_team: record.get("Subteam") as string,
            date: record.get("Date submitted") as string
          }));
            rows.push(...rows_in_page);    
            //convert this to a list and store it there 

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
      }, function done(err) {
          if (err) { console.error(err); }
          else{
            console.log('Reimbursements:', rows);
          }
      });

      return rows;
    }),
});
