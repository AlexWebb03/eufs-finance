import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format,parseISO } from 'date-fns'; // Import the format function from date-fns
import { reimbursements } from 'eufs-finance/server/api/routers/airtable';


interface MonthlyExpenditure{
  month:string;
  totalExpenditure: number;
}

export default class Chart extends PureComponent<{reimbursements: reimbursements[]}> {
  //Function to transform and aggregate data by month
  transformData(data:any[] = []):MonthlyExpenditure[]{
    const monthTotals:{[key:string]:MonthlyExpenditure} = {};

    data.forEach((item) => {
      const month = format(parseISO(item.date),"MMM");
      if(monthTotals[month]){
        monthTotals[month].totalExpenditure += item.price;
      }
      else{
        monthTotals[month] = {month,totalExpenditure:item.price};
      }
    });

    //Convert the object to an array of MonthlyExpenditure
    console.log("hello");
    console.log(monthTotals);
    return Object.values(monthTotals);
  }
  
  
  render() {
    const { reimbursements } = this.props;
    //console.log(reimbursements);
    const transformingdata = this.transformData(reimbursements);
    console.log(transformingdata);
    const changing_date = (date) => {
      const dating = format(new Date(date), "MM" );
     //console.log(dating);
      return format(new Date(date), "MM" );
    };
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={reimbursements}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={changing_date} />
          <YAxis dataKey = "price" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}